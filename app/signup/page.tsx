"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { submitSignup, checkEmailExists } from "@/actions/signupSubmit";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

type UserFormData = {
  email: string;
  username: string;
  firstname: string;
  lastname: string;
  number: string;
  city: string;
  state: string;
  country: string;
  password: string;
  userType: string;
};

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState<UserFormData>({
    email: "",
    username: "",
    firstname: "",
    lastname: "",
    number: "",
    city: "",
    state: "",
    country: "",
    password: "",
    userType: "Consumer",
  });

  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      // Check if email already exists in local database
      const emailExists = await checkEmailExists(formData.email);
      console.log("Email exists:", emailExists); // Debugging log
      if (emailExists) {
        setMessage(
          "Error! This email is already registered. Please use a different email or log in.",
        );
        setIsLoading(false);
        return;
      }

      // Supabase Authentication
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            username: formData.username,
          },
        },
      });

      if (authError) {
        throw new Error(authError.message);
      }

      // Convert formData to FormData
      const formDataToSubmit = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSubmit.append(key, value);
      });

      // If Supabase signup is successful, proceed with local database submission
      const response = await submitSignup(formDataToSubmit);
      console.log("Signup response:", response); // Debugging log

      if (response.success) {
        setMessage(
          "Signup successful! Please check your email for confirmation.",
        );
        setTimeout(() => router.push("/login"), 2000);
      } else {
        // If local database submission fails, delete the Supabase user
        await supabase.auth.admin.deleteUser(authData.user!.id);
        throw new Error(response.message);
      }
    } catch (error) {
      console.error("Error during signup:", error);
      if (error instanceof Error) {
        setMessage(`Error: ${error.message}`);
      } else {
        setMessage("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex justify-center py-10">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <Icons.logo className="mx-auto h-10 w-10 text-primary" />
          <CardTitle className="text-2xl font-semibold">
            Create an account
          </CardTitle>
          <CardDescription>
            Enter your details below to create your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="space-y-4">
              {Object.keys(formData).map(
                (key) =>
                  key !== "userType" && (
                    <div key={key} className="space-y-2">
                      <Label htmlFor={key}>
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </Label>
                      <Input
                        id={key}
                        name={key}
                        type={
                          key === "email"
                            ? "email"
                            : key === "password"
                              ? "password"
                              : "text"
                        }
                        placeholder={`Enter your ${key}`}
                        value={formData[key as keyof UserFormData]}
                        onChange={handleInputChange}
                        disabled={isLoading}
                        required
                      />
                    </div>
                  ),
              )}
            </div>
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Sign Up
            </Button>
          </form>
          {message && (
            <p
              className={cn(
                "mt-4 text-sm",
                message.startsWith("Error") ? "text-red-500" : "text-green-500",
              )}
            >
              {message}
            </p>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-2 text-center">
          <p className="text-sm">
            Already a user?{" "}
            <a
              href="/login"
              className="underline underline-offset-4 hover:text-primary"
            >
              Login
            </a>
          </p>
          <p className="text-sm">
            By clicking continue, you agree to our{" "}
            <a
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </a>
            .
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
