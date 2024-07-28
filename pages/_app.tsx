import "@/styles/globals.css";
import type { AppProps } from 'next/app';
import { Poppins } from 'next/font/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';
import { toast } from "sonner";
import { ThemeProvider } from "next-themes";

const poppins = Poppins({ subsets: ['latin'], weight: ['200', '400', '500', '600', '700'], variable: '--font-poppins' });

const staleTimeInMs = 1000 * 60 * 30; // 30 mins

const CustomApp = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        refetchOnReconnect: true,
        retry: false,
        staleTime: staleTimeInMs // 30 mins
      },
      mutations: {
        onError() {
          toast.error("Something went wrong, please try again.")
        },
      }
    }
  }));

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
    >
      <style jsx global>{`
        html {
          font-family: ${poppins.style.fontFamily};
        }
      `}</style>
      <QueryClientProvider client={queryClient}>
        <main className={`${poppins.className}`}>
          <Component {...pageProps} />
        </main>
        <ReactQueryDevtools />
      </QueryClientProvider >
    </ThemeProvider>
  )
}

export default CustomApp;