import axios from 'axios'
import { revalidatePath } from "next/cache";

function getAuthors() {
    return axios.get('/api/authors')
        .then(res => res.data)
        .catch(err => err.response.data);
}

function createAuthor( data ) {
    return axios.post('/api/authors', { data })
        .then(res => res.data)
        .catch(err => err.response.data);
}

function updateAuthor( data ) {
    return axios.put('/api/authors', { data })
        .then(res => res.data)
        .catch(err => err.response.data);
}

function deleteAuthor( slug ) {
    return axios.delete('/api/authors', { data: { slug } })
        .then(res => res.data)
        .catch(err => err.response.data);
}

const authorAPI = {
    getAuthors,
    createAuthor,
    updateAuthor,
    deleteAuthor
};

export default authorAPI;