import axios from 'axios';

async function getProducts() {
    try {
        const res = await axios.get('/api/products');
        return res.data;
    } catch (err) {
        return err.response.data;
    }
}

async function getPublicProducts() {
    try {
        const res = await axios.get('/api/products/public-products');
        return res.data;
    } catch (err) {
        return err.response.data;
    }
}

async function createProduct(data) {
    try {
        const res = await axios.post('/api/products', {data});
        return res.data;
    } catch (err) {
        return err.response.data;
    }
}

async function updateProduct(data) {
    try {
        const res = await axios.put('/api/products', {data});
        return res.data;
    } catch (err) {
        return err.response.data;
    }
}

async function deleteProduct(data) {
    try {
        const res = await axios.delete('/api/products', {data: {data}});
        return res.data;
    } catch (err) {
        return err.response.data;
    }
}

const productAPI = {
    getProducts,
    getPublicProducts,
    createProduct,
    updateProduct,
    deleteProduct
};

export default productAPI;