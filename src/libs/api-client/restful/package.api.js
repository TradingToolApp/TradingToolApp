import axios from 'axios';

async function getPackages() {
    try {
        const res = await axios.get('/api/packages');
        return res.data;
    } catch (err) {
        return err.response.data;
    }
}

async function getPublicPackages() {
    try {
        const res = await axios.get('/api/packages/public-packages');
        return res.data;
    } catch (err) {
        return err.response.data;
    }
}

async function createPackage(data) {
    try {
        const res = await axios.post('/api/packages', {data});
        return res.data;
    } catch (err) {
        return err.response.data;
    }
}

async function updatePackage(data) {
    try {
        const res = await axios.put('/api/packages', {data});
        return res.data;
    } catch (err) {
        return err.response.data;
    }
}

async function deletePackage(data) {
    try {
        const res = await axios.delete('/api/packages', {data: {data}});
        return res.data;
    } catch (err) {
        return err.response.data;
    }
}

const packageAPI = {
    getPackages,
    getPublicPackages,
    createPackage,
    updatePackage,
    deletePackage
};

export default packageAPI;