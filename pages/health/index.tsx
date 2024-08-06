import React from 'react';
import { WeightChart } from '@/components/features/weight-tracker/WeightChart';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import {
 Card, CardContent, CardHeader, CardTitle,
} from '@/components/ui/card';

function Health() {
    return (
        <DashboardLayout
          header="Weight Tracker"
        >
            <Card className="col-span-4">
                <CardHeader>
                    <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                    <WeightChart />
                </CardContent>
            </Card>
        </DashboardLayout>
    );
}

export default Health;
