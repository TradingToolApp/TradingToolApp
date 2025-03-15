import React, {useState, useMemo} from "react";
import {
    Grid,
    Row,
    Col,
    Stack,
    InputGroup,
    Input,
    ButtonToolbar,
    Button,
    Panel,
    Card,
    Text,
    CardGroup,
    VStack,
    Animation
} from 'rsuite';
import Image from "next/image";
import HeadMeta from "@/components/elements/HeadMeta";
import HeaderFive from "@/components/header/HeaderFive";
import ModalDeleteImage from "@/components/modal/admin/images/ModalDeleteImage";
import ModalAddImage from "@/components/modal/admin/images/ModalAddImage";
import ModalFullScreenImage from "@/components/modal/admin/images/ModalFullScreenImage";
import {getImages} from "@/libs/api-client/prisma/image.api";
import {useGetImages} from "@/hooks/data/admin/useImages";
import SearchIcon from "@rsuite/icons/Search";
import dynamic from "next/dynamic";

const SideBarOne = dynamic(() => import("@/components/sidebar/SideBarAdmin"), {ssr: false})

const Images = ({allImages}) => {
    const {images} = useGetImages(allImages);
    const [selectedImg, setSelectedImg] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [fullScreenURL, setFullScreenURL] = useState("");
    const [openFullScreen, setOpenFullScreen] = useState(false);
    const [openAdd, setOpenAdd] = React.useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const handleOpenFullScreen = () => setOpenFullScreen(true);
    const handleCloseFullScreen = () => setOpenFullScreen(false);
    const handleOpenAdd = () => setOpenAdd(true);
    const handleCloseAdd = () => setOpenAdd(false);
    const handleOpenDelete = () => setOpenDelete(true);
    const handleCloseDelete = () => setOpenDelete(false);

    const handleDoubleClick = (url) => {
        handleOpenFullScreen();
        setFullScreenURL(url);
    }

    const handleSelectImg = (img) => {
        if (selectedImg.includes(img)) {
            setSelectedImg(selectedImg.filter(item => item !== img))
        } else {
            setSelectedImg([...selectedImg, img])
        }
    }

    const filteredData = useMemo(() => {
        return images.filter((item) => {
            if (!item.originalname.toLowerCase().includes(searchKeyword.toLowerCase())) {
                return false;
            }

            return true;
        });
    }, [images, searchKeyword]);

    return (
        <>
            <Grid className="d-flex flex-column vh-100 vw-100" fluid>
                <Row>
                    <HeadMeta metaTitle="Admin Dashboard"/>
                    <HeaderFive/>
                </Row>
                <Row className="h-100 overflow-y-auto d-flex flex-row">
                    <Col className="h-100">
                        <SideBarOne/>
                    </Col>
                    <Col className="flex-grow-1 h-100 bordered">
                        <Stack spacing={6} className="my-3" justifyContent="space-between">
                            <InputGroup inside>
                                <Input
                                    style={{width: "400px"}}
                                    placeholder="Search"
                                    value={searchKeyword}
                                    onChange={setSearchKeyword}
                                />
                                <InputGroup.Addon>
                                    <SearchIcon/>
                                </InputGroup.Addon>
                            </InputGroup>
                            <ButtonToolbar>
                                <Animation.Bounce in={selectedImg.length > 0}>
                                    {(props, ref) => (
                                        <Button {...props} ref={ref} onClick={handleOpenDelete} color="red"
                                                appearance="primary"
                                                size="lg">Delete</Button>
                                    )}
                                </Animation.Bounce>
                                <Button appearance="primary" onClick={handleOpenAdd} style={{marginRight: "20px"}}
                                        size="lg">Add
                                    Image</Button>
                            </ButtonToolbar>
                        </Stack>

                        <Stack justifyContent='flex-start' alignItems="flex-start" wrap
                               style={{overflowY: "scroll"}}>
                            <CardGroup>
                                {filteredData.map((item, index) =>
                                    <Card
                                        shaded
                                        bordered
                                        size="md"
                                        key={index}
                                        width={200}
                                        className={`${selectedImg.includes(item.url) ? "border-2 border-info" : ""} m-2`}
                                        onClick={() => handleSelectImg(item.url)}
                                        onDoubleClick={() => handleDoubleClick(item.url)}
                                    >
                                        <Card.Header>
                                            <Image
                                                src={item.url}
                                                width={200}
                                                height={100}
                                                style={{
                                                    objectFit: 'contain',
                                                }}
                                                alt="Image"
                                                priority
                                            />
                                        </Card.Header>
                                        <Card.Body>
                                            <Text className="w-100" align="center" size="sm" maxLines={2}>
                                                {item.originalname}
                                            </Text>
                                        </Card.Body>
                                    </Card>
                                )}
                            </CardGroup>
                        </Stack>
                    </Col>
                </Row>
            </Grid>
            <ModalFullScreenImage open={openFullScreen} handleClose={handleCloseFullScreen} images={images}
                                  fullScreenURL={fullScreenURL}/>
            <ModalAddImage open={openAdd} handleClose={handleCloseAdd}/>
            <ModalDeleteImage open={openDelete} handleClose={handleCloseDelete} selectedImg={selectedImg}
                              setSelectedImg={setSelectedImg}/>
        </>
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