import React, {useContext} from 'react';
import {Modal, Button} from 'rsuite';
import RemindFillIcon from '@rsuite/icons/RemindFill';
import {useRemoveRegisteredDevice} from "@/hooks/data/user/useUser";

const ModalRemoveRegisteredDevice = ({modalData, open, handleClose, ...rests}: any) => {
    const removeRegisteredDevice = useRemoveRegisteredDevice();
    const [loading, setLoading] = React.useState(false);
    const handleConfirmDelete = async () => {
        try {
            setLoading(true);
            const response = await removeRegisteredDevice.mutateAsync(modalData);
            if (response.success) {
                handleClose();
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Modal style={{marginTop: "150px"}} backdrop="static" role="alertdialog" open={open} onClose={handleClose}
               size="xs">
            <Modal.Body>
                <RemindFillIcon style={{color: '#ffb300', fontSize: 24, marginRight: "15px"}}/>
                Are you sure
            </Modal.Body>
            <Modal.Footer>
                <Button
                    onClick={handleConfirmDelete} appearance="primary" disabled={loading}
                >
                    Yes
                </Button>
                <Button onClick={handleClose} appearance="subtle" disabled={loading}>
                    No
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalRemoveRegisteredDevice;