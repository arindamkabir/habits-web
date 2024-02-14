import axios from "@/lib/axios";
import { IErrorResponse } from "@/types/Error";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { UseFormSetError } from "react-hook-form";

export type IStoreCategoryRequest = {
    name: string,
    color: string
}

const createCategory = async (data: IStoreCategoryRequest) => {
    const response = await axios.post('/api/categories', data);
    console.log(response);
    return response;
}

export const useCreateHabitCategory = (setError: UseFormSetError<IStoreCategoryRequest>, onSuccess: () => void) => {
    const router = useRouter();
    const queryClient = useQueryClient();

    return useMutation<any, AxiosError<IErrorResponse>, IStoreCategoryRequest>({
        mutationFn: createCategory,
        onSuccess: (res) => {
            // router.push('dashboard');
            queryClient.invalidateQueries({ queryKey: ['categories'] })
            onSuccess();
        },
        onError: (err) => {
            if (err.response?.status === 422 && err.response.data?.errors) {
                for (const [key, value] of Object.entries(err.response.data?.errors)) {
                    setError(key as keyof IStoreCategoryRequest, { type: "custom", message: value[0] });
                }
            }
        }
    });
}