import axios from 'axios'

export function getImages() {
    try {
        return axios.get('/api/images')
    } catch (error) {
        console.log(error);
    }
}

export function createImages(formData) {
    try {
        return axios.post('/api/images', formData)
    } catch (error) {
        console.log(error);
    }
}

export function deleteImages(fileName) {
    try {
        return axios.delete('/api/images', { data: { fileName } })
    } catch (error) {
        console.log(error);
    }
}

const imageAPI = {
    getImages,
    createImages,
    deleteImages
}

export default imageAPI;
