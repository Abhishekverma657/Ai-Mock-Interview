"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800">
      <div className="relative w-full h-screen flex justify-center items-center overflow-hidden">
        <img
          src="https://cdn.dribbble.com/users/1523313/screenshots/16134521/ai-animation.gif"
          className="w-full h-full object-cover opacity-20" // Reduced opacity
          alt="AI Animation"
        />
        <Button
          className="absolute bottom-10 px-8 py-4 text-xl font-semibold   bg-gradient-to-r from-blue-200 to-blue-400 hover:from-blue-500 hover:to-blue-600 text-slate-700 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105"
          onClick={() => router.push("/dashboard")}
        >
          Start Your Journey
        </Button>
      </div>
    </div>
  );
}
