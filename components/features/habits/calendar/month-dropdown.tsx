import { capitalize } from '@/utils/string';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { MonthType, monthOptions } from '@/config/app';
import { cn } from '@/utils/classNames';

type MonthDropdownProps = {
    selectedMonth: MonthType;
    setSelectedMonth: (value: MonthType) => void;
}

export const MonthDropdown = ({
    selectedMonth,
    setSelectedMonth
}: MonthDropdownProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Button
                    size="default"
                    variant="ghost"
                    className='!p-0 justify-center'
                >
                    <span>{capitalize(selectedMonth)}</span>
                    <ChevronDown className='w-3 h-3 ml-1' />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className='!min-w-20'
                align='end'
            >
                {
                    monthOptions.map((value) => (
                        <DropdownMenuItem
                            key={`calender-month-${value}`}
                            className={cn(
                                'text-xs py-2 justify-center',
                                selectedMonth === value ? 'bg-zinc-300 text-zinc-950' : ''
                            )}
                            onClick={() => setSelectedMonth(value)}
                        >
                            {capitalize(value)}
                        </DropdownMenuItem>
                    ))
                }
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
