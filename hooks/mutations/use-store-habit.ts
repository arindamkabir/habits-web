import axios from "@/lib/axios";
import { IErrorResponse } from "@/types/Error";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { UseFormSetError } from "react-hook-form";

export type IHabitRequest = {
    name: string,
    category_id: string,
    description: string,
    entry_type: 'number' | 'boolean',
}

const createHabit = async (data: IHabitRequest) => {
    const response = await axios.post('/api/habits/', data);
    console.log(response);
    return response;
}

export const useCreateHabit = (setError: UseFormSetError<IHabitRequest>, onSuccess: () => void) => {
    const router = useRouter();
    const queryClient = useQueryClient();

    return useMutation<any, AxiosError<IErrorResponse>, IHabitRequest>({
        mutationFn: createHabit,
        onSuccess: (res) => {
            // router.push('dashboard');
            queryClient.invalidateQueries({ queryKey: ['habits'] })
            onSuccess();
        },
        onError: (err) => {
            if (err.response?.status === 422 && err.response.data?.errors) {
                for (const [key, value] of Object.entries(err.response.data?.errors)) {
                    setError(key as keyof IHabitRequest, { type: "custom", message: value[0] });
                }
            }
        }
    });
}