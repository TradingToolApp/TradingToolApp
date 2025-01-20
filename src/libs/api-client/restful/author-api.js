import axios from 'axios';

async function getAuthors() {
    try {
        const res = await axios.get('/api/authors');
        return res.data;
    } catch (err) {
        return err.response.data;
    }
}

async function createAuthor( data ) {
    try {
        const res = await axios.post('/api/authors', { data });
        return res.data;
    } catch (err) {
        return err.response.data;
    }
}

async function updateAuthor( data ) {
    try {
        const res = await axios.put('/api/authors', { data });
        return res.data;
    } catch (err) {
        return err.response.data;
    }
}

async function deleteAuthor( data ) {
    try {
        const res = await axios.delete('/api/authors', { data: { data } });
        return res.data;
    } catch (err) {
        return err.response.data;
    }
}

const authorAPI = {
    getAuthors,
    createAuthor,
    updateAuthor,
    deleteAuthor
};

export default authorAPI;