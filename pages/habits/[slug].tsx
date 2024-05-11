import DashboardLayout from '@/components/layouts/DashboardLayout';
import { useGetHabitDetails } from '@/hooks/queries/use-get-habit-details'
import { useRouter } from 'next/router'
import React from 'react'

const HabitDetailsPage = () => {
    const router = useRouter();
    const { data, isLoading } = useGetHabitDetails({ slug: router.query.slug as string });

    return (
        <DashboardLayout>
            <div>HabitDetailsPage</div>
        </DashboardLayout>
    )
}

export default HabitDetailsPage;
