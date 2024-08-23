import React, { useMemo, useState } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { DailyWaterSlider } from '@/components/features/health/water/daily-water-slider';
import { format, isToday } from 'date-fns';
import { DailyWeightEntry } from '@/components/features/health/weight/daily-weight-entry';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/utils/classNames';
import { WeightLineChart } from '@/components/features/health/weight/weight-line-chart';

const HealthPage = () => {
    const [popoverOpen, setPopoverOpen] = useState<boolean>(false);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    const isTodaySelected = useMemo(() => isToday(selectedDate), [selectedDate]);

    return (
        <DashboardLayout
            header="Health"
        >
            <div className="space-y-10">
                <div className='flex justify-center'>
                    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="default"
                                className={cn(
                                    "w-[240px] pl-3 text-left font-semibold uppercase"
                                )}
                            >
                                <span>{`${isTodaySelected ? "Today" : format(selectedDate, "do LLLL")} : ${format(selectedDate, 'EEEE')}`}</span>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={selectedDate}
                                onSelect={(date) => {
                                    setSelectedDate(date || new Date());
                                    setPopoverOpen(false);
                                }}
                                disabled={(date) =>
                                    date > new Date() || date < new Date("2024-01-01")
                                }
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>

                </div>
                <DailyWaterSlider date={format(selectedDate, 'y-MM-dd')} />
                <DailyWeightEntry date={format(selectedDate, 'y-MM-dd')} />

                <WeightLineChart />
            </div>
        </DashboardLayout>
    );
}

export default HealthPage;