import axios from 'axios'

async function getPosts () {
    try {
        const res = await axios.get('/api/posts');
        return res.data;
    } catch (err) {
        return err.response.data;
    }
}

async function getPublicPosts() {
    try {
        const res = await axios.get('/api/posts/getPublicPosts');
        return res.data;
    } catch (err) {
        console.log(err)
        // return err.response.data;
    }
}

async function getPostBySlug( slug ) {
    try {
        const res = await axios.get('/api/posts/getPostBySlug', { data: { slug } });
        return res.data;
    } catch (err) {
        return err.response.data;
    }
}

async function createPost( data ) {
    try {
        const res = await axios.post('/api/posts', { data });
        return res.data;
    } catch (err) {
        return err.response.data;
    }
}

async function updatePost( data ) {
    try {
        const res = await axios.put('/api/posts', { data });
        return res.data;
    } catch (err) {
        return err.response.data;
    }
}

async function deletePost( data ) {
    try {
        const res = await axios.delete('/api/posts', { data: { data } });
        return res.data;
    } catch (err) {
        return err.response.data;
    }
}

const postAPI = {
    getPosts,
    getPublicPosts,
    getPostBySlug,
    createPost,
    updatePost,
    deletePost
}
export default postAPI;