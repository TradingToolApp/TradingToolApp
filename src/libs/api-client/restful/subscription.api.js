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

async function checkTrial(userId, productId) {
    try {
        const res = await axios.post('/api/subscription/check-trial', {userId, productId});
        return res.data;
    } catch (err) {
        return err.response.data;
    }
}

async function activateTrial(userId, productId) {
    try {
        const res = await axios.post('/api/subscription/activate-trial', {userId, productId});
        return res.data;
    } catch (err) {
        return err.response.data;
    }
}

async function checkLicense(userId, productId) {
    try {
        const res = await axios.post('/api/subscription/check-license', {userId, productId});
        return res.data;
    } catch (err) {
        return err.response.data;
    }
}

const subscriptionAPI = {
    getSubscribedUsers,
    activateKey,
    deactivateKey,
    checkTrial,
    activateTrial,
    checkLicense
};

export default subscriptionAPI;