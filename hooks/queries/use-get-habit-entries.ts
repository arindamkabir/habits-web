import { HABIT_ENTRY_QUERY_KEYS } from "@/config/query-keys";
import axios from "@/lib/axios";
import { Entry } from "@/types/Entry";
import { useQuery } from "@tanstack/react-query";

export type HabitEntryListRequest = {
    slug: string;
    start_date: string;
    end_date: string;
}

export type HabitEntryListResponse = {
    data: Entry[];
};

const fetchHabitEntryList = async (params: HabitEntryListRequest): Promise<HabitEntryListResponse> => {
    const response = await axios.get<HabitEntryListResponse>(`/api/habits/${params.slug}/entries`, {
        params: {
            start_date: params.start_date,
            end_date: params.end_date,
        },
    });
    return response.data;
};

export const useGetHabitEntryList = (params: HabitEntryListRequest) => (
    useQuery<HabitEntryListResponse, Error>({
        queryKey: HABIT_ENTRY_QUERY_KEYS.list(params),
        queryFn: () => fetchHabitEntryList(params),
        enabled: !!params,
    })
);

export const habitEntryListPrefetchQuery = (params: HabitEntryListRequest) => ({
    queryFn: () => fetchHabitEntryList(params),
    queryKey: HABIT_ENTRY_QUERY_KEYS.list(params)
})