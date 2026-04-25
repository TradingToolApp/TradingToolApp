import axiosClient from "@/libs/axios/axios-client";

async function getPosts() {
    try {
        const res = await axiosClient.get(`/api/posts`);
        return res.data;
    } catch (err) {
        return err.response.data;
    }
}

async function getPaginatePosts(searchKeyword, limit, page, status = '') {
    try {
        const res = await axiosClient.get(`/api/posts/paginate-posts?searchKeyword=${searchKeyword}&limit=${limit}&page=${page}&status=${status}`);
        return res.data;
    } catch (err) {
        return err.response.data;
    }
}

async function getPostsByCategory(cate_slug, limit, page) {
    try {
        const res = await axiosClient.get(`/api/posts/posts-by-category?cate_slug=${cate_slug}&limit=${limit}&page=${page}`);
        return res.data;
    } catch (err) {
        return err.response.data;
    }
}

async function getSliderPosts() {
    try {
        const res = await axiosClient.get('/api/posts/slider-posts');
        return res.data;
    } catch (err) {
        return err.response.data;
    }
}

async function getWidgetPosts() {
    try {
        const res = await axiosClient.get('/api/posts/widget-posts');
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
    getPostsByCategory,
    getSliderPosts,
    getWidgetPosts,
    getPublicPosts,
    getPostBySlug,
    createPost,
    updatePost,
    deletePost
}
export default postAPI;