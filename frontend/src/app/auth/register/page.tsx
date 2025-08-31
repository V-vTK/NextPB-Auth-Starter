"use client";

import { useState, useCallback, Suspense } from "react";
import { useRouter } from "next/navigation";
import { useLoadingStore } from "@/app/(secure)/zustand";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

// https://blog.mahad.dev/setting-up-nextjs-and-pocketbase-for-authentication
export default function SignUpPage() {
  const router = useRouter();
  const { setLoading } = useLoadingStore();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSignUp = useCallback(async () => {
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, password }),
      });

      if (!response.ok) {
        throw new Error("Failed to register user");
      }

      setSuccess(true);
      setEmail("");
      setUsername("");
      setPassword("");
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Failed to register user");
    } finally {
      setLoading(false);
    }
  }, [email, username, password, router, setLoading]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSignUp();
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
    <div className="flex justify-center">
      <div className="flex-col">
        <h1 className="py-2 mt-4 text-xl font-semibold">Register</h1>
        <Card className="border-2 p-8 rounded-lg dark:border-muted border-gray-300">
          <form onSubmit={onSubmit} className="flex max-w-md flex-col gap-4">
            <div>
              <Label className="mb-1" htmlFor="email">Email</Label>
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
              <Label className="mb-1" htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div>
              <Label className="mb-1" htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex flex-col items-center gap-2">
              {error && <p className="text-red-600">{error}</p>}
              {success && (
                <p className="text-green-600">Created an account successfully</p>
              )}
            </div>

            <Button
              className="border-2 rounded-md border-gray-300 dark:border-muted px-1 text-white"
              type="submit"
              id="submit"
            >
              Sign Up
            </Button>
          </form>

          <div className="mt-4 text-center">
            <p>
              Already have an account?{" "}
              <a href="/auth/login" className="text-primary">
                Log in
              </a>
            </p>
          </div>
        </Card>
      </div>
    </div>
    </Suspense>
  );
}
