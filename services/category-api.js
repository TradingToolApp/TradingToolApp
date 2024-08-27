import axios from 'axios'

async function getCategories() {
    try {
        const res = await axios.get('/api/categories');
        return res.data;
    } catch (err) {
        return err.response.data;
    }
}

async function createCategory( data ) {
    try {
        const res = await axios.post('/api/categories', { data });
        return res.data;
    } catch (err) {
        return err.response.data;
    }
}

async function updateCategory( data ) {
    try {
        const res = await axios.put('/api/categories', { data });
        return res.data;
    } catch (err) {
        return err.response.data;
    }
}

async function deleteCategory( data ) {
    try {
        const res = await axios.delete('/api/categories', { data: { data } });
        return res.data;
    } catch (err) {
        return err.response.data;
    }
}

const categoryAPI = {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory
};

export default categoryAPI;