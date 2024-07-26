import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Modal, Uploader, Stack, Divider, Panel, ButtonGroup, Button } from 'rsuite';
import CameraRetroIcon from '@rsuite/icons/legacy/CameraRetro';
import { getImages, createImages } from '@/services/image-api';

const ModalImage = ({ open, handleClose, typeSelectImg, setURLImg, setFeatureImg }) => {
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [upload, setUpload] = useState([]);
    const [selectedImg, setSelectedImg] = useState([]);
    const [openFullScreen, setOpenFullScreen] = useState(false);
    const [fullScreen, setFullScreen] = useState(0);

    const handleOpenFullScreen = () => setOpenFullScreen(true);
    const handleCloseFullScreen = () => setOpenFullScreen(false);

    const handleUpload = async () => {
        setUploading(true);
        const formData = new FormData();
        formData.append("file", upload[0].blobFile);
        const response = await createImages(formData);
        setImages([...images, response.data.data]);
        setUpload([]);
        setUploading(false);
    }

    const handleDoubleClick = (index) => {
        handleOpenFullScreen();
        setFullScreen(index);
    }

    const handleSelect = async () => {
        switch (typeSelectImg) {
            case "featureImg":
                setFeatureImg(selectedImg[0]);
                break;
            case "contentImg":
                setURLImg(selectedImg.map(item => `![Single Post Images](${item})`).join("\n"));
                break;
        }
        handleClose();
    }

    const handleSelectImg = (img) => {
        switch (typeSelectImg) {
            case "featureImg":
                setSelectedImg([img]);
                break;
            case "contentImg":
                if (selectedImg.includes(img)) {
                    setSelectedImg(selectedImg.filter(item => item !== img))
                } else {
                    setSelectedImg([...selectedImg, img])
                }
                break;
        }
    }

    useEffect(() => {
        setLoading(true);

        const fetchData = async () => {
            const response = await getImages();
            setImages(response.data.data);
        }

        fetchData();
        setLoading(false);
    }, [])

    if (images.length === 0) return;
    return (
        <Modal size={"80%"} open={open} onClose={handleClose}>
            <Modal.Header>
                <Modal.Title>Images</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {loading ? <div>Loading...</div> :
                    <div>
                        <Divider />
                        <div style={{ height: "500px" }} >
                            <Stack justifyContent='center' wrap>
                                {images.map((item, index) =>
                                    <Panel key={index}
                                        className={`${selectedImg.includes(item.filepath) ? "border-2 border-info" : ""} m-4`}
                                        style={{ display: 'inline-block', width: 200, height: 200 }}
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
                                        />
                                    </Panel>
                                )}
                            </Stack>
                        </div>
                        <div>
                            <Modal size={"full"} open={openFullScreen} onClose={handleCloseFullScreen}>
                                <Modal.Body>
                                    <Image src={images[fullScreen].filepath} layout='fill'
                                        objectFit='contain' alt="Picture of the author" />
                                </Modal.Body>
                            </Modal>
                        </div>
                    </div>
                }
            </Modal.Body>
            <Modal.Footer>
                <Stack justifyContent='space-between' alignItems='center'>
                    <div className='d-flex flex-row'>
                        <Button className='mx-2' style={{ height: "60px" }} appearance="subtle" onClick={handleUpload} disabled={upload.length === 0 ? true : false}>{uploading ? "Uploading" : "Upload"}</Button>
                        <Uploader name="files" autoUpload={false} action="#" onChange={setUpload} multiple draggable>
                            <button style={{ width: "60px", height: "60px" }}>
                                <CameraRetroIcon style={{ fontSize: "2em" }} />
                            </button>
                        </Uploader>
                            {upload.length !== 0 && <span style={{ bottom: "0", left: "120px" }} className="position-absolute badge bg-danger text-wrap">Please ensure that the filename doesn't have whitespace in it!</span>}
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