import React, { useEffect, useState } from 'react';
import { Modal, Uploader, Stack, Divider, Panel, ButtonGroup, Button } from 'rsuite';
import CameraRetroIcon from '@rsuite/icons/legacy/CameraRetro';
import { getImages, createImages, deleteImages } from '@/services/image-api';
import axios from 'axios';

import Image from 'next/image';

const dateImg = [
    "/profile.png",
    "/profile.png",
    "/profile.png",
    "/profile.png",
    "/profile.png",
    "/profile.png",
    "/profile.png",
    "/profile.png",
    "/profile.png",
    "/profile.png",
    "/profile.png",
    "/profile.png",
    "/profile.png",
    "/profile.png",
    "/profile.png",
    "/profile.png",
    "/profile.png",
    "/profile.png",
    "/profile.png",
    "/profile.png",
    "/profile.png",
    "/profile.png",
    "/profile.png",
    "/profile.png",
    "/profile.png",
    "/profile.png",
    "/profile.png",
]

const ModalImage = ({ open, handleClose, setURLImg }) => {
    const test = getImages();
    const [image, setImage] = useState([]);
    const [upload, setUpload] = useState([]);
    const [selectedImg, setSelectedImg] = useState([]);
    const [openFullScreen, setOpenFullScreen] = useState(false);
    const [fullScreen, setFullScreen] = useState();

    const handleOpenFullScreen = () => setOpenFullScreen(true);
    const handleCloseFullScreen = () => setOpenFullScreen(false);

    const handleDoubleClick = (index) => {
        handleOpenFullScreen();
        setFullScreen(index);
        console.log(index)
        // handleClose();
    }


    const handleUpload = async () => {
        const formData = new FormData();
        formData.append("file", upload[0].blobFile);

        const response = await createImages(formData);
        // const response = await fetch("/api/images", {
        //   method: "POST",
        //   body: formData,
        // });

        // const result = await response.json();
        console.log(response);
    }

    const handleSelect = async () => {
        setURLImg(selectedImg.map(item => `![Single Post Images](${item})`).join("\n"));
        handleClose();
    }
    
    const handleSelectImg = (img) => {
        if (selectedImg.includes(img)) {
            setSelectedImg(selectedImg.filter(item => item !== img))
        } else {
            setSelectedImg([...selectedImg, img])
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await getImages();
            // console.log(response.data.data)
            setImage(response.data.data);
        }

        fetchData();
    
    }, [])
    return (
        <Modal size={"80%"} open={open} onClose={handleClose}>
            <Modal.Header>
                <Modal.Title>Images</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <Divider />
                <div style={{ height: "500px" }} >
                    <Stack justifyContent='center' wrap>
                        {image.map((item, index) =>
                            <Panel key={index}
                                className={`${selectedImg.includes(item) ? "border-2 border-info" : ""} m-4`}
                                style={{ display: 'inline-block', width: 200, height: 200 }}
                                onClick={() => handleSelectImg(item)}
                                onDoubleClick={() => handleDoubleClick(index)}
                                shaded bordered bodyFill
                            >
                                <Image
                                    src={item}
                                    width={200}
                                    height={200}
                                    style={{
                                        objectFit: 'contain', // cover, contain, none
                                    }}
                                    alt="Picture of the author"
                                />
                            </Panel>
                        )}
                    </Stack>
                </div>
                <div>
                    <Modal size={"full"} open={openFullScreen} onClose={handleCloseFullScreen}>
                        <Modal.Body>
                            <Image src={image[fullScreen]} layout='fill'
                                objectFit='contain' alt="Picture of the author" />
                        </Modal.Body>
                    </Modal>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Stack justifyContent='space-between' alignItems='center'>
                    <div className='d-flex flex-row'>
                        <Button className='mx-2' style={{height: "60px"}} appearance="subtle" onClick={handleUpload} disabled={upload.length === 0 ? true: false}>Upload</Button>
                        <Uploader name="files" autoUpload={false} action="#" onChange={setUpload} multiple draggable>
                            <button style={{ width: "60px", height: "60px" }}>
                                <CameraRetroIcon style={{ fontSize: "2em" }} />
                            </button>
                        </Uploader>
                    </div>

                    <ButtonGroup>
                        <button className="btn btn-primary" onClick={handleSelect}>Select</button>
                        <button className="btn btn-danger" onClick={() => handleClose()}>Cancel</button>
                    </ButtonGroup>
                </Stack>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalImage;