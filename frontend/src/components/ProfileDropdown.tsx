"use client";

import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";
import Link from "next/link";
import { Separator } from "./ui/separator";

export function ProfileDropdown() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function onLogout() {
    try {
      deleteCookie("pb_auth");
      localStorage.clear();
      router.push("/auth/login");
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="relative">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <UserCircleIcon className="w-8 h-8 text-gray-700 dark:text-white hover:text-gray-900 transition-colors cursor-pointer" />
        </PopoverTrigger>
        <PopoverContent
          sideOffset={8}
          className="mt-1 mx-1 w-40 rounded-xl border dark:border-gray-600 border-gray-300 shadow-xl p-4 space-y-2"
        >
          <Link
            href="/profile"
            className="w-full text-left mb-4 mt-1 text-sm text-gray-700 dark:text-white hover:text-black"
          >
            Profile
          </Link>
          <Separator className="my-1" />
          <button
            className="w-full text-left text-sm text-red-500 hover:text-red-600 cursor-pointer"
            onClick={onLogout}
          >
            Log out
          </button>
        </PopoverContent>
      </Popover>
    </div>
  );
}
