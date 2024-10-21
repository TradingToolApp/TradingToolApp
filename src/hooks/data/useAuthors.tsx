import { useContext } from "react";
import { AppContext } from "@/providers/app.provider";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import authorAPI from "@/services/restful/author-api";
import { formatAuthors } from "@/lib/formatData";
import {toast} from "react-toastify";
import {toastConfig} from "@/lib/constant";

export function useGetAuthors(initialData = []) {
    const { language } = useContext(AppContext);
    const queryInfo  = useQuery({ queryKey: [ 'authors' ], queryFn: authorAPI.getAuthors, placeholderData: {data: initialData} })
    return {
        ...queryInfo,
        authors: formatAuthors(queryInfo.data.data, language),
    }
}

export function useAddAuthor() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) => {return authorAPI.createAuthor(data)},
        onSuccess: (result: any) => {
            if (!result.success) {
                return toast.error(result.message, toastConfig.error as any);
            }
        },
        onError: (error: any) => {
            return toast.error(error, toastConfig.error as any);
        },
        onSettled: async () => {
            return await queryClient.invalidateQueries({ queryKey: ['authors'] })
        }
    })
}

export function useUpdateAuthor() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) => {return authorAPI.updateAuthor(data)},
        onSuccess: (result: any) => {
            if (!result.success) {
                return toast.error(result.message, toastConfig.error as any);
            }
        },
        onError: (error: any) => {
            return toast.error(error, toastConfig.error as any);
        },
        onSettled: async () => {
            return await queryClient.invalidateQueries({ queryKey: ['authors'] })
        }
    })
}

export function useDeleteAuthor() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) => {return authorAPI.deleteAuthor(data)},
        onSuccess: (result: any) => {
            if (!result.success) {
                return toast.error(result.message, toastConfig.error as any);
            }
        },
        onError: (error: any) => {
            return toast.error(error, toastConfig.error as any);
        },
        onSettled: async () => {
            return await queryClient.invalidateQueries({ queryKey: ['authors'] })
        }
    })
}