import {Button, ButtonToolbar, Message, Modal, Stack, Uploader, useToaster} from "rsuite";
import React, {useState} from "react";
import {useAddImages} from "@/hooks/data/admin/useImages";

interface ModalAddImagesProps {
    open: boolean;
    handleClose: () => void;
}

const ModalAddImage = ({open, handleClose}: ModalAddImagesProps) => {
    const toaster = useToaster();
    const addImages = useAddImages();
    const [uploading, setUploading] = useState(false);
    const [upload, setUpload]: any = useState([]);

    const handleUpload = async () => {
        try {
            const validateNoSpace = upload.some((file: any) => file.name.includes(" "));
            if (validateNoSpace) {
                toaster.push(<Message type={"error"}>File name should not contain whitespace!</Message>);
                return;
            }

            const formData = new FormData();
            upload.map((file: any) => formData.append("file", file.blobFile));
            setUploading(true);
            const res = await addImages.mutateAsync(formData as any);
            setUploading(false);
            if (res.success) {
                setUpload([]);
                handleClose();
            }
        } catch (error) {
            console.log(error);
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
                          onError={(err) => {
                              setUploading(false);
                          }}
                          multiple
                          draggable>
                    <div style={{height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <span>Click or Drag files to this area to upload</span>
                    </div>
                </Uploader>
            </Modal.Body>
            <Modal.Footer>
                <Stack justifyContent={"space-between"}>
                    <Button className='mx-2' style={{height: "60px"}} appearance="subtle" onClick={handleUpload}
                            disabled={uploading}>{uploading ? "Uploading" : "Upload"}</Button>
                    <ButtonToolbar>
                        <Button onClick={handleClose} appearance="subtle" disabled={uploading}>
                            Cancel
                        </Button>
                    </ButtonToolbar>
                </Stack>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalAddImage;