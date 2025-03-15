import axios from 'axios';

//bcrypt not able to use on client-side so we need to use it on server-side
async function getUsers() {
    try {
        const res = await axios.get('/api/user');
        return res.data;
    } catch (err) {
        return err.response.data;
    }
}

async function getUserById(id) {
    try {
        const res = await axios.get(`/api/user/${id}`);
        return res.data;
    } catch (err) {
        return err.response.data;
    }
}

async function getUserSubscriptionsById(id) {
    try {
        const res = await axios.get(`/api/user/subscriptions?id=${id}`);
        return res.data;
    } catch (err) {
        return err.response.data;
    }
}

async function createUser(data) {
    try {
        const res = await axios.post('/api/user', {data});
        return res.data;
    } catch (err) {
        return err.response.data;
    }
}

async function updateUserById(data) {
    try {
        const res = await axios.put(`/api/user/${data.id}`, {data});
        return res.data;
    } catch (err) {
        return err.response.data;
    }
}

async function deleteUser(data) {
    try {
        const res = await axios.delete('/api/user', {data: {data}});
        return res.data;
    } catch (err) {
        return err.response.data;
    }
}

async function changePassword(data) {
    try {
        const res = await axios.post('/api/user/change-password', {data});
        return res.data;
    } catch (err) {
        return err.response.data;
    }
}

async function resetPassword(data) {
    try {
        const res = await axios.post('/api/user/reset-password', {data});
        return res.data;
    } catch (err) {
        return err.response.data;
    }
}

async function createRegisteredDevice(data) {
    try {
        const res = await axios.post('/api/user/registered-device', {data});
        return res.data;
    } catch (err) {
        return err.response.data;
    }
}

async function updateRegisteredDevice(data) {
    try {
        const res = await axios.put('/api/user/registered-device', {data});
        return res.data;
    } catch (err) {
        return err.response.data;
    }
}

async function removeRegisteredDevice(data) {
    try {
        const res = await axios.delete('/api/user/registered-device', {data: {data}});
        return res.data;
    } catch (err) {
        return err.response.data;
    }
}

async function sendVerifyEmail(email) {
    try {
        const res = await axios.post('/api/user/send-verify-email', {email});
        return res.data;
    } catch (err) {
        return err.response.data;
    }
}

const userAPI = {
    getUsers,
    getUserById,
    getUserSubscriptionsById,
    updateUserById,
    createUser,
    deleteUser,
    changePassword,
    resetPassword,
    createRegisteredDevice,
    updateRegisteredDevice,
    removeRegisteredDevice,
    sendVerifyEmail
};

export default userAPI;