import axios from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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

    return useMutation({
        mutationFn: createCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] })
            onSuccess();
        },
    });
}