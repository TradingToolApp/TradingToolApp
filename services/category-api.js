import axios from 'axios'
import { revalidatePath } from "next/cache";

function getCategories() {
    return axios.get('/api/categories')
        .then(res => res.data)
        .catch(err => err.response.data);
}

function createCategory( data ) {
    return axios.post('/api/categories', { data })
        .then(res => res.data)
        .catch(err => err.response.data);
}

function updateCategory( data ) {
    return axios.put('/api/categories', { data })
        .then(res => res.data)
        .catch(err => err.response.data);
}

function deleteCategory( id ) {
    return axios.delete('/api/categories', { data: { id } })
        .then(res => res.data)
        .catch(err => err.response.data);
}

const categoryAPI = {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory
};

export default categoryAPI;