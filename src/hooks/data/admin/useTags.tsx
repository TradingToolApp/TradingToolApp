import {useContext} from "react";
import {AppContext} from "@/providers/app.provider";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import tagAPI from "@/libs/api-client/restful/tag-api";
import {formatTags} from "@/utils/formatData";
import {toast} from "react-toastify";
import {toastConfig} from "@/libs/constant";

export function useGetTags(initialData = []) {
    const {language} = useContext(AppContext);
    const queryInfo = useQuery({queryKey: ['tags'], queryFn: tagAPI.getTags, placeholderData: {data: initialData}})
    return {
        ...queryInfo,
        tags: formatTags(queryInfo.data.data, language),
    }
}

export function useAddTag() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ['addTag'],
        mutationFn: (data) => {
            return tagAPI.createTag(data)
        },
        onSuccess: (result: any) => {
            if (!result.success) {
                return toast.error(result.message, toastConfig.error as any);
            }
        },
        onError: (error: any) => {
            return toast.error(error, toastConfig.error as any);
        },
        onSettled: async () => {
            return await queryClient.invalidateQueries({queryKey: ['tags']})
        }
    })
}

export function useUpdateTag() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ['updateTag'],
        mutationFn: (data) => {
            return tagAPI.updateTag(data)
        },
        onSuccess: (result: any) => {
            if (!result.success) {
                return toast.error(result.message, toastConfig.error as any);
            }
        },
        onError: (error: any) => {
            return toast.error(error, toastConfig.error as any);
        },
        onSettled: async () => {
            return await queryClient.invalidateQueries({queryKey: ['tags']})
        }
    })
}

export function useDeleteTag() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ['deleteTag'],
        mutationFn: (data) => {
            return tagAPI.deleteTag(data)
        },
        onSuccess: (result: any) => {
            if (!result.success) {
                return toast.error(result.message, toastConfig.error as any);
            }
        },
        onError: (error: any) => {
            return toast.error(error, toastConfig.error as any);
        },
        onSettled: async () => {
            return await queryClient.invalidateQueries({queryKey: ['tags']})
        }
    })
}