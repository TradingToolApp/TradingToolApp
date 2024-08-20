import React, {useEffect, useState} from 'react';
import Image from 'next/image';
import {Modal, Uploader, Stack, Divider, Panel, ButtonGroup, Button} from 'rsuite';

const ModalTag = ({ open, handleClose }) => {


    return (
        <Modal open={open} onClose={handleClose}>
            <Modal.Header>
                <Modal.Title>Tag</Modal.Title>
            </Modal.Header>
            <Modal.Body>

            </Modal.Body>
            <Modal.Footer>
                <ButtonGroup>
                    <button className="btn btn-primary" onClick={handleClose}>Select</button>
                    <button className="btn btn-danger" onClick={handleClose}>Cancel</button>
                </ButtonGroup>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalTag;