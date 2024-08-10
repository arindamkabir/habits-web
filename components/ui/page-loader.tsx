import { colors } from '@/config/colors';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { ProgressBar } from 'react-loader-spinner';

function PageLoader({ isHidden }: { isHidden?: boolean }) {
    const { theme } = useTheme();

    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted || isHidden) return null;

    return (
        <div className="fixed inset-0 h-screen w-screen flex flex-col justify-center items-center bg-white dark:bg-gray-950" style={{ zIndex: 9999999 }}>
            <ProgressBar
                visible={true}
                height="80"
                width="80"
                barColor={colors.teal[500]}
                borderColor={theme === 'dark' ? "white" : "black"}
                ariaLabel="progress-bar-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />

            <p className="text-center text-zinc-950 dark:text-zinc-50 text-sm mt-2">Loading...</p>
        </div>
    );
}

export default PageLoader;
