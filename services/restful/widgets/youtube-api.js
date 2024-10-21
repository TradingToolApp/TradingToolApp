import axios from 'axios';

async function getYoutubeVideos() {
    try {
        const res = await axios.get('/api/widgets/youtube');
        return res.data;
    } catch (err) {
        return err.response.data;
    }
}

async function createYoutubeVideo( data ) {
    try {
        const res = await axios.post('/api/widgets/youtube', { data });
        return res.data;
    } catch (err) {
        return err.response.data;
    }
}

async function updateYoutubeVideo( data ) {
    try {
        const res = await axios.put('/api/widgets/youtube', { data });
        return res.data;
    } catch (err) {
        return err.response.data;
    }
}

async function deleteYoutubeVideo( data ) {
    try {
        const res = await axios.delete('/api/widgets/youtube', { data: { data } });
        return res.data;
    } catch (err) {
        return err.response.data;
    }
}

const youtubeAPI = {
    getYoutubeVideos,
    createYoutubeVideo,
    updateYoutubeVideo,
    deleteYoutubeVideo
}

export default youtubeAPI;