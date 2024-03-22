type SidebarButtonProps = {
    children: React.ReactNode;
    onClick: () => void;
}

export default function SidebarButton({ children, onClick }: SidebarButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className='w-full justify-start inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-gray-950 dark:focus-visible:ring-gray-300 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-50 h-10 px-4 py-2 space-x-3'
        >
            {children}
        </button>
    );
}
