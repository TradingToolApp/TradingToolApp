import React, {useEffect, useState} from 'react';
import Image from 'next/image';
import { Modal, VStack, ButtonGroup, Button, Stack } from 'rsuite';

const ModalCategory = ({ open, handleClose, categories, setCategories }) => {

    return (
        <Modal open={open} onClose={handleClose}>
            <Modal.Header>
                <Modal.Title>Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <VStack>
                    {categories.map((category) => (
                        <VStack key={category.id} className="d-flex justify-content-between align-items-center">
                            <p>{category.cate_bg}</p>
                            {category.translations.map((translation) =>
                                <Stack key={translation.languageCode}>
                                    <span>{translation.cate}</span>
                                    <span>{translation.description}</span>
                                </Stack>
                            )}
                            {/*<Image src={category.image} width={50} height={50} />*/}
                        </VStack>
                    ))}
                </VStack>
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

export default ModalCategory;