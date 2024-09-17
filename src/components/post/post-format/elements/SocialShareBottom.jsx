import React, { useState } from "react";
import { FaShareAlt, FaCopy } from "react-icons/fa";
import { Modal, Input, Whisper, Tooltip, InputGroup } from 'rsuite';

const SocialShareBottom = ( { shareData } ) => {
    const [ open, setOpen ] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleCopyURL = () => {
        navigator.clipboard.writeText(process.env.NEXT_PUBLIC_BASEPATH + "/post/" + shareData.slug);
    }

    return (
        <>
            <div className="post-shares m-t-xs-60">
                <div className="title">SHARE:</div>
                <ul className="social-share social-share__rectangular">
                    <li>
                        <button className="btn bg-color-facebook">
                            <FaShareAlt size={"2em"} onClick={handleOpen}/>
                        </button>
                    </li>
                </ul>
            </div>
            <Modal open={open} onClose={handleClose}>
                <Modal.Body>
                    <Whisper trigger="click" speaker={<Tooltip>Copied</Tooltip>}>
                        <InputGroup size={"lg"} onClick={handleCopyURL} inside >
                            <Input placeholder={process.env.NEXT_PUBLIC_BASEPATH + "/post/" + shareData.slug} readOnly/>
                            <InputGroup.Button>
                                <FaCopy size={"2rem"}/>
                            </InputGroup.Button>
                        </InputGroup>
                    </Whisper>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default SocialShareBottom;
