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
        <Modal open={open} onClose={handleClose}>
            <Modal.Body>
                <Image src={fullScreenURL}
                       width={500}
                       height={500}
                       alt="Picture of the author"
                       objectFit="contain"
                       style={{width: '100%', height: 'auto'}}

                />
            </Modal.Body>
        </Modal>
    );
}

export default ModalFullScreenImage;