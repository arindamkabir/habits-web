import "@/styles/globals.css";
import type { AppProps } from 'next/app';
import { Poppins } from 'next/font/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';
import { ThemeProvider } from "@/components/providers/theme-provider";
import { useToast } from "@/components/ui/use-toast";
import { toast } from "sonner";

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
        onError(error, variables, context) {
          toast.error("Something went wrong, please try again.")
        },
      }
    }
  }));

  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${poppins.style.fontFamily};
        }
      `}</style>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <main className={`${poppins.className}`} data-theme="dark">
            <Component {...pageProps} />
          </main>
        </ThemeProvider>
        <ReactQueryDevtools />
      </QueryClientProvider >
    </>
  )
}

export default CustomApp;