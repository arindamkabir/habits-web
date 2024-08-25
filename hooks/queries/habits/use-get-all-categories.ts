import axios from "@/lib/axios";
import { Category } from "@/types/Category";
import { useQuery } from "@tanstack/react-query";

type HabitCategoriesResponse = {
    data: Category[]
}

const QUERY_KEY = ['categories'];

const fetchCategories = async (): Promise<HabitCategoriesResponse> => {
    const response = await axios.get(`/api/habits/categories`);
    return response.data;
};

export const useGetAllCategories = () => {
    return useQuery<HabitCategoriesResponse, Error>({
        queryKey: QUERY_KEY,
        queryFn: () => fetchCategories()
    });
};