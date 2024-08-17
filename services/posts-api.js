import axios from 'axios'
import { revalidatePath } from "next/cache";

function getPosts() {
    try {
        return axios.get('/api/posts')
    } catch (error) {
        console.log(error);
    }
}
function createPost(data) {
    try {
        return axios.post('/api/posts', { data })
    } catch (error) {
        console.log(error);
    }
    revalidatePath("/admin/dashboard", { cache: 'no-store' });
    revalidatePath("/", { cache: 'no-store' });
}

function updatePost(data) {
    try {
        return axios.put('/api/posts', { data })
    } catch (error) {
        console.log(error);
    }
    revalidatePath("/admin/dashboard", { cache: 'no-store' }); 
    revalidatePath("/", { cache: 'no-store' });
}

function deletePost(slug) {
    try {
        return axios.delete('/api/posts', { data: { slug  } })
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