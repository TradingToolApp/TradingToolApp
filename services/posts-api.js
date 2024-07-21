import axios from 'axios'
import { revalidatePath } from "next/cache";

export function createPost(fileName, mdxContent, data) { 
    try {
        return axios.post('/api/posts', { fileName, mdxContent, data })
        revalidatePath("/admin/dashboard", { cache: 'no-store' });
    } catch (error) {
        console.log(error);
    }
}

export function updatePost(fileName, mdxContent, data) {
    try {
        return axios.put('/api/posts', { fileName, mdxContent, data })
        revalidatePath("/admin/dashboard", { cache: 'no-store' });
    } catch (error) {     
        console.log(error);
    }
}

export function deletePost(fileName) {
    try {
        return axios.delete('/api/posts', { data: { fileName } })
        revalidatePath("/admin/dashboard", { cache: 'no-store' });
    } catch (error) {
        console.log(error);
    }
}
