import axios from "@/lib/axios";
import { Category } from "@/types/Category";
import { useQuery } from "@tanstack/react-query";

type IGetHabitCategoriesResponse = {
    data: Category[]
}

const QUERY_KEY = ['categories'];

const fetchCategories = async (): Promise<Category[]> => {
    const response = await axios.get(`/api/categories`);
    return response.data;
};

export const useGetAllCategories = () => {
    return useQuery<Category[], Error>({ queryKey: QUERY_KEY, queryFn: () => fetchCategories() });
};