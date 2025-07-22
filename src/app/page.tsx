"use client"
import Dashboard from "@/components/Dashboard";
import Scrollabletimeline from "@/components/Time";
import Image from "next/image";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["200", "300", "400", "500", "600", "700", "800"] });

export default function Home() {
  return (
    <div
      className={`text-white ${plusJakartaSans.className}`}
    >
      <Dashboard />
      <Scrollabletimeline />
    </div>
  );
}
