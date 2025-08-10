"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { GrNext } from "react-icons/gr";

export default function Settings() {
  const router = useRouter();
  const { user } = useAuth();
  return (
    <div className="px-[30px] w-full">
      <h1 className="text-[30px] font-bold mb-[10px]">Settings</h1>

      <div className="flex flex-col gap-[30px]">
        {/* Email Address */}
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold">Email</h3>
          <p className="font-mono">{user?.email}</p>
        </div>

        {/* Theme?? */}
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold">Appearance</h3>
          <div className="flex justify-between items-center">
            <p className="font-mono">Light Mode</p>
            {/* toggle switch */}
            <div>togggleSwitch</div>
          </div>
        </div>

        {/* Storage plan */}
        <div className="w-full flex flex-col gap-1">
          <h3 className="font-semibold">Storage Plan</h3>

          <div
            className="flex justify-between 
          cursor-pointer
          items-center mt-[5px] "
            onClick={() => router.push("/dashboard/settings/payment")}
          >
            <div>
              <p className="font-medium">Free Plan 0.5GB</p>
              <small className="font-mono">Upgrade to get more space</small>
            </div>

            <GrNext />
          </div>
        </div>
      </div>
    </div>
  );
}
