import {useContext} from "react";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {toast} from 'react-toastify';
import {toastConfig} from "@/libs/constant";
import {AppContext} from "@/providers/app.provider";
import {formatPackages} from "@/utils/formatData";
import packageAPI from "@/libs/api-client/restful/package.api";

export function useGetPackages(initialData = []) {
    const {language} = useContext(AppContext);
    const queryInfo = useQuery({
        queryKey: ['packages'],
        queryFn: packageAPI.getPackages,
        placeholderData: {data: initialData}
    })
    return {
        ...queryInfo,
        packages: formatPackages(queryInfo.data.data, language),
    }
}

export function useGetPublicPackages(initialData = []) {
    const {language} = useContext(AppContext);
    const queryInfo = useQuery({
        queryKey: ['packages'],
        queryFn: packageAPI.getPublicPackages,
        placeholderData: {data: initialData}
    })
    return {
        ...queryInfo,
        packages: formatPackages(queryInfo.data.data, language),
    }
}

export const useAddPackage = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ['addPackage'],
        mutationFn: (newPackage) => {
            return packageAPI.createPackage(newPackage)
        },
        onSuccess: (result: any) => {
            if (!result.success) {
                return toast.error(result.message, toastConfig.error as any);
            }
            return queryClient.invalidateQueries({queryKey: ['packages']})
        },
        onError: (error: any) => {
            return toast.error(error, toastConfig.error as any);
        },
    })
}

export const useUpdatePackage = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ['updatePackage'],
        mutationFn: (data) => {
            return packageAPI.updatePackage(data)
        },
        onSuccess: (result: any) => {
            if (!result.success) {
                return toast.error(result.message, toastConfig.error as any);
            }
            return queryClient.invalidateQueries({queryKey: ['packages']})
        },
        onError: (error: any) => {
            return toast.error(error.message, toastConfig.error as any);
        },
    })
}

export const useDeletePackage = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ['deletePackage'],
        mutationFn: (data) => {
            return packageAPI.deletePackage(data)
        },
        onSuccess: (result: any) => {
            if (!result.success) {
                return toast.error(result.message, toastConfig.error as any);
            }
            return queryClient.invalidateQueries({queryKey: ['packages']})
        },
        onError: (error: any) => {
            return toast.error(error.message, toastConfig.error as any);
        },
    })
}