import axios from "@/lib/axios";
import { useQuery } from '@tanstack/react-query';
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useLogout } from "./mutations/auth/use-logout";
import { User } from "@/types/User";
import useAppStore from "@/store/store";

export type UserShowResponse = User;

const fetchUser = async (): Promise<UserShowResponse> => {
    const response = await axios.get('/api/user');
    return response.data;
};

export const useAuth = (middleware: "guest" | "auth") => {
    const router = useRouter();
    const setLoading = useAppStore(state => state.setLoading);

    const { data: user, isPending, isError } = useQuery({
        queryKey: ['user'],
        queryFn: fetchUser,
    });

    const { mutate: logout, isPending: isLogoutPending } = useLogout();

    useEffect(() => {
        if (setLoading)
            setLoading(isLogoutPending);
    }, [setLoading, isLogoutPending]);

    useEffect(() => {
        if (middleware === "guest" && user) {
            router.push('/dashboard');
        }

        if (middleware === "auth" && isError) logout();

    }, [user, isError]);

    return { user, isPending: isPending && isLogoutPending, logout };
}