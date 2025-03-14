import axios from 'axios'

async function getImages() {
    try {
        const res = await axios.get('/api/images');
        return res.data;
    } catch (err) {
        return err.response.data;
    }
}

async function createImages(formData) {
    try {
        const res = await axios.post('/api/images', formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return res.data;
    } catch (err) {
        return err.response.data;
    }
}

async function deleteImages(data) {
    try {
        const res = await axios.delete('/api/images', {data});
        return res.data;
    } catch (err) {
        console.log(err)
        return err.response.data;
    }
}

const imageAPI = {
    getImages,
    createImages,
    deleteImages
}

export default imageAPI;
