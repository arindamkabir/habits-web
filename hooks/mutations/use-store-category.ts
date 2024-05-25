import axios from "@/lib/axios";
import { IErrorResponse } from "@/types/Error";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export type StoreCategoryRequest = {
    name: string,
    color: string
}

const createCategory = async (data: StoreCategoryRequest) => {
    const response = await axios.post('/api/categories', data);
    return response;
}

export const useCreateCategory = (onSuccess: () => void) => {
    const queryClient = useQueryClient();

    return useMutation<any, AxiosError<IErrorResponse>, StoreCategoryRequest>({
        mutationFn: createCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] })
            onSuccess();
        },
    });
}