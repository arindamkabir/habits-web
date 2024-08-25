import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { getCookie, setCookie } from 'cookies-next';
import {
    DehydratedState, HydrationBoundary, QueryClient, dehydrate,
} from '@tanstack/react-query';
import { habitDetailsPrefetchQuery, useGetHabitDetails } from '@/hooks/queries/habits/use-get-habit-details';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { HabitCalendar } from '@/components/features/habits/calendar/habit-calendar';
import SaveEntryModal from '@/components/features/habits/modals/save-entry-modal';
import { habitChartPrefetchQuery } from '@/hooks/queries/habits/use-get-habit-chart';
import Head from 'next/head';
import { HabitPieChart } from '@/components/features/habits/charts/habit-pie-chart';
import { habitEntryListPrefetchQuery } from '@/hooks/queries/habits/use-get-habit-entries';
import { DEFAULT_HABIT_BAR_CHART_TIMELINE, DEFAULT_HABIT_CALENDAR_MONTH, DEFAULT_HABIT_CALENDAR_YEAR, DEFAULT_HABIT_PIE_CHART_PERIOD } from '@/config/habits';
import { MONTH_OPTIONS } from '@/config/app';
import { formatDate, lastDayOfMonth } from 'date-fns';
import { habitPieChartPrefetchQuery } from '@/hooks/queries/habits/use-get-habit-pie-chart';
import { HabitBarChart } from '@/components/features/habits/charts/habit-bar-chart';

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

    const firstDayOfMonth = new Date(
        DEFAULT_HABIT_CALENDAR_YEAR(),
        MONTH_OPTIONS.indexOf(DEFAULT_HABIT_CALENDAR_MONTH()), 1
    );

    await Promise.all([
        queryClient.prefetchQuery(habitDetailsPrefetchQuery({
            slug: context.params.slug,
        })),
        queryClient.prefetchQuery(habitEntryListPrefetchQuery({
            slug: context.params.slug,
            start_date: formatDate(firstDayOfMonth, 'yyyy-MM-01'),
            end_date: formatDate(lastDayOfMonth(firstDayOfMonth), 'yyyy-MM-dd'),
        })),
        queryClient.prefetchQuery(habitChartPrefetchQuery({
            slug: context.params.slug,
            time_period: DEFAULT_HABIT_BAR_CHART_TIMELINE.value,
        })),
        queryClient.prefetchQuery(habitPieChartPrefetchQuery({
            slug: context.params.slug,
            time_period: DEFAULT_HABIT_PIE_CHART_PERIOD,
        })),
    ]);

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
}) satisfies GetServerSideProps<{ dehydratedState: DehydratedState }>;

function HabitDetailsPage({
    dehydratedState,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const router = useRouter();
    const { data: habitDetails } = useGetHabitDetails({ slug: router.query.slug as string });

    return (
        <DashboardLayout
            header={'Habits'}
        >
            <Head>
                <title>{habitDetails?.data.name} | Habits</title>
            </Head>
            <HydrationBoundary state={dehydratedState}>
                <div className="text-lg font-semibold mb-4">
                    {habitDetails?.data.name}
                </div>
                <div className="space-y-6">
                    <HabitCalendar
                        slug={router.query.slug as string}
                    />
                    {
                        habitDetails?.data.entry_type === "number" && (
                            <HabitBarChart
                                slug={router.query.slug as string}
                            />
                        )
                    }
                    {
                        habitDetails?.data.entry_type === "boolean" && (
                            <HabitPieChart
                                slug={router.query.slug as string}
                            />
                        )
                    }
                </div>
                <SaveEntryModal />
            </HydrationBoundary>
        </DashboardLayout>
    );
}

export default HabitDetailsPage;
