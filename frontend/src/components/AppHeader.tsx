"use client";
import { Suspense } from "react";
import ThemeSwitch from "@/components/ThemeSwitch";
import LoadingCircle from "@/components/LoadingCircle";
import { useLoadingStore } from "@/app/(secure)/zustand";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ProfileDropdown } from "./ProfileDropdown";


export function AppHeader() {
  const { isLoading } = useLoadingStore();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <header className="border-b-2 dark:shadow-xl dark:border-gray-700 border-gray-200 shadow-xs rounded-b-lg py-4 px-6 dark:text-white text-black">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <nav className="flex gap-6 flex-wrap">
            <Link
              href="/"
              className={`text-lg font-semibold ${isActive("/") ? "text-blue-600" : "text-gray-700 hover:text-blue-600"}`}
            >
              Home
            </Link>
            <Link
              href="/dashboard"
              className={`text-lg font-semibold ${isActive("/dashboard") ? "text-blue-600" : "text-gray-700 hover:text-blue-600"}`}
            >
              Dashboard
            </Link>
            <Link
              href="/settings"
              className={`text-lg font-semibold ${isActive("/settings") ? "text-blue-600" : "text-gray-700 hover:text-blue-600"}`}
            >
              Settings
            </Link>
          </nav>
          <div className="flex gap-6 items-center">
            {isLoading && <LoadingCircle></LoadingCircle>}
            <ThemeSwitch />
            <ProfileDropdown />
          </div>
        </div>
      </header>
    </Suspense>
  );
}
