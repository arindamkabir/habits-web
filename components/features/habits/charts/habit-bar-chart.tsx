import { Bar, BarChart, XAxis, YAxis } from "recharts";
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
import { ChartTimelineWithLabelsType } from '@/config/app';
import { TimelineDropdown } from '../../chart/timeline-dropdown';
import { Loader } from "@/components/ui/loader";
import { useGetHabitChart } from "@/hooks/queries/habits/use-get-habit-chart";
import { DEFAULT_HABIT_BAR_CHART_TIMELINE } from "@/config/habits";

const chartConfig = {
    value: {
        label: 'Entry',
        color: colors.emerald['500'],
    }
} satisfies ChartConfig;

type Props = {
    slug: string;
};

export function HabitBarChart({ slug }: Props) {
    const [chartTimeline, setChartTimeline] = useState<ChartTimelineWithLabelsType>(DEFAULT_HABIT_BAR_CHART_TIMELINE);

    const { data: chartData, isFetching } = useGetHabitChart({
        time_period: chartTimeline.value,
        slug
    });

    return (
        <Card>
            <CardHeader className="flex flex-row justify-between items-center space-y-0">
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
                    {
                        isFetching
                            ?
                            <Loader text="Loading Chart..." />
                            :
                            (
                                <BarChart
                                    accessibilityLayer
                                    data={chartData?.data ?? []}
                                    margin={{
                                        left: 6,
                                        right: 6,
                                    }}
                                >
                                    <YAxis
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={0}
                                        tickFormatter={(value) => `${value}`}
                                        tickSize={8}
                                        width={24}
                                        tickCount={5}
                                        type="number"
                                        domain={["dataMin", "dataMax"]}
                                        allowDataOverflow
                                    />
                                    <XAxis
                                        dataKey="label"
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={8}
                                        tickFormatter={(value) => value.replace('-', '/')}
                                    />
                                    <ChartTooltip cursor={true} content={
                                        <ChartTooltipContent
                                            nameKey="label"
                                            cursor={false}
                                            indicator="line"
                                            labelFormatter={(value) => value.replace('-', '/')}
                                            formatter={(value) => `${value}`}
                                        />
                                    } />
                                    <Bar dataKey="value" fill={colors.emerald['400']} radius={4} />
                                </BarChart>
                            )
                    }
                </ChartContainer>
            </CardContent>
        </Card>
    );
}