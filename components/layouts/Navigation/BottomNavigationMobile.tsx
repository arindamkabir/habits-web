import { CalendarCheck2Icon, CogIcon, HeartPulseIcon, HomeIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const BottomNavigationMobile = () => {
    return (
        <div className="w-full max-w-md mx-auto fixed inset-x-0 bottom-0 md:hidden">
            <div className="py-4 px-7 border border-gray-200 bg-white text-gray-950 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50 shadow-lg">
                <div className="flex">
                    <div className="flex-1 group">
                        <Link
                            href="#"
                            className="flex flex-col items-center justify-center px-4 pt-2 space-y-1.5 group-hover:text-indigo-500 border-b-2 border-transparent group-hover:border-indigo-500"
                        >
                            <HomeIcon />
                            <span className="block text-xs">Home</span>
                        </Link>
                    </div>
                    <div className="flex-1 group">
                        <Link
                            href="#"
                            className="flex flex-col items-center justify-center px-4 pt-2 space-y-1.5 group-hover:text-indigo-500 border-b-2 border-transparent group-hover:border-indigo-500"
                        >
                            <CalendarCheck2Icon />
                            <span className="block text-xs">Habits</span>
                        </Link>
                    </div>
                    <div className="flex-1 group">
                        <Link
                            href="#"
                            className="flex flex-col items-center justify-center px-4 pt-2 space-y-1.5 group-hover:text-indigo-500 border-b-2 border-transparent group-hover:border-indigo-500"
                        >
                            <HeartPulseIcon />
                            <span className="block text-xs">Health</span>
                        </Link>
                    </div>
                    <div className="flex-1 group">
                        <Link
                            href="#"
                            className="flex flex-col items-center justify-center px-4 pt-2 space-y-1.5 group-hover:text-indigo-500 border-b-2 border-transparent group-hover:border-indigo-500"
                        >
                            <CogIcon />
                            <span className="block text-xs">Settings</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BottomNavigationMobile;