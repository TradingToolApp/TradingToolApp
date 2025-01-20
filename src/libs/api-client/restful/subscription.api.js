import axios from 'axios';

async function getSubscribedUsers() {
    try {
        const res = await axios.get('/api/subscription');
        return res.data;
    } catch (err) {
        return err.response.data;
    }
}

async function activateKey(id) {
    try {
        const res = await axios.put('/api/subscription/activate-key', {id});
        return res.data;
    } catch (err) {
        return err.response.data;
    }
}

async function deactivateKey(id) {
    try {
        const res = await axios.put('/api/subscription/deactivate-key', {id});
        return res.data;
    } catch (err) {
        return err.response.data;
    }
}

const subscriptionAPI = {
    getSubscribedUsers,
    activateKey,
    deactivateKey
};

export default subscriptionAPI;