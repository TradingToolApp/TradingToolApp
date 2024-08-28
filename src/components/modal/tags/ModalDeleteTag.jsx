import React, { useContext } from 'react';
import { Modal, Button } from 'rsuite';
import { TagContext } from "@/providers/tag.provider";
import { toast } from 'react-toastify';
import { toastConfig } from "@/lib/constant";
import tagAPI from "@/services/tag-api";
import RemindIcon from '@rsuite/icons/legacy/Remind';

const ModalDeleteTag = ({ modalData, open, handleClose, ...rests }) => {
    const { allDataTags, setAllDataTags } = useContext(TagContext);

    const handleConfirmDelete = async () => {
        try {
            const response = await tagAPI.deleteTag(modalData);
            if (!response.success) {
                return toast.error(response.message, toastConfig.error);
            }
            const newTags = allDataTags.filter(tag => tag.id !== modalData.id);
            setAllDataTags(newTags);
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

export default ModalDeleteTag;