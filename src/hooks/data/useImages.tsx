import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import imageAPI from "@/services/restful/image-api";
import {toast} from "react-toastify";
import {toastConfig} from "@/lib/constant";

export function useGetImages(initialData = []) {
    const queryInfo  = useQuery({ queryKey: [ 'images' ], queryFn: imageAPI.getImages, placeholderData: {data: initialData} })
    return {
        ...queryInfo,
        images: queryInfo.data.data,
    }
}

export function useAddImages() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ['addImages'],
        mutationFn: (formData) => {return imageAPI.createImages(formData)},
        onSuccess: (result: any) => {
            if (!result.success) {
                return toast.error(result.message, toastConfig.error as any);
            }
        },
        onError: (error: any) => {
            return toast.error(error.message, toastConfig.error as any);
        },
        onSettled: async () => {
            return await queryClient.invalidateQueries({ queryKey: ['images'] })
        }
    })
}

export function useDeleteImages () {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ['deleteImages'],
        mutationFn: (data) => {return imageAPI.deleteImages(data)},
        onSuccess: (result: any) => {
            if (!result.success) {
                return toast.error(result.message, toastConfig.error as any);
            }
        },
        onError: (error: any) => {
            return toast.error(error.message, toastConfig.error as any);
        },
        onSettled: async () => {
            return await queryClient.invalidateQueries({ queryKey: ['images'] })
        }
    })
}

