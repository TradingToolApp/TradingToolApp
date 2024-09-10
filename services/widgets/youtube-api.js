import axios from 'axios';

async function getYoutubeURLs() {
    try {
        const res = await axios.get('/api/widgets/youtube');
        return res.data;
    } catch (err) {
        return err.response.data;
    }
}

async function createYoutubeURL( data ) {
    try {
        const res = await axios.post('/api/widgets/youtube', { data });
        return res.data;
    } catch (err) {
        return err.response.data;
    }
}

async function updateYoutubeURL( data ) {
    try {
        const res = await axios.put('/api/widgets/youtube', { data });
        return res.data;
    } catch (err) {
        return err.response.data;
    }
}

async function deleteYoutubeURL( data ) {
    try {
        const res = await axios.delete('/api/widgets/youtube', { data: { data } });
        return res.data;
    } catch (err) {
        return err.response.data;
    }
}

const youtubeAPI = {
    getYoutubeURLs,
    createYoutubeURL,
    updateYoutubeURL,
    deleteYoutubeURL
}

export default youtubeAPI;