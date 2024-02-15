import axios from "@/lib/axios";
import { useMutation } from '@tanstack/react-query';
import { useRouter } from "next/router";

export type LoginRequest = {
    email: string,
    password: string,
    shouldRemember: boolean
}

const login = async (data: LoginRequest) => {
    await axios.get('/sanctum/csrf-cookie');
    const response = await axios.post('/login', { email: data.email, password: data.password, remember: data.shouldRemember });
    return response;
}

export const useLogin = () => {
    const router = useRouter();

    return useMutation({
        mutationFn: login,
        onSuccess: (res) => {
            router.push('dashboard');
        },
        onError: (err) => {
            // router.push('/')
            console.log(err)
        }
    });
}