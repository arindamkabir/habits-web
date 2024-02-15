import { useRouter } from "next/router";
import { useAuth } from "@/hooks/use-auth";

type DashboardLayoutProps = {
    children: React.ReactNode
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    const router = useRouter();

    const { user, isPending, logout } = useAuth("auth");

    // const [theme, setTheme] = useState<"dark" | "lofi">("dark");

    // // update state on toggle
    // const handleToggle = (checked: boolean) => {
    //     if (checked) {
    //         setTheme("lofi");
    //     } else {
    //         setTheme("dark");
    //     }
    // };

    // // set theme state in localstorage on mount & also update localstorage on state change
    // useEffect(() => {
    //     localStorage.setItem("theme", theme);
    //     const localTheme = localStorage.getItem("theme");
    //     // add custom data-theme attribute to html tag required to update theme using DaisyUI
    //     if (localTheme)
    //         document.documentElement.setAttribute("data-theme", localTheme);
    // }, [theme]);

    return (
        <>
            {
                (!user || isPending)
                    ?
                    <main className="flex h-screen w-screen justify-center items-center">
                        <span className="loading loading-infinity loading-lg"></span>
                    </main>
                    :
                    <div className="min-h-screen max-w-7xl mx-auto py-10">
                        {children}
                    </div>
            }
        </>
    )
}

export default DashboardLayout