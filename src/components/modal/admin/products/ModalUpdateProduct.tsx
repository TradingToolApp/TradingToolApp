import {Modal} from 'rsuite';
import {ACTION} from "@/libs/constant";
import FormProducts from "@/components/form/admin/FormProducts";

const ModalUpdateProduct = ({modalData, open, handleClose}: any) => {
    return (
        <Modal size="lg" open={open} onClose={handleClose}>
            <Modal.Header>
                <Modal.Title>Update Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormProducts formData={modalData} handleClose={handleClose} action={ACTION.UPDATE}/>
            </Modal.Body>
        </Modal>
    );
};

export default ModalUpdateProduct;