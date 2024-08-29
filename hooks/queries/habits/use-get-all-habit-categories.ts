import axios from "@/lib/axios";
import { HabitCategory } from "@/types/HabitCategory";
import { useQuery } from "@tanstack/react-query";

type HabitCategoriesResponse = {
    data: HabitCategory[]
}

const QUERY_KEY = ['categories'];

const fetchCategories = async (): Promise<HabitCategoriesResponse> => {
    const response = await axios.get(`/api/habits/categories`);
    return response.data;
};

export const useGetAllHabitCategories = () => {
    return useQuery<HabitCategoriesResponse, Error>({
        queryKey: QUERY_KEY,
        queryFn: () => fetchCategories()
    });
};