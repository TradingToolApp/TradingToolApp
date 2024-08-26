import axios from 'axios'

function getImages() {
    return axios.get('/api/images')
        .then(res => res.data)
        .catch(err => err.response.message);
}

function createImages( formData ) {
    return axios.post('/api/images', formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
        .then(res => res.data)
        .catch(err => err.response.message);
}

function deleteImages( data ) {
    // console.log(filepaths)
    return axios.delete('/api/images', { data })
        .then(res => res.data)
        .catch(err => err.response.message);
}

const imageAPI = {
    getImages,
    createImages,
    deleteImages
}

export default imageAPI;
