import {Modal} from 'rsuite';
import {ACTION} from "@/libs/constant";
import FormPackages from "@/components/form/admin/FormPackages";

const ModalUpdatePackage = ({modalData, open, handleClose}: any) => {
    return (
        <Modal size="lg" open={open} onClose={handleClose}>
            <Modal.Header>
                <Modal.Title>Update Package</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormPackages formData={modalData} handleClose={handleClose} action={ACTION.UPDATE}/>
            </Modal.Body>
        </Modal>
    );
};

export default ModalUpdatePackage;