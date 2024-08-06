import {
 Line, LineChart, ResponsiveContainer, XAxis, YAxis,
} from 'recharts';
import { useGetWeightDetails } from '@/hooks/queries/use-get-weight-details';

export function WeightChart() {
    const { data: chartData, isLoading } = useGetWeightDetails({
        start_date: '2024-05-01',
        end_date: '2024-05-26',
    });

    return (
        <ResponsiveContainer width="100%" height={350}>
            {
                (isLoading || !chartData) ? <div>Loading...</div>
                    : (
<LineChart data={chartData.data}>
                        <XAxis
                          dataKey="label"
                          stroke="#888888"
                          fontSize={12}
                          tickLine={false}
                          axisLine={false}
                        />
                        <YAxis
                          stroke="#888888"
                          fontSize={12}
                          tickLine={false}
                          axisLine={false}
                          tickFormatter={(value) => `${value} kg`}
                        />
                        <Line
                          dataKey="value"
                          fill="currentColor"
                          type="monotone"
                          className="fill-primary"
                        />
</LineChart>
)
            }
        </ResponsiveContainer>
    );
}
