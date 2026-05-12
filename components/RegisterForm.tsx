"use client";

import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Link from "next/dist/client/link";
import { toast } from "sonner";
import { useRouter } from "next/dist/client/components/navigation";
import { Eye, EyeOff } from "lucide-react";
import { signIn } from "next-auth/react";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const handleRegister = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const toastID = toast.loading("Creating your account...");
    try {
      setLoading(true);

      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("User created successfully", {
          description: "Redirecting to login page...",
          id: toastID,
        });
        setTimeout(() => {
          router.push("/login");
        }, 300);
      } else {
        toast.error(data.error, {
          id: toastID,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", {
        id: toastID,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center px-4 w-full">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 flex flex-col items-center justify-center text-center">
          <CardTitle className="text-3xl font-bold py-2">Register</CardTitle>
          <CardDescription>Create your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm block py-1 text-lg font-bold">
                Email
              </label>
              <Input
                type="text"
                placeholder="test@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-[45px]"
              />
            </div>
            <div className="space-y-2 relative">
              <label className="text-sm block py-1 text-lg font-bold">
                Password
              </label>
              <Input
                type={isOpen ? "text" : "password"}
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-[45px]"
              />
              {isOpen ? (
                <EyeOff
                  className={`absolute right-2 bottom-2 transform -translate-y-1/2 cursor-pointer block`}
                  onClick={() => {
                    setIsOpen(false);
                  }}
                />
              ) : (
                <Eye
                  className={`absolute right-2 bottom-2 transform -translate-y-1/2 cursor-pointer block`}
                  onClick={() => {
                    setIsOpen(true);
                  }}
                />
              )}
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-[45px] font-semibold my-2 cursor-pointer transition-colors duration-300 hover:bg-black/80 dark:hover:bg-white/70"
            >
              {loading ? "Loading..." : "Create Account"}
            </Button>
          </form>
          <div className="my-6 flex items-center gap-2">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">OR</span>
            <div className="h-px flex-1 bg-border" />
          </div>
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full h-[45px] cursor-pointer transition-colors duration-300 hover:bg-black/5 dark:hover:bg-white/10 font-[600]"
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            >
              <FcGoogle className="mr-2 size-5" />
              Continue with Google
            </Button>
          </div>
          <div className="flex gap-2 py-4 justify-center items-center">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Login
            </Link>
          </div>
          <div className="flex gap-2 justify-center items-center">
            Back to{" "}
            <Link href="/" className="text-primary hover:underline">
              Home
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterForm;
