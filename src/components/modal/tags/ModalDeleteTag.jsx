import React, { useContext } from 'react';
import { Modal, Button, useToaster, Message } from 'rsuite';
import { TagContext } from "@/providers/tagProvider";
import tagAPI from "@/services/tag-api";
import RemindIcon from '@rsuite/icons/legacy/Remind';

const ModalDeleteTag = ({ modalData, open, handleClose, ...rests }) => {
    const toaster = useToaster();
    const { tags, setTags } = useContext(TagContext);

    const handleConfirmDelete = async () => {
        try {
            const response = await tagAPI.deleteTag(modalData);
            if (!response.success) {
                return toaster.push(<Message type={"error"}>{response.message}</Message>);
            }
            const newTags = tags.filter(tag => tag.tag_slug !== modalData.tag_slug);
            setTags(newTags);
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