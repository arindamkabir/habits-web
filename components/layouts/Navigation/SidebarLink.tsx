import Link from 'next/link';

type SidebarLinkProps = {
    href: string,
    active: boolean,
    children: React.ReactNode;
}

export default function SidebarLink({ href, active, children }: SidebarLinkProps) {
    return (
        <Link
            href={href}
            className={
                active
                    ? 'w-full justify-start inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-gray-950 dark:focus-visible:ring-gray-300 bg-gray-100 text-gray-900 hover:bg-gray-100/80 dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-800/80 h-10 px-4 py-2 space-x-3'
                    : 'w-full justify-start inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-gray-950 dark:focus-visible:ring-gray-300 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-50 h-10 px-4 py-2 space-x-3'
            }
        >
            {children}
        </Link>
    );
}
