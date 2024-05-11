import { HABIT_QUERY_KEYS } from "@/config/query-keys";
import axios from "@/lib/axios";
import { Habit } from "@/types/Habit";
import { useQuery } from "@tanstack/react-query";

export type HabitListRequest = {
    slug: string;
}

export type HabitDetailsResponse = Habit;

const fetchHabitDetails = async (slug: string): Promise<HabitDetailsResponse> => {
    const response = await axios.get<HabitDetailsResponse>(`/api/habits/${slug}`);
    return response.data;
};

export const useGetHabitDetails = ({ slug }: HabitListRequest) => {
    return useQuery<HabitDetailsResponse, Error>({
        queryKey: HABIT_QUERY_KEYS.detail(slug),
        queryFn: () => {
            return fetchHabitDetails(slug);
        }
    });
};