import axios from 'axios'

function getPosts() {
    return axios.get('/api/posts')
        .then(res => res.data)
        .catch(err => err.response.data);

}

function createPost( data ) {
    return axios.post('/api/posts', { data })
        .then(res => res.data)
        .catch(err => err.response.data)
}

function updatePost( data ) {
    // revalidatePath("/", "layout");
    return axios.put('/api/posts', { data })
        .then(res => res.data)
        .catch(err => err.response.data)
}

function deletePost( slug ) {
    return axios.delete('/api/posts', { data: { slug } })
        .then(res => res.data)
        .catch(err => err.response.data);
}

const postAPI = {
    getPosts,
    createPost,
    updatePost,
    deletePost
}
export default postAPI;