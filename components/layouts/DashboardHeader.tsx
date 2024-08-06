import { ChevronDown } from 'lucide-react';
import { useMediaQuery } from 'usehooks-ts';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User } from '@/types/User';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { useLogout } from '@/hooks/mutations/auth/use-logout';
import { BackButton } from './Navigation/back-button';

type DashboardHeaderProps = {
    header?: string;
    user: User;
};

function DashboardHeader({ header, user }: DashboardHeaderProps) {
    const { mutate: logout } = useLogout();
    const isDesktop = useMediaQuery('(min-width: 768px)');

    return (
        <div className="flex justify-between items-center w-full px-4 py-6 sm:px-4 md:px-6 lg:px-12 xl:px-20">

            {
                !isDesktop && <BackButton />
            }

            <div className="text-lg font-medium tracking-widest uppercase">
                {header && (
                    <header className="">
                        <h2 className="text-xl font-semibold leading-tight">
                            {header}
                        </h2>
                    </header>
                )}
            </div>

            <div className="flex items-center space-x-4">
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <span className="flex items-center space-x-2 cursor-pointer">
                            <Avatar className="h-9 w-9">
                                <AvatarFallback>
                                    {
                                        user.name
                                            .split(' ')
                                            .slice(0, 2)
                                            .map((word) => word.charAt(0))
                                            .join('')
.toUpperCase()
                                    }
                                </AvatarFallback>
                            </Avatar>
                            <span>
                                <ChevronDown size={14} className="text-gray-800" />
                            </span>
                        </span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="cursor-pointer"
                          onClick={() => logout()}
                        >
                            Log Out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}

export default DashboardHeader;
