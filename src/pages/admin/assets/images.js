import React, { useEffect, useState, useMemo } from "react";
import { Grid, Row, Col, Stack, InputGroup, Input, Modal, ButtonToolbar, Uploader, Button, Panel, useToaster, Message } from 'rsuite';
import Image from "next/image";
import HeadMeta from "../../../components/elements/HeadMeta";
import HeaderThree from "../../../components/header/HeaderThree";
import SideBarThree from "../../../components/sidebar/SideBarThree";
import ModalDeleteImage from "../../../components/modal/images/ModalDeleteImage";
import SearchIcon from "@rsuite/icons/Search";
import imageAPI from "../../../../services/image-api";
import ModalAddImage from "../../../components/modal/images/ModalAddImage";
import ModalFullScreenImage from "../../../components/modal/images/ModalFullScreenImage";

const Images = ( { allPosts } ) => {
    const toaster = useToaster();
    const [ loading, setLoading ] = useState(true);
    const [ images, setImages ] = useState([]);
    const [ selectedImg, setSelectedImg ] = useState([]);
    const [ sortColumn, setSortColumn ] = useState("id");
    const [ sortType, setSortType ] = useState();
    const [ searchKeyword, setSearchKeyword ] = useState("");
    const [ fullScreenId, setFullScreenId ] = useState(-1);
    const [ openFullScreen, setOpenFullScreen ] = useState(false);
    const [ openAdd, setOpenAdd ] = React.useState(false);
    const [ openDelete, setOpenDelete ] = useState(false);

    const handleOpenFullScreen = () => setOpenFullScreen(true);
    const handleCloseFullScreen = () => setOpenFullScreen(false);
    const handleOpenAdd = () => setOpenAdd(true);
    const handleCloseAdd = () => setOpenAdd(false);
    const handleOpenDelete = () => setOpenDelete(true);
    const handleCloseDelete = () => setOpenDelete(false);

    const handleDoubleClick = ( index ) => {
        handleOpenFullScreen();
        setFullScreenId(index);
    }

    const handleSelectImg = ( img ) => {
        if (selectedImg.includes(img)) {
            setSelectedImg(selectedImg.filter(item => item !== img))
        } else {
            setSelectedImg([ ...selectedImg, img ])
        }
    }

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            try {
                const response = await imageAPI.getImages();
                setImages(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
        setLoading(false);
    }, [])

    const filteredData = useMemo(() => {
        return images.filter(( item ) => {
            if (!item.originalname.toLowerCase().includes(searchKeyword.toLowerCase())) {
                return false;
            }
            // if (cate && item.cate !== cate) {
            //             //     return false;
            //             // }
            return true;
        });
    }, [ images, searchKeyword ]);
    console.log(images)
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
                            {!loading && filteredData.map(( item, index ) =>
                                <Panel key={index}
                                       className={`${selectedImg.includes(item.filepath) ? "border-2 border-info" : ""} m-2`}
                                       onClick={() => handleSelectImg(item.filepath)}
                                       onDoubleClick={() => handleDoubleClick(index)}
                                       shaded bordered bodyFill
                                >
                                    <Image
                                        src={item.filepath}
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
            <ModalFullScreenImage open={openFullScreen} handleClose={handleCloseFullScreen} images={images} fullScreenId={fullScreenId}/>
            <ModalAddImage open={openAdd} handleClose={handleCloseAdd} images={images} setImages={setImages}/>
            <ModalDeleteImage open={openDelete} handleClose={handleCloseDelete} images={images} setImages={setImages} selectedImg={selectedImg}
                              setSelectedImg={setSelectedImg}/>
        </>
    );
}
export default Images;
