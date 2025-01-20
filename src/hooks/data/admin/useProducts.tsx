import {useContext} from "react";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {toast} from 'react-toastify';
import {toastConfig} from "@/libs/constant";
import {AppContext} from "@/providers/app.provider";
import {formatProducts} from "@/utils/formatData";
import productAPI from "@/libs/api-client/restful/product.api";

export function useGetProducts(initialData = []) {
    const {language} = useContext(AppContext);
    const queryInfo = useQuery({
        queryKey: ['products'],
        queryFn: productAPI.getProducts,
        placeholderData: {data: initialData}
    })
    return {
        ...queryInfo,
        products: formatProducts(queryInfo.data.data, language),
    }
}

export const useAddProduct = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ['addProduct'],
        mutationFn: (newProduct) => {
            return productAPI.createProduct(newProduct)
        },
        onSuccess: (result: any) => {
            if (!result.success) {
                return toast.error(result.message, toastConfig.error as any);
            }
            return queryClient.invalidateQueries({queryKey: ['products']})
        },
        onError: (error: any) => {
            return toast.error(error, toastConfig.error as any);
        },
    })
}

export const useUpdateProduct = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ['updateProduct'],
        mutationFn: (data) => {
            return productAPI.updateProduct(data)
        },
        onSuccess: (result: any) => {
            if (!result.success) {
                return toast.error(result.message, toastConfig.error as any);
            }
            return queryClient.invalidateQueries({queryKey: ['products']})
        },
        onError: (error: any) => {
            return toast.error(error.message, toastConfig.error as any);
        },
    })
}

export const useDeleteProduct = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ['deleteProduct'],
        mutationFn: (data) => {
            return productAPI.deleteProduct(data)
        },
        onSuccess: (result: any) => {
            if (!result.success) {
                return toast.error(result.message, toastConfig.error as any);
            }
            return queryClient.invalidateQueries({queryKey: ['products']})
        },
        onError: (error: any) => {
            return toast.error(error.message, toastConfig.error as any);
        },
    })
}