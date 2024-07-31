import useAppStore from "@/store/store";
import { useEffect } from "react";

export const usePageLoader = (isLoading: boolean) => {
    const setLoading = useAppStore(state => state.setLoading);

    useEffect(() => {
        setLoading(isLoading);
    }, [isLoading, setLoading]);

    return null;
}
