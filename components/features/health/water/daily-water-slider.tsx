import { Slider } from '@/components/ui/slider';
import { useToast } from '@/components/ui/use-toast';
import { colors } from '@/config/colors';
import { useSaveWaterEntry } from '@/hooks/mutations/use-save-water-entry';
import { useGetWaterEntry } from '@/hooks/queries/use-get-water-entry';
import { DropletIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

export const DailyWaterSlider = ({
    date
}: {
    date: string;
}) => {
    const { toast } = useToast();

    const { data, isLoading } = useGetWaterEntry(date);
    const [value, setValue] = useState<Array<number>>([data?.data.entry || 0]);

    const {
        mutate,
        isPending: isSaving
    } = useSaveWaterEntry(() => toast({ title: 'Saved water entry.' }));

    const onSave = (val: Array<number>) => mutate({
        date,
        entry: val[0],
    });

    useEffect(() => {
        setValue([data?.data.entry || 0]);
    }, [data]);

    return (
        <div className="flex space-x-3">
            <div className="p-2.5 flex flex-col justify-center items-center bg-zinc-900 bg-opacity-50 rounded-md">
                <DropletIcon
                    className='w-12 h-12'
                    fill={colors.blue['500']}
                    stroke={colors.blue['500']}
                />
            </div>
            <div className="flex flex-col justify-between w-full">
                <span className="text-base text-zinc-300">
                    Water {(value[0] / 1000).toFixed(1)}l
                </span>
                <Slider
                    value={value}
                    max={4000}
                    step={100}
                    onValueChange={(value) => setValue(value)}
                    onValueCommit={(val) => onSave(val)}
                    disabled={isLoading || isSaving}
                />
                <div className="flex justify-end">
                    <span className="text-sm text-zinc-600">4.0l</span>
                </div>
            </div>
        </div>
    )
}
