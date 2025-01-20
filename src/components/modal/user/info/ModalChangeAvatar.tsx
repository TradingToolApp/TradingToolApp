import React, {useRef, useState} from "react";
import {Modal, Schema, Loader, Uploader} from 'rsuite';
import {toastConfig} from "@/libs/constant";
import {toast} from "react-toastify";
import {RxAvatar} from "react-icons/rx";
import Image from "next/image";

interface IModalChangePassword {
    open: boolean;
    handleClose: () => void;
    user: any;
}

const {StringType} = Schema.Types;

const model = Schema.Model({
    oldPassword: StringType().isRequired("This field is required."),
    newPassword: StringType().isRequired("This field is required."),
});

function previewFile(file: any, callback: any) {
    const reader = new FileReader();
    reader.onloadend = () => {
        callback(reader.result);
    };
    reader.readAsDataURL(file);
}


const ModalChangeAvatar = ({open, handleClose, user}: IModalChangePassword) => {
    const [uploading, setUploading] = useState(false);
    const [fileInfo, setFileInfo] = useState(null);

    return (
        <Modal size={"xs"} backdrop open={open} onClose={handleClose} style={{marginTop: "50px"}}>
            <Modal.Header>
                <Modal.Title>Upload Avatar</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{overflow: "hidden", textAlign: "center"}}>
                <Uploader
                    fileListVisible={false}
                    listType="picture"
                    action="/api/user/change-avatar"
                    onUpload={file => {
                        setUploading(true);
                        previewFile(file.blobFile, (value: any) => {
                            setFileInfo(value);
                        });
                    }}
                    onSuccess={(response, file) => {
                        setUploading(false);
                    }}
                    onError={() => {
                        setFileInfo(null);
                        setUploading(false);
                    }}
                >
                    <button style={{width: 200, height: 200, marginTop: "40px"}}>
                        {uploading && <Loader backdrop center/>}
                        {fileInfo ? (
                            <Image src={fileInfo} alt="Image Uploading" width={100} height={100}/>
                        ) : (
                            <RxAvatar style={{fontSize: 80}}/>
                        )}
                    </button>
                </Uploader>
            </Modal.Body>
        </Modal>
    );
};

export default ModalChangeAvatar;