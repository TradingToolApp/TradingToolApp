import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import subscriptionAPI from "@/libs/api-client/restful/subscription.api";
import {toast} from "react-toastify";
import {toastConfig} from "@/libs/constant";
import {formatSubscribedUsers} from "@/utils/formatData";

export function useSubscribedUsers(initialData = []) {
    const queryInfo = useQuery({
        queryKey: ['subscribedUsers'],
        queryFn: subscriptionAPI.getSubscribedUsers,
        placeholderData: {data: initialData}
    })
    return {
        ...queryInfo,
        subscribedUsers: formatSubscribedUsers(queryInfo.data.data),
    }
}

export function useActivateKey() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ['activateKey'],
        mutationFn: (id: any) => {
            return subscriptionAPI.activateKey(id)
        },
        onSuccess: (result: any) => {
            if (!result.success) {
                return toast.error(result.message, toastConfig.error as any);
            }
            return queryClient.invalidateQueries({queryKey: ['activateKey']})
        },
        onError: (error: any) => {
            return toast.error(error, toastConfig.error as any);
        },
    })
}

export function useDeactivateKey() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ['deactivateKey'],
        mutationFn: (id: any) => {
            return subscriptionAPI.deactivateKey(id)
        },
        onSuccess: (result: any) => {
            if (!result.success) {
                return toast.error(result.message, toastConfig.error as any);
            }
            return queryClient.invalidateQueries({queryKey: ['activateKey']})
        },
        onError: (error: any) => {
            return toast.error(error, toastConfig.error as any);
        },
    })
}