import {Modal} from 'rsuite';
import {ACTION} from "@/libs/constant";
import FormPackages from "@/components/form/admin/FormPackages";

const ModalAddPackage = ({open, handleClose}: any) => {
    return (
        <Modal size="lg" open={open} onClose={handleClose}>
            <Modal.Header>
                <Modal.Title>Add Package</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{overflow: "hidden"}}>
                <FormPackages handleClose={handleClose} action={ACTION.CREATE}/>
            </Modal.Body>
        </Modal>
    );
};

export default ModalAddPackage;