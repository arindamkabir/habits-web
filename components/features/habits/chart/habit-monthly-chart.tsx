import { TrendingUp } from 'lucide-react';
import {
    CartesianGrid, Line, LineChart, XAxis,
} from 'recharts';
import { useState } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
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
        color: colors.rose['500'],
    },
} satisfies ChartConfig;

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
                    <CardTitle>Line Chart</CardTitle>
                    <CardDescription>January - June 2024</CardDescription>
                </div>
                <TimelineDropdown
                    timeline={chartTimeline}
                    setTimeline={setChartTimeline}
                />
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <LineChart
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
                            tickFormatter={(value) => value}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent label="Value" />}
                        />
                        <Line
                            dataKey="value"
                            type="natural"
                            stroke={colors.rose['500']}
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    Trending up by 5.2% this month
                    {' '}
                    <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing total visitors for the last 6 months
                </div>
            </CardFooter>
        </Card>
    );
}
