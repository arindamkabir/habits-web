import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { useState } from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import { colors } from '@/config/colors';
import { useGetHabitChart } from '@/hooks/queries/use-get-habit-chart';
import { type TimelineType } from '@/config/app';
import { TimelineDropdown } from '../../chart/timeline-dropdown';

const chartConfig = {
    entry: {
        label: 'Entry',
        color: colors.teal['500'],
    }
} satisfies ChartConfig

type Props = {
    slug: string;
};

export function HabitMonthlyChart({ slug }: Props) {
    const [chartTimeline, setChartTimeline] = useState<TimelineType>('monthly');
    const { data: chartData } = useGetHabitChart({ slug });

    return (
        <Card>
            <CardHeader className="flex-row justify-between items-start space-y-0">
                <div className="space-y-1.5">
                    <CardTitle>Trends</CardTitle>
                </div>
                <TimelineDropdown
                    timeline={chartTimeline}
                    setTimeline={setChartTimeline}
                />
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <AreaChart
                        accessibilityLayer
                        data={chartData?.data ?? []}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="label"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                        <defs>
                            <linearGradient id="fillEntry" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor={colors.teal['400']}
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor={colors.teal['400']}
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                        </defs>
                        <Area
                            dataKey="value"
                            type="natural"
                            fill="url(#fillEntry)"
                            fillOpacity={0.4}
                            stroke={colors.teal['500']}
                            stackId="a"
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}