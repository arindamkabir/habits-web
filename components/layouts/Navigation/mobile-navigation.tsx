import {
 CalendarCheck2Icon, CogIcon, HeartPulseIcon, HomeIcon,
} from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { routes } from '@/config/routes';

export function MobileNavigation() {
    return (
        <div className="w-full max-w-md mx-auto fixed inset-x-0 bottom-0 md:hidden ">
            <div className="py-4 px-3  bg-white text-zinc-950 dark:border-zinc-800 dark:bg-zinc-950/95 dark:text-zinc-50 shadow-lg ">
                <div className="flex">
                    <div className="flex-1 group">
                        <Link
                          href={routes.dashboard}
                          className="flex flex-col items-center justify-center px-4 pt-2 space-y-1.5 border-b-2 border-transparent"
                        >
                            <HomeIcon className="w-4 h-4" />
                            <span className="block text-[11px] ">Home</span>
                        </Link>
                    </div>
                    <div className="flex-1 group">
                        <Link
                          href={routes.habits.index}
                          className="flex flex-col items-center justify-center px-4 pt-2 space-y-1.5 border-b-2 border-transparent"
                        >
                            <CalendarCheck2Icon className="w-4 h-4" />
                            <span className="block text-xs">Habits</span>
                        </Link>
                    </div>
                    <div className="flex-1 group">
                        <Link
                          href={routes.health.index}
                          className="flex flex-col items-center justify-center px-4 pt-2 space-y-1.5 border-b-2 border-transparent"
                        >
                            <HeartPulseIcon className="w-4 h-4" />
                            <span className="block text-xs">Health</span>
                        </Link>
                    </div>
                    <div className="flex-1 group">
                        <Link
                          href={routes.settings}
                          className="flex flex-col items-center justify-center px-4 pt-2 space-y-1.5 border-b-2 border-transparent"
                        >
                            <CogIcon className="w-4 h-4" />
                            <span className="block text-xs">Settings</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
