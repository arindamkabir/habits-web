import axios from "@/lib/axios";
import { ICategory } from "@/types/Category";
import { useQuery } from "@tanstack/react-query";

type IGetHabitCategoriesResponse = {
    data: ICategory[]
}

const QUERY_KEY = ['categories'];

const fetchCategories = async (): Promise<ICategory[]> => {
    const response = await axios.get(`/api/categories`);
    return response.data;
};

export const useGetCategories = () => {
    return useQuery<ICategory[], Error>({ queryKey: QUERY_KEY, queryFn: () => fetchCategories() });
};