import {
    CalendarCheck2Icon, CogIcon, HeartPulseIcon, HomeIcon,
} from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { routes } from '@/config/routes';
import { cn } from '@/utils/classNames';
import { useRouter } from 'next/router';

const NavLink = ({
    href,
    icon,
    text,
    active
}: {
    href: string;
    icon: React.ReactNode;
    text: string;
    active: boolean;
}) => (
    <div className="flex-1 group">
        <Link
            href={href}
            className=""
        >
            <div className={cn("flex flex-col items-center justify-center space-y-2 px-2 py-2 rounded-lg mx-3 transition-all duration-300",
                active ? "bg-white text-zinc-950" : ""
            )}>
                {icon}
                <span className="block text-[11px]">
                    {text}
                </span>
            </div>
        </Link>
    </div>
);


export const MobileNavigation = () => {
    const { pathname } = useRouter();

    return (
        <div className="w-full max-w-md mx-auto fixed inset-x-0 bottom-0 md:hidden ">
            <div className="pb-3 pt-2 px-3 bg-white text-zinc-950 dark:bg-zinc-950/40 backdrop-blur supports-[backdrop-filter]:bg-zinc-950/20 dark:text-zinc-50 shadow-lg">
                <div className="flex">
                    <NavLink
                        href={routes.dashboard}
                        icon={<HomeIcon className="w-4 h-4" />}
                        text="Home"
                        active={pathname === routes.dashboard}
                    />
                    <NavLink
                        href={routes.habits.index}
                        icon={<CalendarCheck2Icon className="w-4 h-4" />}
                        text="Habits"
                        active={pathname.startsWith(routes.habits.index)}
                    />
                    <NavLink
                        href={routes.health.index}
                        icon={<HeartPulseIcon className="w-4 h-4" />}
                        text="Health"
                        active={pathname.startsWith(routes.health.index)}
                    />
                    <NavLink
                        href={routes.settings}
                        icon={<CogIcon className="w-4 h-4" />}
                        text="Settings"
                        active={pathname.startsWith(routes.settings)}
                    />
                </div>
            </div>
        </div>
    );
}
