import { Modal } from 'rsuite';
import FormTwo from "../../form/FormTwo.tsx";
import { POSTACTION } from "@/lib/constant";

const AddTableRowModal = ({ openAddRow, handleCloseAddRow }) => {
    return (
        <Modal size={"full"} open={openAddRow} onClose={handleCloseAddRow}>
            <Modal.Header>
                <Modal.Title>Modal Title</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormTwo handleClose={handleCloseAddRow} action={POSTACTION.CREATE} />
            </Modal.Body>
        </Modal>
    );
};

export default AddTableRowModal;