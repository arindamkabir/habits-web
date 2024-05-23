import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useLogin } from "@/hooks/mutations/auth/use-login"

const formSchema = z.object({
    email: z.string().email({
        message: "This is not a valid email.",
    }).min(1, { message: "This field has to be filled." }),
    password: z.string().min(8, { message: "Password has to be at least 8 characters long." }),
})

const LoginForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    const { mutate, isPending, } = useLogin();

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        mutate({ email: values.email, password: values.password, shouldRemember: true });
    }


    // const watchedShouldRemember = watch('shouldRemember');


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Your email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="Your password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" loading={isPending}>Enter</Button>
            </form>
        </Form>
    )
}

export default LoginForm;