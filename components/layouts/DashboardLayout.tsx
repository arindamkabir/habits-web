import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks/use-auth";
import Sidebar from "./Navigation/Sidebar";
import { Toaster } from "../ui/sonner";
import Head from "next/head";
import DashboardHeader from "./DashboardHeader";
import PageLoader from "../ui/page-loader";
import useAppStore from "@/store/store";
import BottomNavigationMobile from "./Navigation/BottomNavigationMobile";

type DashboardLayoutProps = {
    header?: string;
    children: React.ReactNode;
}

const DashboardLayout = ({ header, children }: DashboardLayoutProps) => {
    const loading = useAppStore(state => state.loading);
    const { user, isPending } = useAuth("auth");
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <>
            <Head>
                <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
                <link rel="manifest" href="/favicon/site.webmanifest" />
            </Head>
            {
                (!user || isPending || loading)
                    ?
                    <PageLoader />
                    :
                    <>
                        <div className="min-h-screen">
                            <nav className="bg-white border-b border-gray-100 dark:bg-gray-950 dark:border-gray-700">
                                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' md:hidden'}>
                                    <div className="pt-2 pb-3 space-y-1">
                                        {/* <ResponsiveNavLink href="/dashboard" active={router.pathname === '/dashboard'}>
                                    Dashboard
                                </ResponsiveNavLink> */}
                                    </div>

                                    <div className="pt-4 pb-1 border-t border-gray-200 dark:border-gray-600">
                                        <div className="px-4">
                                            <div className="text-base font-medium text-gray-800 dark:text-gray-200">
                                                {/* {user.name} */}
                                            </div>
                                            {/* <div className="text-sm font-medium text-gray-500">arindamkabir@gmail.com</div> */}
                                        </div>

                                        {/* <div className="mt-3 space-y-1">
                                    <ResponsiveNavLink href="/">Profile</ResponsiveNavLink>
                                    <ResponsiveNavButton onClick={logout}>
                                        Log Out
                                    </ResponsiveNavButton>
                                </div> */}
                                    </div>
                                </div>
                            </nav>



                            <div className="flex flex-col w-full overflow-y-hidden md:flex-row md:h-screen">
                                <Sidebar />

                                <div className="flex-auto w-full overflow-y-auto flex flex-col justify-between h-full">
                                    <div>
                                        <div className="">
                                            <div className="flex items-center justify-between">
                                                <DashboardHeader header={header} user={user} />
                                            </div>
                                        </div>
                                        <div className="px-4 py-10 sm:px-4 md:px-6 lg:px-12 xl:px-20">
                                            {children}
                                        </div>
                                    </div>


                                    <div
                                        className="flex justify-between px-4 py-4 sm:px-4 md:px-6 lg:px-12 xl:px-20">
                                        <p className="text-xs text-gray-400">All rights reserved.</p>
                                    </div>

                                </div>
                            </div>
                            <BottomNavigationMobile />
                        </div>
                        <Toaster />
                    </>
            }
        </>
    )
}

export default DashboardLayout