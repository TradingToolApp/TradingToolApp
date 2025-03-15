import React from "react";
import Image from "next/image";
import {Button, Card, Modal} from "rsuite";
import subscriptionAPI from "@/libs/api-client/restful/subscription.api";
import {toast} from "react-toastify";
import {toastConfig} from "@/libs/constant";

interface ModalConfirmGetTrialProps {
    open: boolean;
    handleClose: () => void;
    user: any;
    product: any;
}

const ModalConfirmGetTrial = ({open, handleClose, user, product}: ModalConfirmGetTrialProps) => {
    const [loading, setLoading] = React.useState(false);
    const handleConfirmGetTrial = async () => {
        setLoading(true);
        const res = await subscriptionAPI.activateTrial(user.profile.id, product.id);
        if (!res.success) {
            setLoading(false);
            return toast.error(res.message, toastConfig.error as any);
        }
        handleClose();
        setLoading(false);
        return toast.success(res.message, toastConfig.success as any);
    }

    return (
        <Modal open={open} onClose={handleClose} backdrop={"static"} size="sm">
            <Modal.Header>
                <Modal.Title>Confirm get Trial</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body">
                Are you sure you want to get a trial? The trial will be available for 3 days.
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleConfirmGetTrial} appearance="primary" disabled={loading}>
                    Yes
                </Button>
                <Button onClick={handleClose} appearance="subtle" disabled={loading}>No</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalConfirmGetTrial;