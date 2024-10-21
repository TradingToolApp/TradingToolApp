import React, { useEffect, useState, useMemo } from "react";
import { Grid, Row, Col, Stack, InputGroup, Input, ButtonToolbar, Button, Panel } from 'rsuite';
import Image from "next/image";
import HeadMeta from "../../../components/elements/HeadMeta";
import HeaderThree from "../../../components/header/HeaderThree";
import SideBarThree from "../../../components/sidebar/SideBarThree";
import ModalDeleteImage from "../../../components/modal/images/ModalDeleteImage";
import SearchIcon from "@rsuite/icons/Search";
import ModalAddImage from "../../../components/modal/images/ModalAddImage";
import ModalFullScreenImage from "../../../components/modal/images/ModalFullScreenImage";
import { getImages } from "@/services/prisma/image.api";
import { useGetImages } from "@/hooks/data/useImages";

const Images = ({ allImages }) => {
    const { images } = useGetImages(allImages);
    const [ selectedImg, setSelectedImg ] = useState([]);
    const [ searchKeyword, setSearchKeyword ] = useState("");
    const [ fullScreenURL, setFullScreenURL ] = useState("");
    const [ openFullScreen, setOpenFullScreen ] = useState(false);
    const [ openAdd, setOpenAdd ] = React.useState(false);
    const [ openDelete, setOpenDelete ] = useState(false);
    const handleOpenFullScreen = () => setOpenFullScreen(true);
    const handleCloseFullScreen = () => setOpenFullScreen(false);
    const handleOpenAdd = () => setOpenAdd(true);
    const handleCloseAdd = () => setOpenAdd(false);
    const handleOpenDelete = () => setOpenDelete(true);
    const handleCloseDelete = () => setOpenDelete(false);

    const handleDoubleClick = ( url ) => {
        handleOpenFullScreen();
        setFullScreenURL(url);
    }

    const handleSelectImg = ( img ) => {
        if (selectedImg.includes(img)) {
            setSelectedImg(selectedImg.filter(item => item !== img))
        } else {
            setSelectedImg([ ...selectedImg, img ])
        }
    }

    const filteredData = useMemo(() => {
        return images.filter(( item ) => {
            if (!item.originalname.toLowerCase().includes(searchKeyword.toLowerCase())) {
                return false;
            }

            return true;
        });
    }, [ images, searchKeyword ]);

    return (
        <>
            <Grid className="d-flex flex-column vh-100 vw-100" fluid>
                <Row>
                    <HeadMeta metaTitle="Admin Dashboard"/>
                    <HeaderThree/>
                </Row>
                <Row className="h-100 overflow-y-auto d-flex flex-row">
                    <Col className="h-100">
                        <SideBarThree/>
                    </Col>
                    <Col className="flex-grow-1 h-100">
                        <Stack spacing={6} className="my-3" justifyContent="space-between">
                            <InputGroup inside>
                                <Input
                                    style={{ width: "400px" }}
                                    placeholder="Search"
                                    value={searchKeyword}
                                    onChange={setSearchKeyword}
                                />
                                <InputGroup.Addon>
                                    <SearchIcon/>
                                </InputGroup.Addon>
                            </InputGroup>
                            <ButtonToolbar>
                                {selectedImg.length > 0 &&
                                    <Button onClick={handleOpenDelete} color="red" appearance="primary" size="lg">Delete</Button>}
                                <Button onClick={handleOpenAdd} style={{ marginRight: "20px" }} size="lg">Add Image</Button>
                            </ButtonToolbar>
                        </Stack>

                        <Stack justifyContent='flex-start' alignItems="flex-start" wrap
                               style={{ overflowY: "scroll" }}>
                            {filteredData.map(( item, index ) =>
                                <Panel key={index}
                                       className={`${selectedImg.includes(item.url) ? "border-2 border-info" : ""} m-2`}
                                       onClick={() => handleSelectImg(item.url)}
                                       onDoubleClick={() => handleDoubleClick(item.url)}
                                       shaded bordered bodyFill
                                >
                                    <Image
                                        src={item.url}
                                        width={200}
                                        height={200}
                                        style={{
                                            objectFit: 'contain', // cover, contain, none
                                        }}
                                        alt="Image"
                                        priority
                                    />
                                </Panel>
                            )}
                        </Stack>
                    </Col>
                </Row>
            </Grid>
            <ModalFullScreenImage open={openFullScreen} handleClose={handleCloseFullScreen} images={images} fullScreenURL={fullScreenURL}/>
            <ModalAddImage open={openAdd} handleClose={handleCloseAdd}/>
            <ModalDeleteImage open={openDelete} handleClose={handleCloseDelete} selectedImg={selectedImg} setSelectedImg={setSelectedImg}/></>
    );
}
export default Images;

export async function getStaticProps() {
    const allImages = await getImages();
    return {
        props: {
            allImages
        },
        revalidate: 3600
    }
}