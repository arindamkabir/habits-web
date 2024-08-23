import { Slider } from "@/components/ui/slider";
import { useToast } from "@/components/ui/use-toast";
import { useSaveWeightEntry } from "@/hooks/mutations/use-save-weight-entry";
import { useGetWeightEntry } from "@/hooks/queries/use-get-weight-entry";
import { useEffect, useState } from "react";

type Props = {
    date: string;
};

export const DailyWeightEntry = ({ date }: Props) => {
    const { toast } = useToast();

    const { data, isLoading } = useGetWeightEntry(date);

    const [value, setValue] = useState<Array<number>>([data?.data.entry || 75.0]);

    const { mutate, isPending: isSaving } = useSaveWeightEntry(() => {
        toast({ title: 'Saved weight entry.' });
    });

    const onSave = (val: Array<number>) => mutate({
        date,
        entry: val[0],
    });

    useEffect(() => {
        const val = data?.data.entry ? Number(Number(data.data.entry).toFixed(2)) : 75.0;
        setValue([val]);
    }, [data]);

    return (
        <div className="flex flex-col w-full items-center">
            <div className="flex flex-col items-center w-full space-y-3">
                <span className="text-base text-zinc-300">Weight</span>
                <div className="flex space-x-2.5 w-full items-center">
                    <span className="text-xs text-zinc-300 whitespace-nowrap">65.0 kg</span>
                    <Slider
                        value={value}
                        max={90}
                        min={65}
                        step={0.1}
                        onValueChange={(val) => setValue(val)}
                        onValueCommit={(val) => onSave(val)}
                        disabled={isSaving || isLoading}
                    />
                    <span className="text-xs text-zinc-600 whitespace-nowrap">90.0 kg</span>
                </div>
                <div className="flex space-x-2.5 items-center">
                    <div className="text-base text-zinc-300">
                        {value} kg
                    </div>
                </div>
            </div>
        </div>
    )
};