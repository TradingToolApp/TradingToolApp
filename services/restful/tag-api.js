import axios from 'axios';

async function getTags() {
    try {
        const res = await axios.get('/api/tags');
        return res.data;
    } catch (err) {
        return err.response.data;
    }
}

async function createTag( data ) {
    try {
        const res = await axios.post('/api/tags', { data });
        return res.data;
    } catch (err) {
        return err.response.data;
    }
}

async function updateTag( data ) {
    try {
        const res = await axios.put('/api/tags', { data });
        return res.data;
    } catch (err) {
        return err.response.data;
    }
}

async function deleteTag( data ) {
    try {
        const res = await axios.delete('/api/tags', { data: {data} });
        return res.data;
    } catch (err) {
        return err.response.data;
    }
}

const authorAPI = {
    getTags,
    createTag,
    updateTag,
    deleteTag
};

export default authorAPI;