import { useContext } from "react";
import { AppContext } from "@/providers/app.provider";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import categoryAPI from "@/services/restful/category-api";
import { formatCategories } from "@/lib/formatData";
import postAPI from "@/services/restful/posts-api";
import {toast} from "react-toastify";
import {toastConfig} from "@/lib/constant";

export function useGetCategories(initialData = []) {
    const { language } = useContext(AppContext);
    const queryInfo  = useQuery({ queryKey: [ 'categories' ], queryFn: categoryAPI.getCategories, placeholderData: {data: initialData} })
    return {
        ...queryInfo,
        categories: formatCategories(queryInfo.data.data, language),
    }
}

export const useAddCategory = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ['addCategory'],
        mutationFn: (data) => {return categoryAPI.createCategory(data)},
        onSuccess: (result: any) => {
            if (!result.success) {
                return toast.error(result.message, toastConfig.error as any);
            }
        },
        onError: (error: any) => {
            return toast.error(error, toastConfig.error as any);
        },
        onSettled: async () => {
            return await queryClient.invalidateQueries({ queryKey: ['categories'] })
        }
    })
}
export const useUpdateCategory = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ['updateCategory'],
        mutationFn: (data) => {return categoryAPI.updateCategory(data)},
        onSuccess: (result: any) => {
            if (!result.success) {
                return toast.error(result.message, toastConfig.error as any);
            }
        },
        onError: (error: any) => {
            return toast.error(error, toastConfig.error as any);
        },
        onSettled: async () => {
            return await queryClient.invalidateQueries({ queryKey: ['categories'] })
        }
    })
}

export const useDeleteCategory = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ['deleteCategory'],
        mutationFn: (data) => {return categoryAPI.deleteCategory(data)},
        onSuccess: (result: any) => {
            if (!result.success) {
                return toast.error(result.message, toastConfig.error as any);
            }
        },
        onError: (error: any) => {
            return toast.error(error, toastConfig.error as any);
        },
        onSettled: async () => {
            return await queryClient.invalidateQueries({queryKey: ['categories']})
        }
    })
}