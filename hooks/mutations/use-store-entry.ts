import axios from "@/lib/axios";
import { IErrorResponse } from "@/types/Error";
import { IHabit } from "@/types/habit/Habit";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { UseFormSetError } from "react-hook-form";

export type ICreateHabitEntryRequest = {
    habit_id: IHabit["id"],
    entry: string,
    note?: string,
    date: string
}

const createHabitEntry = async (data: ICreateHabitEntryRequest) => {
    const response = await axios.post(`/api/entries`, data);
    return response;
}

export const useCreateHabitEntry = (setError: UseFormSetError<ICreateHabitEntryRequest>, onSuccess: () => void) => {
    const queryClient = useQueryClient();

    return useMutation<any, AxiosError<IErrorResponse>, ICreateHabitEntryRequest>({
        mutationFn: createHabitEntry,
        onSuccess: (res) => {
            queryClient.invalidateQueries({ queryKey: ['entries'] });
            onSuccess();
        },
        onError: (err) => {
            if (err.response?.status === 422 && err.response.data?.errors) {
                for (const [key, value] of Object.entries(err.response.data?.errors)) {
                    setError(key as keyof ICreateHabitEntryRequest, { type: "custom", message: value[0] });
                }
            }
        }
    });
}