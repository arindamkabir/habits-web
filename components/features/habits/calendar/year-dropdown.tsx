import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/utils/classNames';

type YearDropdownProps = {
    selectedYear: number;
    setSelectedYear: (value: number) => void;
}

const yearOptions = Array.from({ length: 4 }, (_, i) => new Date().getFullYear() - i);

export const YearDropdown = ({
    selectedYear,
    setSelectedYear
}: YearDropdownProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Button
                    size="default"
                    variant="ghost"
                    className='!p-0 justify-center'
                >
                    <span>{selectedYear}</span>
                    <ChevronDown className='w-3 h-3 ml-1' />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className='!min-w-20'
                align='end'
            >
                {
                    yearOptions.map((value) => (
                        <DropdownMenuItem
                            key={`calender-month-${value}`}
                            className={cn(
                                'text-xs py-2 justify-center',
                                selectedYear === value ? 'bg-zinc-300 text-zinc-950' : ''
                            )}
                            onClick={() => setSelectedYear(value)}
                        >
                            {value}
                        </DropdownMenuItem>
                    ))
                }
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
