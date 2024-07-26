import { useContext } from 'react';
import { Modal, Button } from 'rsuite';
import RemindIcon from '@rsuite/icons/legacy/Remind';
import postAPI from '@/services/posts-api';
import { PostContext } from "@/contextProvider/postContext";

const DeleteTableRowModal = ({ slug, open, handleCloseDeleteRow, ...rests }) => {
    const { posts, setPosts, language } = useContext(PostContext);

    const handleConfirmDelete = () => {
        try {
            postAPI.deletePost(slug, language);
            const newPosts = posts.filter(post => post.slug !== slug);
            setPosts(newPosts);
            handleCloseDeleteRow();

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <Modal style={{ marginTop: "150px" }} backdrop="static" role="alertdialog" open={open} onClose={handleCloseDeleteRow} size="xs">
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
                    <Button onClick={handleCloseDeleteRow} appearance="subtle">
                        No
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default DeleteTableRowModal;