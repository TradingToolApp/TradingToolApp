import { useContext } from 'react';
import { Modal, Button } from 'rsuite';
import RemindIcon from '@rsuite/icons/legacy/Remind';
import { AppContext } from "@/providers/appProvider";
import categoryAPI from "../../../../services/category-api";

const ModalDeleteCategory = ( { modalData, open, handleClose, ...rests }) => {
    const { categories, setCategories, language } = useContext(AppContext);

    const handleConfirmDelete = () => {
        try {
            categoryAPI.deleteCategory(modalData.id);
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