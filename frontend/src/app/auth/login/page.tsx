"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useLoadingStore } from "@/app/(secure)/zustand";

// https://blog.mahad.dev/setting-up-nextjs-and-pocketbase-for-authentication
export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setLoading } = useLoadingStore();

  const [redirectTo, setRedirectTo] = useState("/dashboard");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const param = searchParams.get("redirectTo");
    if (param) setRedirectTo(param);
  }, [searchParams]);

  const handleLogin = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Failed to authenticate user");
      }

      const data = await response.json();

      if (data?.token) {
        router.push(redirectTo);
        window.location.reload();
      } else {
        throw new Error("Invalid login response");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to authenticate user");
    } finally {
      setLoading(false);
    }
  }, [email, password, redirectTo, router, setLoading]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
    <div className="flex justify-center">
      <div className="flex-col">
        <h1 className="py-2 mt-4 text-xl font-semibold">Login</h1>
        <Card className="border-2 p-8 rounded-lg dark:border-muted border-gray-300">
          <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@email.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex flex-col items-center gap-2">
              <p>
                Don&apos;t have an account?{" "}
                <Link className="text-primary" href="/auth/register">
                  Register
                </Link>
              </p>
              {error && <p className="text-red-600">{error}</p>}
            </div>

            <Button
              className="border-2 rounded-md border-gray-300 dark:border-muted px-1"
              type="submit"
              id="submit"
            >
              Submit
            </Button>
          </form>
        </Card>
      </div>
    </div>
    </Suspense>
  );
}
