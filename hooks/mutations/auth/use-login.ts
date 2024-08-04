import axios from "@/lib/axios";
import { LoginRequest, LoginResponse } from "@/types/Auth";
import { useMutation } from '@tanstack/react-query';
import { useRouter } from "next/router";

const login = async (data: LoginRequest) => {
    const payload = {
        email: data.email,
        password: data.password,
        remember: data.shouldRemember,
    };
    await axios.get('/sanctum/csrf-cookie');
    const response = await axios.post<LoginResponse>('/api/login', payload);
    return response;
}

export const useLogin = () => {
    const router = useRouter();

    return useMutation({
        mutationFn: login,
        onSuccess: (res) => {
            router.push('habits');
        },
        onError: (err) => {
            console.log(err)
        }
    });
}