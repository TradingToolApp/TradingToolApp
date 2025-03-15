import {useContext} from "react";
import {useMutation, useQuery, useQueryClient, keepPreviousData} from "@tanstack/react-query";
import {toast} from 'react-toastify';
import {toastConfig} from "@/libs/constant";
import {AppContext} from "@/providers/app.provider";
import {formatPosts, translatePosts} from "@/utils/formatData";
import postAPI from "@/libs/api-client/restful/posts-api";

export function usePosts(initialData = []) {
    const {language} = useContext(AppContext);
    const queryInfo = useQuery({
        queryKey: ['posts'],
        queryFn: () => postAPI.getPosts(),
        placeholderData: {data: initialData},
    })
    return {
        ...queryInfo,
        posts: formatPosts(queryInfo?.data?.data, language),
    }
}

export function usePaginatePosts(searchKeyword = '', limit = 10, page = 1) {
    const {language} = useContext(AppContext);
    const queryInfo = useQuery({
        queryKey: ['posts', limit, page],
        queryFn: () => postAPI.getPaginatePosts(searchKeyword, limit, page),
        placeholderData: keepPreviousData,
    })
    return {
        ...queryInfo,
        posts: formatPosts(queryInfo?.data?.data?.posts, language),
        total: queryInfo?.data?.data?.total,
    }
}

export function useGetPublicPosts(initialData = []) {
    const {language} = useContext(AppContext);
    const queryInfo = useQuery({
        queryKey: ['publicPosts'],
        queryFn: postAPI.getPublicPosts,
        initialData: {data: initialData},  // Don't use because it will make the layout flicker
    })

    const trendingPosts = queryInfo.data?.data?.filter((post: any) => post.trending)

    return {
        ...queryInfo,
        publicPosts: translatePosts(queryInfo?.data?.data, language),
        sliderPosts: translatePosts(trendingPosts, language)
    }
}

export const useAddPost = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ['addPost'],
        mutationFn: (newPost) => {
            return postAPI.createPost(newPost)
        },
        onSuccess: async (result: any) => {
            if (!result.success) {
                return toast.error(result.message, toastConfig.error as any);
            }
            return await queryClient.invalidateQueries({queryKey: ['posts']})
        },
        onError: (error: any) => {
            return toast.error(error, toastConfig.error as any);
        },
    })
}

export const useUpdatePost = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ['updatePost'],
        mutationFn: (data) => {
            return postAPI.updatePost(data)
        },
        onSuccess: (result: any) => {
            if (!result.success) {
                return toast.error(result.message, toastConfig.error as any);
            }
        },
        onError: (error: any) => {
            return toast.error(error.message, toastConfig.error as any);
        },
        onSettled: async () => {
            return await queryClient.invalidateQueries({queryKey: ['posts']})
        }
    })
}

export const useDeletePost = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ['deletePost'],
        mutationFn: (data) => {
            return postAPI.deletePost(data)
        },
        onSuccess: (result: any) => {
            if (!result.success) {
                return toast.error(result.message, toastConfig.error as any);
            }
        },
        onError: (error: any) => {
            return toast.error(error.message, toastConfig.error as any);
        },
        onSettled: async () => {
            return await queryClient.invalidateQueries({queryKey: ['posts']})
        }
    })
}