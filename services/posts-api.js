import axios from 'axios'
import { revalidatePath } from "next/cache";

function getPosts(language) {
    try {
        return axios.get('/api/posts', { params: { language } })
    } catch (error) {
        console.log(error);
    }
}
function createPost(fileName, mdxContent, data, language) {
    try {
        return axios.post('/api/posts', { fileName, mdxContent, data, language })
    } catch (error) {
        console.log(error);
    }
    revalidatePath("/admin/dashboard", { cache: 'no-store' });
    revalidatePath("/", { cache: 'no-store' });
}

function updatePost(fileName, mdxContent, data, language) {
    try {
        return axios.put('/api/posts', { fileName, mdxContent, data, language })
    } catch (error) {
        console.log(error);
    }
    revalidatePath("/admin/dashboard", { cache: 'no-store' }); 
    revalidatePath("/", { cache: 'no-store' });
}

function deletePost(fileName, language) {
    try {
        return axios.delete('/api/posts', { data: { fileName, language } })
    } catch (error) {
        console.log(error);
    }
    revalidatePath("/admin/dashboard", { cache: 'no-store' });
    revalidatePath("/", { cache: 'no-store' });
}

const postAPI = {
    getPosts,
    createPost,
    updatePost,
    deletePost
}
export default postAPI;