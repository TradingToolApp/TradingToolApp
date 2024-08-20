import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Modal, Uploader, Stack, Divider, Panel, ButtonGroup, Button, Message, useToaster } from 'rsuite';
import CameraRetroIcon from '@rsuite/icons/legacy/CameraRetro';
import imageAPI from '../../../services/image-api';

// const message = (
//     <Message showIcon type={"error"} closable>
//         <strong>{"error"}!</strong> The message appears on the {placement}.
//     </Message>
// );

const ModalImage = ( { open, handleClose, multiple = false, setReturnedImg } ) => {
    const toaster = useToaster();
    const [ loading, setLoading ] = useState(false);
    const [ images, setImages ] = useState([]);
    const [ uploading, setUploading ] = useState(false);
    const [ upload, setUpload ] = useState([]);
    const [ selectedImg, setSelectedImg ] = useState([]);
    const [ openFullScreen, setOpenFullScreen ] = useState(false);
    const [ fullScreen, setFullScreen ] = useState(0);

    const handleOpenFullScreen = () => setOpenFullScreen(true);
    const handleCloseFullScreen = () => setOpenFullScreen(false);

    const handleUpload = async () => {
        try {
            setUploading(true);

            const validate = upload.some(file => file.name.includes(" "));
            if (validate) {
                toaster.push(<Message type={"error"}>File name should not contain whitespace!</Message>);
                setUploading(false);
                return;
            }

            const formData = new FormData();
            formData.append("file", upload[0].blobFile);

            const response = await imageAPI.createImages(formData);
            setImages([ ...images, response.data.data ]);
            setUpload([]);
            setUploading(false);
        } catch (error) {
            console.log(error)
            toaster.push(<Message type={"error"}>Upload Error</Message>);
            setUploading(false);
        }
    }

    const handleDoubleClick = ( index ) => {
        handleOpenFullScreen();
        setFullScreen(index);
    }

    const handleReturn = async () => {
        if (!multiple) {
            setReturnedImg(selectedImg);
        } else {
            setReturnedImg(selectedImg.map(item => `<Image src="${item}" width="100%" height="100%" alt="Image" />`).join("\n"))
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
                        <Divider/>
                        <div style={{ height: "500px" }}>
                            <Stack justifyContent='center' wrap>
                                {images.map(( item, index ) =>
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
                                           objectFit='contain' alt="Picture of the author"/>
                                </Modal.Body>
                            </Modal>
                        </div>
                    </div>
                }
            </Modal.Body>
            <Modal.Footer>
                <Stack justifyContent='space-between' alignItems='center' style={{ margin: "10px" }}>
                    <div className='d-flex flex-row'>
                        <Button className='mx-2' style={{ height: "60px" }} appearance="subtle" onClick={handleUpload}
                                disabled={upload.length === 0}>{uploading ? "Uploading" : "Upload"}</Button>
                        <Uploader name="files" autoUpload={false} action="#"
                                  fileList={upload}
                                  onChange={setUpload}
                                  onError={( err ) => {
                                      console.log(err);
                                      setUploading(false);
                                      setUpload([]);
                                  }}
                                  multiple draggable>
                            <button style={{ width: "60px", height: "60px" }}>
                                <CameraRetroIcon style={{ fontSize: "2em" }}/>
                            </button>
                        </Uploader>
                    </div>

                    <ButtonGroup>
                        <button className="btn btn-primary" onClick={handleReturn}>Select</button>
                        <button className="btn btn-danger" onClick={handleClose}>Cancel</button>
                    </ButtonGroup>
                </Stack>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalImage;