import { Modal } from 'rsuite';
import FormTwo from "../../form/FormTwo.tsx";
import { POSTACTION } from "@/lib/constant";

const EditTableRowModal = ({ modalData, openEditRow, handleCloseEditRow }) => {
    return (
        <Modal size={"full"} open={openEditRow} onClose={handleCloseEditRow}>
            <Modal.Header>
                <Modal.Title>Modal Title</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormTwo formData={modalData} handleClose={handleCloseEditRow} action={POSTACTION.UPDATE} />
            </Modal.Body>
        </Modal>
    );
};

export default EditTableRowModal;