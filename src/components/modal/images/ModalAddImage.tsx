import {Button, ButtonToolbar, Message, Modal, Stack, Uploader, useToaster} from "rsuite";
import React, {useState} from "react";
import imageAPI from "@/services/image-api";

interface ModalAddImagesProps {
    open: boolean;
    handleClose: () => void;
    images: any;
    setImages: any;
}

const ModalAddImage = ({ open, handleClose, images, setImages }: ModalAddImagesProps) => {
    const toaster = useToaster();

    const [ uploading, setUploading ] = useState(false);
    const [ upload, setUpload ]: any = useState([]);

    const handleUpload = async () => {
        try {
            setUploading(true);

            const validate = upload.some((file: any) => file.name.includes(" "));
            if (validate) {
                toaster.push(<Message type={"error"}>File name should not contain whitespace!</Message>);
                setUploading(false);
                return;
            }

            const formData = new FormData();
            upload.map((file: any) => formData.append("file", file.blobFile));

            const response = await imageAPI.createImages(formData);
            setImages([ ...images, ...response.data ]);
            setUploading(false);
            setUpload([]);
            handleClose();
        } catch (error) {
            console.log(error)
            toaster.push(<Message type={"error"}>Upload Error</Message>);
            setUploading(false);
        }
    }

    return (
        <Modal open={open} onClose={handleClose}>
            <Modal.Header>
                <Modal.Title>Add Image</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{overflow: "scroll", overflowX: "hidden"}}>
                <Uploader name="files" autoUpload={false} action="#"
                          fileList={upload}
                          onChange={setUpload}
                          onError={( err ) => {
                              console.log(err);
                              setUploading(false);
                              // setUpload([]);
                          }}
                          multiple
                          draggable>
                    <div style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span>Click or Drag files to this area to upload</span>
                    </div>
                </Uploader>
            </Modal.Body>
            <Modal.Footer>
                <Stack justifyContent={"space-between"}>
                    <Button className='mx-2' style={{ height: "60px" }} appearance="subtle" onClick={handleUpload}
                            disabled={upload.length === 0}>{uploading ? "Uploading" : "Upload"}</Button>
                    <ButtonToolbar>
                        <Button onClick={handleClose} appearance="primary">
                            Ok
                        </Button>
                        <Button onClick={handleClose} appearance="subtle">
                            Cancel
                        </Button>
                    </ButtonToolbar>
                </Stack>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalAddImage;