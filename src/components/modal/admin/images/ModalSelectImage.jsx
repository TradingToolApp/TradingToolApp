import React, {useEffect, useMemo, useState} from 'react';
import Image from 'next/image';
import {Modal, CardGroup, Divider, ButtonGroup, Card, Text, Input, InputGroup} from 'rsuite';
import imageAPI from '@/libs/api-client/restful/image-api';
import ModalFullScreenImage from "@/components/modal/admin/images/ModalFullScreenImage";
import SearchIcon from "@rsuite/icons/Search";

const ModalSelectImage = ({open, handleClose, multiple = false, setReturnedImg}) => {
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [selectedImg, setSelectedImg] = useState([]);
    const [openFullScreen, setOpenFullScreen] = useState(false);
    const [fullScreenURL, setFullScreenURL] = useState("");

    const handleOpenFullScreen = () => setOpenFullScreen(true);
    const handleCloseFullScreen = () => setOpenFullScreen(false);

    const handleDoubleClick = (url) => {
        handleOpenFullScreen();
        setFullScreenURL(url);
    }

    const handleReturn = async () => {
        if (!multiple) {
            setReturnedImg(selectedImg);
        } else {
            setReturnedImg(selectedImg.map(item => `![Image Name](${item})`).join("\n"))
        }
        setSelectedImg([]);
        handleClose();
    }

    const handleSelectImg = (img) => {
        if (!multiple) {
            setSelectedImg([img]);
        } else {
            if (selectedImg.includes(img)) {
                setSelectedImg(selectedImg.filter(item => item !== img))
            } else {
                setSelectedImg([...selectedImg, img])
            }
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

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            const response = await imageAPI.getImages();
            setImages(response.data);
        }
        fetchData();
        setLoading(false);
    }, [])

    return (
        <>
            <Modal size="lg" open={open} onClose={handleClose}>
                <Modal.Header>
                    <Modal.Title>Images</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Divider/>
                    <div className="mx-4">
                        <InputGroup inside>
                            <Input

                                placeholder="Search"
                                value={searchKeyword}
                                onChange={setSearchKeyword}
                            />
                            <InputGroup.Addon>
                                <SearchIcon/>
                            </InputGroup.Addon>
                        </InputGroup>
                    </div>
                    {loading ? <div>Loading...</div> :
                        <div>
                            <div style={{height: "400px"}}>
                                <CardGroup className="m-3">
                                    {filteredData.map((item, index) =>
                                            <Card
                                                bordered
                                                shaded
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

                                        // <Panel key={index}
                                        //        className={`${selectedImg.includes(item.url) ? "border-2 border-info" : ""} m-4`}
                                        //        style={{display: 'inline-block', width: 200, height: 200}}
                                        //        onClick={() => handleSelectImg(item.url)}
                                        //        onDoubleClick={() => handleDoubleClick(item.url)}
                                        //        shaded bordered bodyFill
                                        // >
                                        //     <Image
                                        //         src={item.url}
                                        //         width={200}
                                        //         height={200}
                                        //         style={{
                                        //             width: "auto",
                                        //             objectFit: 'contain', // cover, contain, none
                                        //         }}
                                        //         alt="Image"
                                        //     />
                                        // </Panel>
                                    )}
                                </CardGroup>
                            </div>
                        </div>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <ButtonGroup>
                        <button className="btn btn-primary" onClick={handleReturn}>Select</button>
                        <button className="btn btn-danger" onClick={handleClose}>Cancel</button>
                    </ButtonGroup>
                </Modal.Footer>
            </Modal>
            <ModalFullScreenImage open={openFullScreen} handleClose={handleCloseFullScreen} images={images}
                                  fullScreenURL={fullScreenURL}/>
        </>
    );
};

export default ModalSelectImage;