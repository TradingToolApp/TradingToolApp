import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Modal, Stack, Divider, Panel, ButtonGroup } from 'rsuite';
import imageAPI from '@/services/restful/image-api';
import ModalFullScreenImage from "@/components/modal/images/ModalFullScreenImage";

const ModalSelectImage = ( { open, handleClose, multiple = false, setReturnedImg } ) => {
    const [ loading, setLoading ] = useState(false);
    const [ images, setImages ] = useState([]);
    const [ selectedImg, setSelectedImg ] = useState([]);
    const [ openFullScreen, setOpenFullScreen ] = useState(false);
    const [ fullScreenURL, setFullScreenURL ] = useState("");

    const handleOpenFullScreen = () => setOpenFullScreen(true);
    const handleCloseFullScreen = () => setOpenFullScreen(false);

    const handleDoubleClick = ( url ) => {
        handleOpenFullScreen();
        setFullScreenURL(url);
    }

    const handleReturn = async () => {
        if (!multiple) {
            setReturnedImg(selectedImg);
        } else {
            setReturnedImg(selectedImg.map(item => `![Image Name](${item})`).join("\n"))
        }
        handleClose();
    }

    const handleSelectImg = ( img ) => {
        if (!multiple) {
            setSelectedImg([ img ]);
        } else {
            if (selectedImg.includes(img)) {
                setSelectedImg(selectedImg.filter(item => item !== img))
            } else {
                setSelectedImg([ ...selectedImg, img ])
            }
        }
    }

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
            <Modal size={"80%"} open={open} onClose={handleClose}>
                <Modal.Header>
                    <Modal.Title>Images</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {loading ? <div>Loading...</div> :
                        <div>
                            <Divider/>
                            <div style={{ height: "500px" }}>
                                <Stack justifyContent='center' wrap>
                                    {images.map(( item, index ) =>
                                        <Panel key={index}
                                               className={`${selectedImg.includes(item.url) ? "border-2 border-info" : ""} m-4`}
                                               style={{ display: 'inline-block', width: 200, height: 200 }}
                                               onClick={() => handleSelectImg(item.url)}
                                               onDoubleClick={() => handleDoubleClick(item.url)}
                                               shaded bordered bodyFill
                                        >
                                            <Image
                                                src={item.url}
                                                width={200}
                                                height={200}
                                                style={{
                                                    width: "auto",
                                                    objectFit: 'contain', // cover, contain, none
                                                }}
                                                alt="Image"
                                            />
                                        </Panel>
                                    )}
                                </Stack>
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
            <ModalFullScreenImage open={openFullScreen} handleClose={handleCloseFullScreen} images={images} fullScreenURL={fullScreenURL}/>
        </>
    );
};

export default ModalSelectImage;