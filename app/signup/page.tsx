"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { Icons } from "@/components/icons"; // Assuming you have an Icons component
import { submitSignup } from "@/actions/signupSubmit";

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
};

export default function SignupForm() {
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
  });

  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const result = await submitSignup(formData);

      if (result.success) {
        setMessage(result.message);
        setTimeout(() => router.push("/login"), 2000);
      } else {
        setMessage(result.message);
      }
    } catch (error) {
      setMessage(
        `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center py-10">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <Icons.logo className="mx-auto h-10 w-10 text-primary" />
          <CardTitle>Create an Account</CardTitle>
          <CardDescription>Fill in your details to sign up</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={isLoading}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleInputChange}
                disabled={isLoading}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="firstname">First Name</Label>
              <Input
                id="firstname"
                type="text"
                placeholder="Enter your first name"
                value={formData.firstname}
                onChange={handleInputChange}
                disabled={isLoading}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastname">Last Name</Label>
              <Input
                id="lastname"
                type="text"
                placeholder="Enter your last name"
                value={formData.lastname}
                onChange={handleInputChange}
                disabled={isLoading}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="number">Phone Number</Label>
              <Input
                id="number"
                type="tel"
                placeholder="Enter your phone number"
                value={formData.number}
                onChange={handleInputChange}
                disabled={isLoading}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                type="text"
                placeholder="Enter your city"
                value={formData.city}
                onChange={handleInputChange}
                disabled={isLoading}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                type="text"
                placeholder="Enter your state"
                value={formData.state}
                onChange={handleInputChange}
                disabled={isLoading}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                type="text"
                placeholder="Enter your country"
                value={formData.country}
                onChange={handleInputChange}
                disabled={isLoading}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                disabled={isLoading}
                required
              />
            </div>
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
          {message && (
            <p
              className={`mt-4 text-sm ${message.includes("success") ? "text-green-500" : "text-red-500"}`}
            >
              {message}
            </p>
          )}
        </CardContent>
        <CardFooter className="space-y-2 text-center">
          <p>
            Already have an account?{" "}
            <a href="/login" className="underline">
              Login
            </a>
          </p>
          <p>
            By signing up, you agree to our{" "}
            <a href="/terms" className="underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="underline">
              Privacy Policy
            </a>
            .
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
