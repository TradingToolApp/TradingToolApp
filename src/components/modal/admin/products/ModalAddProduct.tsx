import {Modal} from 'rsuite';
import {ACTION} from "@/libs/constant";
import FormProducts from "@/components/form/admin/FormProducts";

const ModalAddProduct = ({open, handleClose}: any) => {
    return (
        <Modal size="lg" open={open} onClose={handleClose}>
            <Modal.Header>
                <Modal.Title>Add Product</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{overflow: "hidden"}}>
                <FormProducts handleClose={handleClose} action={ACTION.CREATE}/>
            </Modal.Body>
        </Modal>
    );
};

export default ModalAddProduct;