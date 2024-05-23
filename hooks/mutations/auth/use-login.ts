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
    const response = await axios.post<LoginResponse>('/api/login', payload);
    return response;
}

export const useLogin = () => {
    const router = useRouter();

    return useMutation({
        mutationFn: login,
        onSuccess: (res) => {
            localStorage.removeItem('access_token');
            localStorage.setItem('access_token', res.data.data.token);
            router.push('dashboard');
        },
        onError: (err) => {
            console.log(err)
        }
    });
}