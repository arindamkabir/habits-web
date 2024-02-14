import "@/styles/globals.css";
import type { AppProps } from 'next/app';
import { Poppins } from 'next/font/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';
import { ThemeProvider } from "@/components/providers/theme-provider";

const poppins = Poppins({ subsets: ['latin'], weight: ['200', '400', '500', '600', '700'], variable: '--font-poppins' });

const CustomApp = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: { queries: { staleTime: 40000 } }
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
          <main className={`${poppins.className} min-h-screen max-w-7xl mx-auto py-10`} data-theme="dark">
            <Component {...pageProps} />
          </main>
        </ThemeProvider>
        <ReactQueryDevtools />
      </QueryClientProvider >
    </>
  )
}

export default CustomApp;