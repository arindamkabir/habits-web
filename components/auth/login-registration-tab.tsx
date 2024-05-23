import {
    Card,
    CardContent,
} from "@/components/ui/card"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import LoginForm from "./forms/login-form"
import RegistrationForm from "./forms/registration-form"

const LoginRegistrationTab = () => {
    return (
        <Tabs defaultValue="login" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="registration">Registration</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
                <Card>
                    <CardContent className="pt-6">
                        <LoginForm />
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="registration">
                <Card>
                    <CardContent className="pt-6">
                        <RegistrationForm />
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    )
}

export default LoginRegistrationTab;
