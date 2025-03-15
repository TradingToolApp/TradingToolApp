import axiosClient from "@/libs/axios/axios-client";

async function getPosts() {
    try {
        const res = await axiosClient.get(`/api/posts`);
        return res.data;
    } catch (err) {
        return err.response.data;
    }
}

async function getPaginatePosts(searchKeyword, limit, page) {
    try {
        const res = await axiosClient.get(`/api/posts/paginate-posts?searchKeyword=${searchKeyword}&limit=${limit}&page=${page}`);
        return res.data;
    } catch (err) {
        return err.response.data;
    }
}

async function getPublicPosts() {
    try {
        const res = await axiosClient.get('/api/posts/public-posts');
        return res.data;
    } catch (err) {
        return err.response.data;
    }
}

async function getPostBySlug(slug) {
    try {
        const res = await axiosClient.get('/api/posts/post-by-slug', {data: {slug}});
        return res.data;
    } catch (err) {
        return err.response.data;
    }
}

async function createPost(data) {
    try {
        const res = await axiosClient.post('/api/posts', {data});
        return res.data;
    } catch (err) {
        return err.response.data;
    }
}

async function updatePost(data) {
    try {
        const res = await axiosClient.put('/api/posts', {data});
        return res.data;
    } catch (err) {
        return err.response.data;
    }
}

async function deletePost(data) {
    try {
        const res = await axiosClient.delete('/api/posts', {data: {data}});
        return res.data;
    } catch (err) {
        return err.response.data;
    }
}

const postAPI = {
    getPosts,
    getPaginatePosts,
    getPublicPosts,
    getPostBySlug,
    createPost,
    updatePost,
    deletePost
}
export default postAPI;