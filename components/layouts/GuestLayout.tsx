
import { useAuth } from "@/hooks/use-auth";
import { ReloadIcon } from "@radix-ui/react-icons";

type GuestLayoutProps = {
    children: React.ReactNode
}

const GuestLayout = ({ children }: GuestLayoutProps) => {
    const { user, isPending } = useAuth("guest");

    return (
        <>
            {
                (isPending)
                    ?
                    <div className="flex h-screen w-screen justify-center items-center">
                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                        Loading...
                    </div>
                    :
                    <div className="min-h-screen max-w-7xl mx-auto py-10">
                        {children}
                    </div>
            }
        </>
    )
}

export default GuestLayout;