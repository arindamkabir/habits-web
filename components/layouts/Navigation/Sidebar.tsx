import { LayoutDashboardIcon, LogOutIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import SidebarLink from './SidebarLink';
import { useLogout } from '@/hooks/mutations/auth/use-logout';
import SidebarButton from './SidebarButton';

export default function Sidebar() {
    const pathname = usePathname();

    const { mutate: logout } = useLogout();

    return (
        <div className="flex-none hidden shadow md:block">
            <div className="w-72 overflow-x-hidden overflow-y-hidden transition-all duration-300 border-r bg-base-300 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">

                <div className="flex flex-col justify-between py-4 h-full md:min-h-screen">
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold leading-tight px-7 py-4">
                            Habit Tracker
                        </h2>

                        <div className="px-3 py-2">
                            <SidebarLink href="/dashboard" active={pathname === '/dashboard'}>
                                <LayoutDashboardIcon className="w-4 h-4 mr-2" />
                                <span>Dashboard</span>
                            </SidebarLink>
                        </div>

                        {/* <div className="px-3 py-2">
                            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                                Inventory
                            </h2>

                            <div className="space-y-1">
                                <SidebarLink href="/dashboard/products" active={pathname?.startsWith('/dashboard/products')}>
                                    <ShoppingBasketIcon className="w-4 h-4 mr-2" />
                                    <span>Products</span>
                                </SidebarLink>

                                <SidebarLink href="/dashboard/repairs" active={pathname?.startsWith('/dashboard/repairs')}>
                                    <HammerIcon className="w-4 h-4 mr-2" />
                                    <span>Repairs</span>
                                </SidebarLink>

                                <SidebarLink href="/dashboard/categories" active={pathname?.startsWith('/dashboard/categories')}>
                                    <TagsIcon className="w-4 h-4 mr-2" />
                                    <span>Categories</span>
                                </SidebarLink>

                                <SidebarLink href="/dashboard/brands" active={pathname?.startsWith('/dashboard/brands')}>
                                    <Building2Icon className="w-4 h-4 mr-2" />
                                    <span>Brands</span>
                                </SidebarLink>
                            </div>
                        </div> */}

                    </div>

                    <div className="py-4">
                        <div className="space-y-4">
                            <div className="px-3 py-2">
                                {/* <SidebarLink href="/dashboard/settings" active={false}>
                                    <CogIcon className="w-4 h-4 mr-2" />
                                    <span>Settings</span>
                                </SidebarLink> */}
                            </div>
                            <div className="px-3 py-2">
                                <SidebarButton onClick={() => logout()}>
                                    <LogOutIcon className="w-4 h-4 mr-2" />
                                    <span>Log Out</span>
                                </SidebarButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
