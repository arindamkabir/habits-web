import Image from "next/image";
import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import LoginRegistrationTab from "@/components/auth/login-registration-tab";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <LoginRegistrationTab />
    </div>
  );
}
