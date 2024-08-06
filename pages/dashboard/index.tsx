import DashboardLayout from '@/components/layouts/DashboardLayout';

function DashboardPage() {
    return (
        <DashboardLayout>
            <div className="flex justify-end w-full">
                <div className="text-lg font-bold text-gray-800 dark:text-gray-200">
                    Dashboard Page
                </div>
            </div>
        </DashboardLayout>
    );
}

export default DashboardPage;
