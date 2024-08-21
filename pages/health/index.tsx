import React from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { DailyWaterSlider } from '@/components/features/health/water/daily-water-slider';
import { format } from 'date-fns';

const HealthPage = () => {
    return (
        <DashboardLayout
            header="Weight Tracker"
        >
            {/* <div className="flex justify-end">
                <Button variant="ghost">
                    <span className='w-7 h-7 mr-2 rounded-full bg-zinc-50 flex justify-center items-center'>
                        <PlusIcon className='w-5 h-5 text-zinc-950' />
                    </span>
                    <span>Log entry</span>
                </Button>
            </div> */}

            <DailyWaterSlider date={format(Date.now(), 'y-MM-dd')} />
        </DashboardLayout>
    );
}

export default HealthPage;