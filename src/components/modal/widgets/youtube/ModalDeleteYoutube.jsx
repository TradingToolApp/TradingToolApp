import React, { useContext } from 'react';
import { Modal, Button } from 'rsuite';
import { YoutubeContext } from "@/providers/widgets/youtube.provider";
import { toast } from 'react-toastify';
import { toastConfig } from "@/lib/constant";
import youtubeAPI from "@/services/widgets/youtube-api";
import RemindIcon from '@rsuite/icons/legacy/Remind';

const ModalDelete = ({ modalData, open, handleClose, ...rests }) => {
    const { allDataYoutube, setAllDataYoutube } = useContext(YoutubeContext);

    const handleConfirmDelete = async () => {
        try {
            const response = await youtubeAPI.deleteYoutubeURL(modalData);
            if (!response.success) {
                return toast.error(response.message, toastConfig.error);
            }
            const newTags = allDataYoutube.filter(tag => tag.id !== modalData.id);
            setAllDataYoutube(newTags);
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

export default ModalDelete;