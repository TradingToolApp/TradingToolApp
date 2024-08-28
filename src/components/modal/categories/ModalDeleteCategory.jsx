import React, { useContext } from 'react';
import { Modal, Button } from 'rsuite';
import { CategoryContext } from "@/providers/category.provider";
import { toast } from 'react-toastify';
import { toastConfig } from "@/lib/constant";
import categoryAPI from "@/services/category-api";
import RemindIcon from '@rsuite/icons/legacy/Remind';

const ModalDeleteCategory = ( { modalData, open, handleClose, ...rests }) => {
    const { allDataCategories, setAllDataCategories } = useContext(CategoryContext);

    const handleConfirmDelete = async () => {
        try {
            const response = await categoryAPI.deleteCategory(modalData);
            if (!response.success) {
                return toast.error(response.message, toastConfig.error);
            }
            const newCategories = allDataCategories.filter(category => category.id !== modalData.id);
            setAllDataCategories(newCategories);
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