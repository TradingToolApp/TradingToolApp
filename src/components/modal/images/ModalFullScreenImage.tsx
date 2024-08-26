import {Modal} from "rsuite";
import Image from "next/image";
import React from "react";

interface ModalFullScreenImageProps {
    open: boolean;
    handleClose: () => void;
    images: any;
    fullScreenId: number;
}

const ModalFullScreenImage = ({ open, handleClose, images, fullScreenId }: ModalFullScreenImageProps) => {
    return (
        <Modal open={open} onClose={handleClose}>
            <Modal.Body>
                {fullScreenId !== -1 &&
                    <Image src={images[fullScreenId].filepath}
                           width={500}
                           height={500}
                           alt="Picture of the author"
                           objectFit="contain"
                           style={{width: '100%', height: 'auto'}}

                    />}
            </Modal.Body>
        </Modal>
    );
}

export default ModalFullScreenImage;