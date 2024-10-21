import axios from 'axios';

async function getComments() {
    try {
        const res = await axios.get('/api/comments');
        return res.data;
    } catch (err) {
        return err.response.data;
    }
}

async function getCommentByPostSlug( slug ) {
    try {
        const res = await axios.get('/api/comments/by-post-slug',
            {
                params: {
                    slug
                }
            });
        return res.data;
    } catch (err) {
        return err.response.data;
    }
}

async function createComment( data ) {
    try {
        const res = await axios.post('/api/comments', { data });
        return res.data;
    } catch (err) {
        return err.response.data;
    }
}

async function updateComment( data ) {
    try {
        const res = await axios.put('/api/comments', { data });
        return res.data;
    } catch (err) {
        return err.response.data;
    }
}

async function deleteComment( data ) {
    try {
        const res = await axios.delete('/api/comments', { data: { data } });
        return res.data;
    } catch (err) {
        return err.response.data;
    }
}

const commentAPI = {
    getComments,
    getCommentByPostSlug,
    createComment,
    updateComment,
    deleteComment
}

export default commentAPI;