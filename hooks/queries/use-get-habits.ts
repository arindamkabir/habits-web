import { HABIT_QUERY_KEYS } from "@/config/query-keys";
import axios from "@/lib/axios";
import { Habit } from "@/types/Habit";
import { PaginatedResponse } from "@/types/Pagination";
import { useQuery } from "@tanstack/react-query";

export type HabitListRequest = {
    search: string
}

export type HabitListResponse = PaginatedResponse<Habit>;

const fetchHabitList = async (params: HabitListRequest): Promise<HabitListResponse> => {
    const response = await axios.get<HabitListResponse>(`/api/habits`, { params: params });
    return response.data;
};

export const useGetHabitList = (params: HabitListRequest) => {
    return useQuery<HabitListResponse, Error>({
        queryKey: HABIT_QUERY_KEYS.list(params),
        queryFn: () => {
            return fetchHabitList(params);
        }
    });
};