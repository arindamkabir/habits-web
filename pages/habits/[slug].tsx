import DashboardLayout from '@/components/layouts/DashboardLayout';
import { habitDetailsPrefetchQuery, useGetHabitDetails } from '@/hooks/queries/use-get-habit-details'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router'
import { getCookie, setCookie } from 'cookies-next';
import { DehydratedState, HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/utils/classNames';
import { formatDate } from 'date-fns';
import { useMemo } from 'react';
import { bgClasses, textClasses } from '@/config/colors';
import { generateDatesByMonth, weekDayNames } from '@/utils/dates';

export const getServerSideProps = (async (context) => {
    const queryClient = new QueryClient();

    const accessToken = getCookie('access_token', context);
    const habitsSession = getCookie('habits_session', context);

    setCookie('access_token', accessToken, context);
    setCookie('habits_session', habitsSession, context);

    if (
        !accessToken
        || !habitsSession
        || typeof context?.params?.slug !== 'string'
    ) return { notFound: true };

    await queryClient.prefetchQuery(habitDetailsPrefetchQuery({
        slug: context.params.slug
    }));

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        }
    }
}) satisfies GetServerSideProps<{ dehydratedState: DehydratedState }>;

const HabitDetailsPage = ({
    dehydratedState
}: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
    const router = useRouter();

    const { data: habitDetails } = useGetHabitDetails({ slug: router.query.slug as string });

    const dates = useMemo(() => {
        return generateDatesByMonth(Date.now());
    }, []);

    const entries = useMemo(() => dates.map((week) => {
        return week.map((date) => ({
            date,
            habitEntry: habitDetails?.data.entries
                .find((entry) =>
                    formatDate(new Date(entry.date), "yyyy-MM-dd") === formatDate(date, "yyyy-MM-dd")
                )
        }));
    }), [dates, habitDetails?.data.entries]);

    console.log(entries);

    const bgClass = bgClasses[habitDetails?.data.category.color as keyof typeof bgClasses];
    const textClass = textClasses[habitDetails?.data.category.color as keyof typeof textClasses];

    return (
        <DashboardLayout>
            <HydrationBoundary state={dehydratedState}>
                <Card
                    className={cn("w-full md:w-[380px]")}
                >
                    <CardHeader>
                        <CardTitle>{habitDetails?.data.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="flex justify-between pb-2 border-b border-zinc-800">
                            {
                                weekDayNames.map((day) => (
                                    <div key={day} className="text-xs w-8 text-center">
                                        {day}
                                    </div>
                                ))
                            }
                        </div>
                        <div className="space-y-2">
                            {
                                entries.map((week, index) => (
                                    <div key={index} className="flex justify-between">
                                        {
                                            week.map((entry) => {
                                                return (
                                                    <div key={entry.toString()}
                                                        className={cn(
                                                            "flex justify-center items-center rounded-lg h-8 w-8 text-[11.5px] font-semibold",
                                                            entry.habitEntry
                                                                ? (
                                                                    entry.habitEntry.entry
                                                                        ? `${bgClass} text-white`
                                                                        : `bg-zinc-900 ${textClass}`
                                                                )
                                                                : "bg-zinc-600 text-zinc-400"
                                                        )}
                                                    >
                                                        {formatDate(entry.date, "d")}
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                ))
                            }
                        </div>
                    </CardContent>
                </Card>
            </HydrationBoundary>
        </DashboardLayout>
    )
}

export default HabitDetailsPage;
