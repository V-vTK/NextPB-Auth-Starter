'use client'
import { ChevronRightIcon, ComputerDesktopIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";
import { useState } from "react";

export function Sidebar() {
  const [isHidden, setIsHidden] = useState(false);

  const toggleVisibility = () => {
    setIsHidden(!isHidden);
  };

  return (
    <div className="h-screen">
      <div className="flex flex-row">
        <div className={`flex rounded-lg flex-col w-2 border-r-2 border-t-1 border-b-1 dark:shadow-xl dark:border-gray-700 border-gray-100 shadow-lg rounded-rl-lg items-center rounded-rl-lg rounded-bl-none rounded-tl-none h-screen overflow-hidden transition duration-500 ${isHidden ? "w-32" : "-translate-x-full"}`}>
          <div className="px-4">
            <Link className="px-4 py-2 mt-4" href="/dashboard">
              <div className="flex flex-col items-center">
                <ComputerDesktopIcon className="w-10 h-10"/>
                <p className="text-md text-muted-foreground">Dashboard</p>
              </div>
            </Link>
          </div>
        </div>
        <button onClick={toggleVisibility} className={`border-none bg-transparent inline-flex ${isHidden ? "" : "absolute left-0"}`}>
          <ChevronRightIcon className={`w-8 h-8 mr-2 my-4 rounded-full dark:hover:border-neutral-100 hover:border-2 hover:border-neutral-900 transition duration-500 ${isHidden ? "" : "rotate-180"}`}></ChevronRightIcon>
        </button>
      </div>
    </div>
  );
}