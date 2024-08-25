import { Bar, BarChart, ReferenceLine, XAxis, YAxis } from "recharts";
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
import { DEFAULT_WATER_BAR_CHART_TIMELINE } from "@/config/health";
import { Loader } from "@/components/ui/loader";
import { useGetWaterBarChart } from "@/hooks/queries/health/water/use-get-water-bar-chart";

const chartConfig = {
    value: {
        label: 'Entry',
        color: colors.emerald['500'],
    }
} satisfies ChartConfig;

export function WaterBarChart() {
    const [chartTimeline, setChartTimeline] = useState<ChartTimelineWithLabelsType>(DEFAULT_WATER_BAR_CHART_TIMELINE);

    const { data: chartData, isFetching } = useGetWaterBarChart({
        time_period: chartTimeline.value,
    });

    return (
        <Card>
            <CardHeader className="flex flex-row justify-between items-center space-y-0">
                <div className="space-y-1.5">
                    <CardTitle>Your Drinking Habits</CardTitle>
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
                                        domain={[0, 4]}
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
                                            formatter={(value) => `${value} litres`}
                                        />
                                    } />
                                    <Bar dataKey="value" fill={colors.emerald['400']} radius={4} />
                                    <ReferenceLine y={2.5} stroke={colors.rose['500']} />
                                </BarChart>
                            )
                    }
                </ChartContainer>
            </CardContent>
        </Card>
    );
}