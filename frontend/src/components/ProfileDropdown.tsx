"use client";

import { useEffect, useState } from "react";
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
import { ServerUser } from "@/interfaces/ServerUser";
import { emptyServerUser } from "@/interfaces/ServerUser";

export function ProfileDropdown() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<ServerUser>(emptyServerUser);

  async function onLogout() {
    try {
      deleteCookie("pb_auth");
      localStorage.clear();
      router.push("/auth/login");
      window.location.reload();
    } catch (err: any) {
      console.error(err);
    }
  }

  useEffect(() => {
    getUser().then((userData) => {
      setUser(userData);
    });
  }, []);

  async function getUser(): Promise<ServerUser> {
    try {
      const response = await fetch('/apix/user', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      });

      if (!response.ok) {
        return emptyServerUser
      };
      const data = await response.json();
      return data
    } catch (err: any) {
      console.error(err)
      return emptyServerUser
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
          className="mt-1 mx-1 max-w-60 rounded-xl border dark:border-gray-600 border-gray-300 shadow-xl p-4 space-y-2 focus:outline-none focus:ring-0"
        >
          <Link
            href="/settings"
            className="w-full text-left mb-4 my-1 text-md text-blue-700 dark:text-white hover:text-black"
          >
            {user?.email ? user.email : "Loading..."}
          </Link>
          <Separator className="mb-2 mt-3" />
          <button
            className="w-full text-left text-md text-red-500 hover:text-red-600 cursor-pointer focus:outline-none focus:ring-0"
            onClick={onLogout}
          >
            Log out
          </button>
        </PopoverContent>
      </Popover>
    </div>
  );
}
