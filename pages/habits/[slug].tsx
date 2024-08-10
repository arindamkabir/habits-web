import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { getCookie, setCookie } from 'cookies-next';
import {
    DehydratedState, HydrationBoundary, QueryClient, dehydrate,
} from '@tanstack/react-query';
import { habitDetailsPrefetchQuery, useGetHabitDetails } from '@/hooks/queries/use-get-habit-details';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { HabitCalendar } from '@/components/features/habits/calendar/habit-calendar';
import SaveEntryModal from '@/components/features/habits/modals/save-entry-modal';
import { HabitMonthlyChart } from '@/components/features/habits/charts/habit-monthly-chart';
import { habitChartPrefetchQuery } from '@/hooks/queries/use-get-habit-chart';
import Head from 'next/head';
import { HabitPieChart } from '@/components/features/habits/charts/habit-pie-chart';

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
        slug: context.params.slug,
    }));

    await queryClient.prefetchQuery(habitChartPrefetchQuery({
        slug: context.params.slug,
    }));

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
                    <HabitMonthlyChart
                        slug={router.query.slug as string}
                    />
                    <HabitPieChart
                        slug={router.query.slug as string}
                    />
                </div>
                <SaveEntryModal />
            </HydrationBoundary>
        </DashboardLayout>
    );
}

export default HabitDetailsPage;
