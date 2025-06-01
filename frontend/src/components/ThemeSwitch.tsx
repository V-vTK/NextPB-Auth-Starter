"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

// https://medium.com/@aashekmahmud/implementing-dark-and-light-mode-themes-in-next-js-a-comprehensive-guide-bf2c34ecd50d
export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  function toggleTheme() {
    if (resolvedTheme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }

  if (!mounted) {
    return null;
  }

  const icon = resolvedTheme === "light" ? (
      <MoonIcon className="w-6 text-gray-700" />
    ) : (
      <SunIcon className="w-6" />
    );

  return (
    <div
      onClick={toggleTheme}
      style={{ cursor: "pointer" }}
      className="hover:text-primary"
    >
      {icon}
    </div>
  );
}
