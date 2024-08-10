import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Poppins } from 'next/font/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { ThemeProvider } from 'next-themes';
import PageLoader from '@/components/ui/page-loader';
import { useRouter } from 'next/router';
import { PAGE_LOADER_THRESHOLD } from '@/config/app';

const poppins = Poppins({ subsets: ['latin'], weight: ['200', '400', '500', '600', '700'], variable: '--font-poppins' });

const staleTimeInMs = 1000 * 60 * 30; // 30 mins

function CustomApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const [pageLoading, setPageLoading] = useState<boolean>(false);

  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        refetchOnReconnect: true,
        retry: false,
        staleTime: staleTimeInMs, // 30 mins
      },
      mutations: {
        onError() {
          toast.error('Something went wrong, please try again.');
        },
      },
    },
  }));

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    const handleRouteChangeStart = () => timer = setTimeout(() => setPageLoading(true), PAGE_LOADER_THRESHOLD);

    const handleRouteChangeCompleted = () => {
      if (timer) {
        clearTimeout(timer);
      }
      setPageLoading(false);
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeCompleted);
    router.events.on('routeChangeError', handleRouteChangeCompleted);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeCompleted);
      router.events.off('routeChangeError', handleRouteChangeCompleted);

      if (timer) {
        clearTimeout(timer);
      }
    }
  }, [router.events])

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
    >
      <style jsx global>
        {`
        html {
          font-family: ${poppins.style.fontFamily};
        }
      `}
      </style>
      <QueryClientProvider client={queryClient}>
        <PageLoader isHidden={!pageLoading} />
        <main className={`${poppins.className} bg-zinc-950`}>
          <Component {...pageProps} />
        </main>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default CustomApp;
