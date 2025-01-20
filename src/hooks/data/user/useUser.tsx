import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {toast} from 'react-toastify';
import {toastConfig} from "@/libs/constant";
import userAPI from "@/libs/api-client/restful/user.api";

export const useUpdateUserById = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ['updateUserById'],
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
