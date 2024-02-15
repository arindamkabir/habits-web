import LoginRegistrationTab from "@/components/auth/login-registration-tab";
import GuestLayout from "@/components/layouts/GuestLayout";

export default function Home() {
  return (
    <GuestLayout>
      <div className="h-screen w-screen flex flex-col justify-center items-center">
        <LoginRegistrationTab />
      </div>
    </GuestLayout>
  );
}
