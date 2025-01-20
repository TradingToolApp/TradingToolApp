import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import youtubeAPI from "@/libs/api-client/restful/widgets/youtube-api";
import {toast} from "react-toastify";
import {toastConfig} from "@/libs/constant";

export function useGetYoutubeVideos(initialData = []) {
    const queryInfo = useQuery({
        queryKey: ['youtubeVideos'],
        queryFn: youtubeAPI.getYoutubeVideos,
        placeholderData: {data: initialData}
    })
    return {
        ...queryInfo,
        youtubeVideos: queryInfo.data.data,
    }
}

export function useAddYoutubeVideo() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ['addYoutubeVideo'],
        mutationFn: (data) => {
            return youtubeAPI.createYoutubeVideo(data)
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
            return await queryClient.invalidateQueries({queryKey: ['youtubeVideos']})
        }
    })
}

export function useUpdateYoutubeVideo() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ['updateYoutubeVideo'],
        mutationFn: (data) => {
            return youtubeAPI.updateYoutubeVideo(data)
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
            return await queryClient.invalidateQueries({queryKey: ['youtubeVideos']})
        }
    })
}

export function useDeleteYoutubeVideo() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ['deleteYoutubeVideo'],
        mutationFn: (data) => {
            return youtubeAPI.deleteYoutubeVideo(data)
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
            return await queryClient.invalidateQueries({queryKey: ['youtubeVideos']})
        }
    })
}