import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
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
import { useGetWeightChart } from "@/hooks/queries/use-get-weight-chart";
import { DEFAULT_WEIGHT_CHART_TIMELINE } from "@/config/health";
import { Loader } from "@/components/ui/loader";

const chartConfig = {
    value: {
        label: 'Entry',
        color: colors.teal['500'],
    }
} satisfies ChartConfig;

export function WeightLineChart() {
    const [chartTimeline, setChartTimeline] = useState<ChartTimelineWithLabelsType>(DEFAULT_WEIGHT_CHART_TIMELINE);

    const { data: chartData, isFetching } = useGetWeightChart({
        time_period: chartTimeline.value,
    });

    return (
        <Card>
            <CardHeader className="flex flex-row justify-between items-center space-y-0">
                <div className="space-y-1.5">
                    <CardTitle>Your Weight Trends</CardTitle>
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
                                <AreaChart
                                    accessibilityLayer
                                    data={chartData?.data ?? []}
                                    margin={{
                                        left: 12,
                                        right: 12,
                                    }}
                                >
                                    <CartesianGrid
                                        vertical={false}
                                        color={colors.teal['900']}
                                        strokeDasharray="3 3"
                                    />
                                    <YAxis
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={0}
                                        tickFormatter={(value) => `${value}`}
                                        tickSize={8}
                                        width={24}
                                        tickCount={5}
                                        type="number"
                                        domain={[70, 'dataMax + 1']}
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
                                            indicator="dot"
                                            labelFormatter={(value) => value.replace('-', '/')}
                                            formatter={(value) => `${value} kg`}
                                        />
                                    } />
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
                                        stroke={colors.teal['400']}
                                        stackId="a"
                                        connectNulls
                                    />
                                </AreaChart>
                            )
                    }
                </ChartContainer>
            </CardContent>
        </Card>
    );
}