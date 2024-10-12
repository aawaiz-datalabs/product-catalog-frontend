"use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { cn } from "@/lib/utils";
// import { Icons } from "@/components/icons";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { supabase } from "@/lib/supabaseClient";

// type UserFormData = {
//   email: string;
//   username: string;
//   firstname: string;
//   lastname: string;
//   number: string;
//   city: string;
//   state: string;
//   country: string;
//   password: string;
// };

// type UserDataForStorage = Omit<UserFormData, "password">;

// export default function SignUpPage() {
//   const [isLoading, setIsLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [formData, setFormData] = useState<UserFormData>({
//     email: "",
//     username: "",
//     firstname: "",
//     lastname: "",
//     number: "",
//     city: "",
//     state: "",
//     country: "",
//     password: "",
//   });
//   const router = useRouter();

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//   };

//   async function onSubmit(event: React.SyntheticEvent) {
//     event.preventDefault();
//     setIsLoading(true);
//     setMessage("");

//     try {
//       // Authenticate with Supabase
//       const { data, error } = await supabase.auth.signUp({
//         email: formData.email,
//         password: formData.password,
//       });

//       if (error) {
//         console.error("Error signing up:", error);
//         setMessage(`Error: ${error.message}`);
//       } else {
//         console.log("Signup successful:", data);

//         // Create a new object without the password field
//         const userDataForStorage: UserDataForStorage = {
//           email: formData.email,
//           username: formData.username,
//           firstname: formData.firstname,
//           lastname: formData.lastname,
//           number: formData.number,
//           city: formData.city,
//           state: formData.state,
//           country: formData.country,
//         };

//         // Store user data in db.json (simulated here)
//         // In a real application, you would use an API call to store this data
//         console.log("User data to be stored:", userDataForStorage);

//         setMessage(
//           "Signup successful! Please check your email for confirmation.",
//         );
//         setTimeout(() => router.push("/login"), 5000);
//       }
//     } catch (error) {
//       console.error("Unexpected error during signup:", error);
//       setMessage("An unexpected error occurred. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   return (
//     <div className="container flex h-screen w-screen flex-col items-center justify-center">
//       <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
//         <div className="flex flex-col space-y-2 text-center">
//           <Icons.logo className="mx-auto h-6 w-6" />
//           <h1 className="text-2xl font-semibold tracking-tight">
//             Create an account
//           </h1>
//           <p className="text-sm text-muted-foreground">
//             Enter your details below to create your account
//           </p>
//         </div>
//         <form onSubmit={onSubmit} className="space-y-4">
//           {Object.keys(formData).map((key) => (
//             <div key={key} className="space-y-2">
//               <Label htmlFor={key}>
//                 {key.charAt(0).toUpperCase() + key.slice(1)}
//               </Label>
//               <Input
//                 id={key}
//                 type={
//                   key === "email"
//                     ? "email"
//                     : key === "password"
//                       ? "password"
//                       : "text"
//                 }
//                 placeholder={`Enter your ${key}`}
//                 value={formData[key as keyof UserFormData]}
//                 onChange={handleInputChange}
//                 disabled={isLoading}
//               />
//             </div>
//           ))}
//           <Button className="w-full" type="submit" disabled={isLoading}>
//             {isLoading && (
//               <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
//             )}
//             Sign Up
//           </Button>
//         </form>
//         {message && (
//           <p
//             className={cn(
//               "mt-2 text-sm",
//               message.startsWith("Error") ? "text-red-500" : "text-green-500",
//             )}
//           >
//             {message}
//           </p>
//         )}
//         <p className="px-8 text-center text-sm text-muted-foreground">
//           By clicking continue, you agree to our{" "}
//           <a
//             href="/terms"
//             className="hover:text-brand underline underline-offset-4"
//           >
//             Terms of Service
//           </a>{" "}
//           and{" "}
//           <a
//             href="/privacy"
//             className="hover:text-brand underline underline-offset-4"
//           >
//             Privacy Policy
//           </a>
//           .
//         </p>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabaseClient"; // Added Supabase import
import { submitSignup } from "@/actions/signupSubmit"; // Assuming this is your custom function

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

type UserDataForStorage = Omit<UserFormData, "password">; // Omit password for storing data

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
  });

  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      // Authenticate with Supabase
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            username: formData.username, // Add the username to user metadata
          },
        },
      });

      if (error) {
        console.error("Error signing up:", error);
        setMessage(`Error: ${error.message}`);
      } else {
        console.log("Signup successful:", data);

        // Create a new object without the password field
        const userDataForStorage: UserDataForStorage = {
          email: formData.email,
          username: formData.username,
          firstname: formData.firstname,
          lastname: formData.lastname,
          number: formData.number,
          city: formData.city,
          state: formData.state,
          country: formData.country,
        };

        // Submit the signup data using your backend server function
        // Convert `userDataForStorage` to FormData
        const form = new FormData();
        Object.entries(userDataForStorage).forEach(([key, value]) => {
          form.append(key, value);
        });

        // Submit the FormData object using your backend server function
        const response = await submitSignup(form);

        if (response.success) {
          setMessage(
            "Signup successful! Please check your email for confirmation.",
          );
          setTimeout(() => router.push("/login"), 5000);
        } else {
          setMessage(`Error: ${response.message}`);
        }
      }
    } catch (error) {
      console.error("Unexpected error during signup:", error);
      setMessage("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Icons.logo className="mx-auto h-6 w-6" />
          <h1 className="text-2xl font-semibold tracking-tight">
            Create an account
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your details below to create your account
          </p>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          {Object.keys(formData).map((key) => (
            <div key={key} className="space-y-2">
              <Label htmlFor={key}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Label>
              <Input
                id={key}
                type={
                  key === "email"
                    ? "email"
                    : key === "password"
                      ? "password"
                      : "text"
                }
                placeholder={`Enter your ${key}`}
                value={formData[key as keyof UserFormData]} // Correctly typed key access
                onChange={handleInputChange}
                disabled={isLoading}
              />
            </div>
          ))}
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
              "mt-2 text-sm",
              message.startsWith("Error") ? "text-red-500" : "text-green-500",
            )}
          >
            {message}
          </p>
        )}
        <p className="px-8 text-center text-sm text-muted-foreground">
          By clicking continue, you agree to our{" "}
          <a
            href="/terms"
            className="hover:text-brand underline underline-offset-4"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="/privacy"
            className="hover:text-brand underline underline-offset-4"
          >
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}
