"use client";

import FileUploader from "@/components/FileUploader";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";

export default function Home() {
  const { logIn, signIn, signUp } = useAuth();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  // sign In logic
  const handleSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      await signIn(email, password);
      setError(null);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Handle Sign Up
  const handleSignUp = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      await signUp(email, password);
      setError(null);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Handle Log in with Google
  const handleGoogleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      await logIn();
      setError(null);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
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
        {/* {!user ? (
        <button
          onClick={logIn}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Sign in with Google
        </button>
      ) : (
        <>
          <p className="mb-4">Welcome, {user.displayName}</p>
          <button
            onClick={logOut}
            className="mb-6 bg-red-500 text-white px-4 py-2 rounded"
          >
            Sign out
          </button>
          <FileUploader />
        </>
      )} */}
        <div className="text-center">
          <h1 className="font-bold text-[25px]">Welcome to Savor</h1>
          <p>Store and access your files from anywhere</p>
        </div>

        {/* Form */}
        <div
          className=" border-[0.8px] border-[#CFDBE8] rounded-lg my-[20px]
          w-[100%] md:w-[80%] lg:w-[50%] p-8"
        >
          <form className="flex flex-col gap-[15px]">
            <div className="labelHolder">
              <label htmlFor="email">Email</label>
              <input
                className="inputStyle"
                type="text"
                placeholder="Enter Email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="labelHolder">
              <label htmlFor="password">Password</label>
              <input
                className="inputStyle"
                type="password"
                name="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Sign in or sign up */}
            <div className="flex flex-wrap justify-between items-center text-center text-white gap-3">
              <button
                onClick={handleSignIn}
                className="bg-blue-500 rounded-lg
              py-[5px] px-[12px] w-[40%]"
              >
                Sign In
              </button>

              <button
                onClick={handleSignUp}
                className="bg-blue-50 rounded-lg
              py-[5px] px-[12px] text-black border-[0.8px] border-[#CFDBE8] w-[40%]"
              >
                Sign Up
              </button>

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
          </form>
        </div>
      </main>
    </div>
  );
}
