import axios from 'axios'
import { revalidatePath } from "next/cache";

export function getImages() {
    try {
        return axios.get('/api/images')
        revalidatePath("/admin/dashboard", { cache: 'no-store' });
    } catch (error) {
        console.log(error);
    }
}

export function createImages(formData) {
    try {
        return axios.post('/api/images', formData)
        revalidatePath("/admin/dashboard", { cache: 'no-store' });
    } catch (error) {
        console.log(error);
    }
}

export function deleteImages(fileName) {
    try {
        return axios.delete('/api/images', { data: { fileName } })
        revalidatePath("/admin/dashboard", { cache: 'no-store' });
    } catch (error) {
        console.log(error);
    }
}
