import axios from "@/lib/axios";
import { IErrorResponse } from "@/types/Error";
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { UseFormSetError } from "react-hook-form";

const logout = async () => {
    const response = await axios.post('/logout');
    return response;
}

export const useLogout = () => {
    const router = useRouter();

    return useMutation<any, AxiosError<IErrorResponse>>({
        mutationFn: logout,
        onSuccess: (res) => {
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