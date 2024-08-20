import React, {useEffect, useState} from 'react';
import Image from 'next/image';
import {Modal, Uploader, Stack, Divider, Panel, ButtonGroup, Button} from 'rsuite';

const ModalAuthor = ({ open, handleClose, authors, setAuthors }) => {


    return (
        <Modal size={"full"} open={open} onClose={handleClose}>
            <Modal.Header>
                <Modal.Title>Author</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Stack>
                    {authors.map(author => (
                        <Panel key={author.value} bordered>
                            <Stack>
                                <Image src={author.author_img} alt={author.label} width={50} height={50} />
                                <Stack>
                                    <p>{author.label}</p>
                                    <p>{author.author_desg}</p>
                                </Stack>
                            </Stack>
                        </Panel>
                    ))}
                </Stack>
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

export default ModalAuthor;