import axios from "@/lib/axios";
import useAppStore from "@/store/store";
import { IErrorResponse } from "@/types/Error";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from "axios";
import { useRouter } from "next/router";

const logout = async () => {
    await axios.get('/sanctum/csrf-cookie');
    const response = await axios.post('/logout');
    return response;
}

export const useLogout = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const clearStore = useAppStore(state => state.clearStore);

    return useMutation<any, AxiosError<IErrorResponse>>({
        mutationFn: logout,
        onSuccess: (res) => {
            queryClient.clear();
            clearStore();
            router.push('/');
        },
        onError: (err) => {
            if (err.response?.status === 401) {
                router.push('/');
            }
            console.log(err.response?.status)
            console.log(err.response);
        }
    });
}