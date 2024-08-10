import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { Pie, PieChart } from "recharts"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { colors } from "@/config/colors"
import { useGetHabitPieChart } from "@/hooks/queries/use-get-habit-pie-chart"
import { useMemo, useState } from "react"
import { ChartTimelineType, chartTimelineWithLabels } from "@/config/app"

const chartConfig = {
    Yes: {
        label: "Yes",
        color: colors.teal['600'],
    },
    No: {
        label: "No",
        color: colors.teal['400'],
    },
} satisfies ChartConfig;

type Props = {
    slug: string;
};

export const HabitPieChart = ({
    slug,
}: Props) => {
    const [period, setPeriod] = useState<ChartTimelineType>('month');

    const { data: chartData } = useGetHabitPieChart({ slug, time_period: period });

    const formattedData = useMemo(() => {
        if (!chartData?.data) return [];
        return chartData?.data.map((data) => ({
            ...data,
            fill: data.label === "Yes" ? colors.teal['600'] : colors.teal['400'],
        }));
    }, [chartData?.data]);

    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Statistics - Yes / No</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
                >
                    <PieChart>
                        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                        <Pie
                            data={formattedData}
                            dataKey="value"
                            label
                            nameKey="label"
                        />
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <ToggleGroup
                    type="single"
                    variant="outline"
                    value={period}
                    onValueChange={(val: ChartTimelineType) => {
                        if (val) setPeriod(val);
                    }}
                >
                    {
                        chartTimelineWithLabels.map((item) => (
                            <ToggleGroupItem
                                key={`pie-chart-timeline-${item.value}`}
                                value={item.value}
                                className="text-xs"
                            >
                                {item.label}
                            </ToggleGroupItem>
                        ))
                    }
                </ToggleGroup>
            </CardFooter>
        </Card>
    )
}
