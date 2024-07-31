import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { InfinitySpin } from 'react-loader-spinner';

const PageLoader = () => {
    const [mounted, setMounted] = useState<boolean>(false)
    const { theme } = useTheme();

    useEffect(() => {
        setMounted(true)
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <div className='fixed inset-0 h-screen w-screen flex justify-center items-center bg-white dark:bg-gray-950' style={{ zIndex: 9999999 }}>
            {
                theme === 'dark' ? (
                    <InfinitySpin
                        width="120"
                        color="white"
                    />
                ) : (
                    <InfinitySpin
                        width="120"
                        color="black"
                    />
                )

            }
        </div>
    )
}

export default PageLoader