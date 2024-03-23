import { HABIT_QUERY_KEYS } from "@/config/query-keys";
import axios from "@/lib/axios";
import { Habit, HabitWithEntries } from "@/types/Habit";
import { PaginatedResponse } from "@/types/Pagination";
import { useQuery } from "@tanstack/react-query";

export type HabitListRequest = {
    search: string,
    start_date: string,
    end_date: string,
}

export type HabitListResponse = HabitWithEntries[];

const fetchHabitList = async (params: HabitListRequest): Promise<HabitListResponse> => {
    const response = await axios.get<HabitListResponse>(`/api/habits/all`, { params: params });
    return response.data;
};

export const useGetAllHabits = (params: HabitListRequest) => {
    return useQuery<HabitListResponse, Error>({
        queryKey: HABIT_QUERY_KEYS.list(params),
        queryFn: () => {
            return fetchHabitList(params);
        }
    });
};