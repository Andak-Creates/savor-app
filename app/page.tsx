"use client";

import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";

export default function Home() {
  const { logIn } = useAuth();

  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  // Handle Log in with Google
  const handleGoogleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      await logIn();
      setError(null);
      router.push("/dashboard");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="h-[100vh] w-full flex justify-center items-center">
      {/* Nav? */}
      <div
        className="absolute h-auto w-full top-0 flex justify-start items-center border-b-[0.5px] border-[black]
      px-[40px]"
      >
        {/* Navigation content */}
        <div
          className="flex  w-fit
        justify-center items-center gap-3"
        >
          {/* Img */}
          <div>
            <Image src={"/images/logo.png"} height={30} width={30} alt="logo" />
          </div>
          <h1 className="font-bold text-[25px]">Savor</h1>
        </div>
      </div>

      {/* Main content */}
      <main className=" w-full flex flex-col items-center justify-center p-8 relative">
        <div className="text-center">
          <h1 className="font-bold text-[25px]">Welcome to Savor</h1>
          <p>Store and access your files from anywhere</p>
        </div>

        {/* Form */}
        <div
          className=" border-[0.8px] border-[#CFDBE8] rounded-lg my-[20px]
          w-[100%] md:w-[80%] lg:w-[50%] p-8"
        >
          {/* Sign in or sign up */}
          <div className="flex flex-wrap justify-between items-center text-center text-white gap-3">
            <button
              onClick={handleGoogleLogin}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex justify-center items-center gap-1 w-full "
            >
              <span className="text-red-500 font-bold text-[20px]">
                <FaGoogle />
              </span>
              Sign in with Google
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
