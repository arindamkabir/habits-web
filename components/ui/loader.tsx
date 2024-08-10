import { colors } from "@/config/colors"
import { cn } from "@/utils/classNames"
import { Bars } from "react-loader-spinner"

export const Loader = ({
    classNames = "",
    text = "Loading..."
}) => {
    return (
        <div className={cn("space-y-2 h-full w-full flex flex-col justify-center items-center", classNames)}>
            <Bars
                height="32"
                width="32"
                color={colors.teal['500']}
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />

            <p className="text-center text-zinc-950 dark:text-zinc-50 text-xs">{text}</p>
        </div>
    )
}