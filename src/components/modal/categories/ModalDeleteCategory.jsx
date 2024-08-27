import React, { useContext } from 'react';
import { Modal, Button, useToaster, Message } from 'rsuite';
import { CategoryContext } from "@/providers/categoryProvider";
import categoryAPI from "@/services/category-api";
import RemindIcon from '@rsuite/icons/legacy/Remind';

const ModalDeleteCategory = ( { modalData, open, handleClose, ...rests }) => {
    const toaster = useToaster();
    const { categories, setCategories } = useContext(CategoryContext);

    const handleConfirmDelete = async () => {
        try {
            const response = await categoryAPI.deleteCategory(modalData);
            if (!response.success) {
                return toaster.push(<Message type={"error"}>{response.message}</Message>);
            }
            const newCategories = categories.filter(category => category.cate_slug !== modalData.cate_slug);
            setCategories(newCategories);
            handleClose();
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <Modal style={{ marginTop: "150px" }} backdrop="static" role="alertdialog" open={open} onClose={handleClose} size="xs">
                <Modal.Body>
                    <RemindIcon style={{ color: '#ffb300', fontSize: 24, marginRight: "15px" }} />
                    Are you sure
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        onClick={handleConfirmDelete} appearance="primary"
                    >
                        Yes
                    </Button>
                    <Button onClick={handleClose} appearance="subtle">
                        No
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalDeleteCategory;