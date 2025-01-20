import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {toast} from 'react-toastify';
import {toastConfig} from "@/libs/constant";
import userAPI from "@/libs/api-client/restful/user.api";

export const useGetUserById = (id: any, session: any) => {
    return useQuery({
        queryKey: ['currentUser', id],
        queryFn: () => userAPI.getUserById(id),
        initialData: session?.user,
        enabled: !!id
    })
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

export const useRemoveRegisteredDevice = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ['removeRegisteredDevice'],
        mutationFn: (data) => {
            return userAPI.removeRegisteredDevice(data)
        },
        onSuccess: async (result: any) => {
            if (!result.success) {
                return toast.error(result.message, toastConfig.error as any);
            }
            return await queryClient.invalidateQueries({queryKey: ['currentUser']})
        },
        onError: (error: any) => {
            return toast.error(error.message, toastConfig.error as any);
        },
    })
}
