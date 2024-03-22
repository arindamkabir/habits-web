import { useAuth } from "@/hooks/use-auth";
import Head from "next/head";
import PageLoader from "../ui/page-loader";
import useAppStore from "@/store/store";

type GuestLayoutProps = {
    children: React.ReactNode
}

const GuestLayout = ({ children }: GuestLayoutProps) => {
    const loading = useAppStore(state => state.loading);
    const { user, isPending } = useAuth("guest");

    return (
        <>
            <Head>
                <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
                <link rel="manifest" href="/favicon/site.webmanifest" />
                <title>ITechfix Admin</title>
            </Head>
            {
                (isPending || loading)
                    ?
                    <PageLoader />
                    :
                    <main className="flex flex-col justify-center items-center w-full overflow-y-hidden md:flex-row md:h-screen px-3">
                        {children}
                    </main>
            }
        </>
    )
}

export default GuestLayout;