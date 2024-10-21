import { useContext } from "react";
import { AppContext } from "@/providers/app.provider";
import {useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import commentAPI from "@/services/restful/comment-api";
import { formatComments } from "@/lib/formatData";
import {toast} from "react-toastify";
import {toastConfig} from "@/lib/constant";

export function useGetComments(initialData = []) {
    const { language } = useContext(AppContext);
    const queryInfo  = useQuery({ queryKey: [ 'comments' ], queryFn: commentAPI.getComments, placeholderData: {data: initialData} })
    return {
        ...queryInfo,
        comments: formatComments(queryInfo.data.data, language),
    }
}

export function useUpdateComment() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data) => {return commentAPI.updateComment(data)},
        onSuccess: (result: any) => {
            if (!result.success) {
                return toast.error(result.message, toastConfig.error as any);
            }
        },
        onError: (error: any) => {
            return toast.error(error.message, toastConfig.error as any);
        },
        onSettled: async () => {
            return await queryClient.invalidateQueries({ queryKey: ['comments'] })
        }
    })
}

export function useDeleteComment() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data) => {return commentAPI.deleteComment(data)},
        onSuccess: (result: any) => {
            if (!result.success) {
                return toast.error(result.message, toastConfig.error as any);
            }
        },
        onError: (error: any) => {
            return toast.error(error.message, toastConfig.error as any);
        },
        onSettled: async () => {
            return await queryClient.invalidateQueries({ queryKey: ['comments'] })
        }
    })
}