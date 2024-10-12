"use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { supabase } from "@/lib/supabaseClient";
// import { Icons } from "@/components/icons";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// export default function LoginPage() {
//   const [isLoading, setIsLoading] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const router = useRouter();

//   async function onSubmit(event: React.SyntheticEvent) {
//     event.preventDefault();
//     setIsLoading(true);

//     const { data, error } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     });

//     if (error) {
//       console.error("Error logging in:", error.message);
//       setIsLoading(false);
//     } else {
//       // Store email in localStorage for use in the navigation bar
//       localStorage.setItem("user", JSON.stringify({ email }));
//       router.push("/"); // Redirect to home page after successful login
//     }
//   }

//   return (
// <div className="container flex h-screen w-screen flex-col items-center justify-center">
//   <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
//     <div className="flex flex-col space-y-2 text-center">
//       <Icons.logo className="mx-auto h-6 w-6" />
//       <h1 className="text-2xl font-semibold tracking-tight">
//         Welcome back
//       </h1>
//       <p className="text-sm text-muted-foreground">
//         Enter your email to sign in to your account
//       </p>
//     </div>
//     <div className="grid gap-6">
//       <form onSubmit={onSubmit}>
//         <div className="grid gap-2">
//           <div className="grid gap-1">
//             <Label className="sr-only" htmlFor="email">
//               Email
//             </Label>
//             <Input
//               id="email"
//               placeholder="name@example.com"
//               type="email"
//               autoCapitalize="none"
//               autoComplete="email"
//               autoCorrect="off"
//               disabled={isLoading}
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>
//           <div className="grid gap-1">
//             <Label className="sr-only" htmlFor="password">
//               Password
//             </Label>
//             <Input
//               id="password"
//               placeholder="Password"
//               type="password"
//               autoCapitalize="none"
//               autoComplete="current-password"
//               autoCorrect="off"
//               disabled={isLoading}
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>
//           <Button disabled={isLoading}>
//             {isLoading && (
//               <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
//             )}
//             Sign In
//           </Button>
//         </div>
//       </form>
//     </div>
//     <p className="px-8 text-center text-sm text-muted-foreground">
//       <a
//         href="/signup"
//         className="hover:text-brand underline underline-offset-4"
//       >
//         Don&apos;t have an account? Sign Up
//       </a>
//     </p>
//   </div>
// </div>
//   );
// }

// import { Icons } from "@/components/icons";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { supabase } from "@/lib/supabaseClient";

// interface User {
//   email: string;
//   username: string;
//   // Add other fields as necessary
// }

// export default function LoginPage() {
//   const [isLoading, setIsLoading] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const router = useRouter();

//   async function fetchUserData(email: string): Promise<User | null> {
//     const response = await fetch(`http://localhost:5500/users`);
//     const users: User[] = await response.json(); // Specify the type here

//     // Find user by email with the correctly typed parameter
//     const userData = users.find((user: User) => user.email === email); // Specify the type for user
//     return userData || null; // Return user data or null if not found
//   }

//   async function onSubmit(event: React.SyntheticEvent) {
//     event.preventDefault();
//     setIsLoading(true);

//     const { data, error } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     });

//     if (error) {
//       console.error("Error logging in:", error.message);
//       setIsLoading(false);
//     } else {
//       // Fetch user details from local JSON
//       const userData = await fetchUserData(email);

//       if (userData) {
//         localStorage.setItem("user", JSON.stringify(userData));
//         // Dispatch an event or directly set state in your context/store
//         window.dispatchEvent(new Event("userLoggedIn")); // Notify other components
//       }

//       router.push("/"); // Redirect to home page after successful login
//     }
//   }

//   return (
//     <div className="container flex h-screen w-screen flex-col items-center justify-center">
//       <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
//         <div className="flex flex-col space-y-2 text-center">
//           <Icons.logo className="mx-auto h-6 w-6" />
//           <h1 className="text-2xl font-semibold tracking-tight">
//             Welcome back
//           </h1>
//           <p className="text-sm text-muted-foreground">
//             Enter your email to sign in to your account
//           </p>
//         </div>
//         <div className="grid gap-6">
//           <form onSubmit={onSubmit}>
//             <div className="grid gap-2">
//               <div className="grid gap-1">
//                 <Label className="sr-only" htmlFor="email">
//                   Email
//                 </Label>
//                 <Input
//                   id="email"
//                   placeholder="name@example.com"
//                   type="email"
//                   autoCapitalize="none"
//                   autoComplete="email"
//                   autoCorrect="off"
//                   disabled={isLoading}
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//               </div>
//               <div className="grid gap-1">
//                 <Label className="sr-only" htmlFor="password">
//                   Password
//                 </Label>
//                 <Input
//                   id="password"
//                   placeholder="Password"
//                   type="password"
//                   autoCapitalize="none"
//                   autoComplete="current-password"
//                   autoCorrect="off"
//                   disabled={isLoading}
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                 />
//               </div>
//               <Button disabled={isLoading}>
//                 {isLoading && (
//                   <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
//                 )}
//                 Sign In
//               </Button>
//             </div>
//           </form>
//         </div>
//         <p className="px-8 text-center text-sm text-muted-foreground">
//           <a
//             href="/signup"
//             className="hover:text-brand underline underline-offset-4"
//           >
//             Don&apos;t have an account? Sign Up
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { cn } from "@/lib/utils";
// import { Icons } from "@/components/icons";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { supabase } from "@/lib/supabaseClient";
// import Link from "next/link";

// interface User {
//   email: string;
//   username: string; // Adjust according to your actual user structure
// }

// export default function LoginPage() {
//   const [isLoading, setIsLoading] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const router = useRouter();

//   async function onSubmit(event: React.SyntheticEvent) {
//     event.preventDefault();
//     setIsLoading(true);

//     const { data, error } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     });

//     if (error) {
//       console.error("Error logging in:", error.message);
//       setIsLoading(false);
//     } else {
//       // Fetch user details from your local JSON database
//       const users: User[] = await fetch(`http://localhost:5500/users`).then(
//         (res) => res.json(),
//       );
//       const userData = users.find((user: User) => user.email === email);

//       if (userData) {
//         // Set user data in a global state or context if necessary
//         router.push("/"); // Redirect to home page after successful login
//       } else {
//         console.error("User data not found");
//       }
//     }
//   }

//   return (
//     <div className="container flex h-screen w-screen flex-col items-center justify-center">
//       <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
//         <div className="flex flex-col space-y-2 text-center">
//           <Icons.logo className="mx-auto h-6 w-6" />
//           <h1 className="text-2xl font-semibold tracking-tight">
//             Welcome back
//           </h1>
//           <p className="text-sm text-muted-foreground">
//             Enter your email to sign in to your account
//           </p>
//         </div>
//         <div className={cn("grid gap-6")}>
//           <form onSubmit={onSubmit}>
//             <div className="grid gap-2">
//               <div className="grid gap-1">
//                 <Label className="sr-only" htmlFor="email">
//                   Email
//                 </Label>
//                 <Input
//                   id="email"
//                   placeholder="name@example.com"
//                   type="email"
//                   autoCapitalize="none"
//                   autoComplete="email"
//                   autoCorrect="off"
//                   disabled={isLoading}
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//               </div>
//               <div className="grid gap-1">
//                 <Label className="sr-only" htmlFor="password">
//                   Password
//                 </Label>
//                 <Input
//                   id="password"
//                   placeholder="Password"
//                   type="password"
//                   autoCapitalize="none"
//                   autoComplete="current-password"
//                   autoCorrect="off"
//                   disabled={isLoading}
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                 />
//               </div>
//               <Button disabled={isLoading}>
//                 {isLoading && (
//                   <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
//                 )}
//                 Sign In
//               </Button>
//             </div>
//           </form>
//         </div>
//         <p className="px-8 text-center text-sm text-muted-foreground">
//           <Link
//             href="/signup"
//             className="hover:text-brand underline underline-offset-4"
//           >
//             Don&apos;t have an account? Sign Up
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// LoginPage.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import { useUser } from "@/components/UserContext"; // Import the UserContext

interface User {
  email: string;
  username: string; // Adjust according to your actual user structure
}

export default function LoginPage() {
  const { setUser } = useUser(); // Get setUser from context
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Error logging in:", error.message);
      setIsLoading(false);
    } else {
      // Fetch user details from your local JSON database
      const users: User[] = await fetch(`http://localhost:5500/users`).then(
        (res) => res.json(),
      );
      const userData = users.find((user: User) => user.email === email);

      if (userData) {
        setUser(userData); // Set user data in context
        localStorage.setItem("user", JSON.stringify(userData)); // Optional: Store in localStorage
        router.push("/"); // Redirect to home page after successful login
      } else {
        console.error("User data not found");
      }
    }
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Icons.logo className="mx-auto h-6 w-6" />
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your email to sign in to your account
          </p>
        </div>
        <div className={cn("grid gap-6")}>
          <form onSubmit={onSubmit}>
            <div className="grid gap-2">
              <div className="grid gap-1">
                <Label className="sr-only" htmlFor="email">
                  Email
                </Label>
                <Input
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  disabled={isLoading}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-1">
                <Label className="sr-only" htmlFor="password">
                  Password
                </Label>
                <Input
                  id="password"
                  placeholder="password"
                  type="password"
                  autoComplete="current-password"
                  disabled={isLoading}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? "Loading..." : "Sign In"}
            </Button>
          </form>
          <p className="px-8 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-sm underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
