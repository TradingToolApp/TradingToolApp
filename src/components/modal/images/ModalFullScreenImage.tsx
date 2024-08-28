import {Modal} from "rsuite";
import Image from "next/image";
import React from "react";

interface ModalFullScreenImageProps {
    open: boolean;
    handleClose: () => void;
    fullScreenURL: string;
}

const ModalFullScreenImage = ({open, handleClose, fullScreenURL}: ModalFullScreenImageProps) => {
    return (
        <Modal size={1000} open={open} onClose={handleClose}>
            <Modal.Body style={{overflow: "hidden", textAlign: "center"}}>
                <Image src={fullScreenURL}
                       width={500}
                       height={500}
                       alt="Picture full screen"
                       style={{
                           width: "auto",
                           objectFit: 'contain', // cover, contain, none
                       }}
                />
            </Modal.Body>
        </Modal>
    );
}

export default ModalFullScreenImage;