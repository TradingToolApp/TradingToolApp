import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {toast} from 'react-toastify';
import {toastConfig} from "@/libs/constant";
import userAPI from "@/libs/api-client/restful/user.api";

export const useGetUserById = (id: any, session: any) => {
    const queryClient = useQuery({
        queryKey: ['currentUser', id],
        queryFn: () => userAPI.getUserById(id),
        initialData: session?.user,
        enabled: !!id
    })
    return {
        ...queryClient,
        profile: queryClient.data?.data,
    }
}

export const useUpdateUserById = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ['currentUser'],
        mutationFn: (data) => {
            return userAPI.updateUserById(data)
        },
        onSuccess: async (result: any) => {
            if (!result.success) {
                return toast.error(result.message, toastConfig.error as any);
            }
            return await queryClient.invalidateQueries({queryKey: ['users']})

        },
        onError: (error: any) => {
            return toast.error(error.message, toastConfig.error as any);
        },
    })
}

export const useGetUserSubscriptionsById = (id: any) => {
    const queryInfo = useQuery({
        queryKey: ['currentUserSubscriptions', id],
        queryFn: () => userAPI.getUserSubscriptionsById(id),
        enabled: !!id
    })
    return {
        ...queryInfo,
        subscriptions: queryInfo.data?.data,
    }
}

export const useCreateRegisteredDevice = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ['createRegisteredDevice'],
        mutationFn: (data: any) => {
            return userAPI.createRegisteredDevice(data)
        },
        onSuccess: async (result: any) => {
            if (!result.success) {
                return toast.error(result.message, toastConfig.error as any);
            }
            return await queryClient.invalidateQueries({queryKey: ['currentUserSubscriptions']})
        },
        onError: (error: any) => {
            return toast.error(error.message, toastConfig.error as any);
        },
    })
}

export const useUpdateRegisteredDevice = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ['updateRegisteredDevice'],
        mutationFn: (data: any) => {
            return userAPI.updateRegisteredDevice(data)
        },
        onSuccess: async (result: any) => {
            if (!result.success) {
                return toast.error(result.message, toastConfig.error as any);
            }
            return await queryClient.invalidateQueries({queryKey: ['currentUserSubscriptions']})
        },
        onError: (error: any) => {
            return toast.error(error.message, toastConfig.error as any);
        },
    })
}

export const useRemoveRegisteredDevice = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ['removeRegisteredDevice'],
        mutationFn: (data: any) => {
            return userAPI.removeRegisteredDevice(data)
        },
        onSuccess: async (result: any) => {
            if (!result.success) {
                return toast.error(result.message, toastConfig.error as any);
            }
            return await queryClient.invalidateQueries({queryKey: ['currentUserSubscriptions']})
        },
        onError: (error: any) => {
            return toast.error(error.message, toastConfig.error as any);
        },
    })
}