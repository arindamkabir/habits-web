import DashboardLayout from '@/components/layouts/DashboardLayout';
import { habitDetailsPrefetchQuery } from '@/hooks/queries/use-get-habit-details'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router'
import { getCookie, setCookie } from 'cookies-next';
import { DehydratedState, HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { HabitCalendar } from '@/components/features/habits/calendar/habit-calendar';
import SaveEntryModal from '@/components/features/habits/modals/save-entry-modal';
import { HabitMonthlyChart } from '@/components/features/habits/chart/habit-monthly-chart';

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

    return (
        <DashboardLayout>
            <HydrationBoundary state={dehydratedState}>
                <div className="space-y-2">
                    <HabitCalendar
                        slug={router.query.slug as string}
                    />
                    <HabitMonthlyChart />
                </div>
                <SaveEntryModal />
            </HydrationBoundary>
        </DashboardLayout>
    )
}

export default HabitDetailsPage;
