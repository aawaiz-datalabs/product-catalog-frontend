"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ModeToggle } from "./ModeToggle";
import Image from "next/image";
import {
  ShoppingCart,
  LogIn,
  UserPlus,
  LogOut,
  User,
  Mail,
  Phone,
  MapPin,
  Package,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Supabase } from "@/lib/supabaseClient"; // Ensure this exports your initialized supabase client
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { useUser } from "@/components/UserContext";
import { useAtom } from "jotai";
import { cartAtom } from "@/lib/atoms";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface User {
  id: string;
  user_name: string;
  email: string;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  city?: string;
  state?: string;
  country?: string;
  userType?: string;
}

export default function NavigationBar() {
  const { user, setUser } = useUser();
  const router = useRouter();
  const [cart] = useAtom(cartAtom);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Fetch session first
        const {
          data: { session },
          error: sessionError,
        } = await Supabase.auth.getSession();

        if (sessionError) {
          console.error("Error fetching session:", sessionError);
          return;
        }

        if (session) {
          const { user: supabaseUser } = session;

          const { email } = supabaseUser;

          if (email) {
            const { data, error: fetchError } = await Supabase.from("profiles") // Ensure the table name is correct
              .select("*")
              .eq("email", email)
              .single();

            if (fetchError) throw fetchError;

            if (data) {
              const userData: User = {
                id: data.id,
                user_name: data.user_name,
                email: data.email,
                first_name: data.firstname,
                last_name: data.lastname,
                phone_number: data.number,
                city: data.city,
                state: data.state,
                country: data.country,
                userType: data.userType,
              };
              setUser(userData);
              localStorage.setItem("user", JSON.stringify(userData));
            } else {
              throw new Error("User data not found");
            }
          }
        } else {
          const storedUser = localStorage.getItem("user");
          if (storedUser) {
            setUser(JSON.parse(storedUser));
          }
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to load user data");
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();
  }, [setUser]);

  const handleLogout = async () => {
    await Supabase.auth.signOut();
    localStorage.removeItem("user");
    setUser(null);
    router.push("/login");
  };

  const renderUserInfo = () => {
    if (isLoading) {
      return <p>Loading user information...</p>;
    }

    if (error) {
      return <p className="text-red-500">{error}</p>;
    }

    if (!user) {
      return <p>No user information available</p>;
    }

    return (
      <>
        <div className="mb-4 flex items-center space-x-4">
          <User className="h-12 w-12 text-gray-400" />
          <div>
            <p className="font-semibold">{user.user_name}</p>
            <p className="text-sm text-gray-500">
              {user.first_name} {user.last_name}
            </p>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center">
            <Mail className="mr-2 h-4 w-4 text-gray-400" />
            <p className="text-sm">{user.email}</p>
          </div>
          {user.phone_number && (
            <div className="flex items-center">
              <Phone className="mr-2 h-4 w-4 text-gray-400" />
              <p className="text-sm">{user.phone_number}</p>
            </div>
          )}
          {(user.city || user.state || user.country) && (
            <div className="flex items-center">
              <MapPin className="mr-2 h-4 w-4 text-gray-400" />
              <p className="text-sm">
                {[user.city, user.state, user.country]
                  .filter(Boolean)
                  .join(", ")}
              </p>
            </div>
          )}
          <Link href="/user-orders" className="flex items-center">
            <Package className="mr-2 h-4 w-4 text-gray-400" />
            <p className="text-sm">My Orders</p>
          </Link>
        </div>
        <Button
          onClick={handleLogout}
          variant="outline"
          size="sm"
          className="mt-4 w-full"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign out
        </Button>
        {user.userType === "Admin" && (
          <Button
            onClick={() => router.push("/admin/admin-panel")}
            variant="outline"
            size="sm"
            className="mt-2 w-full"
          >
            <Settings className="mr-2 h-4 w-4" />
            Admin Panel
          </Button>
        )}
      </>
    );
  };

  return (
    <div className="flex items-center justify-between px-6 py-4">
      <div>
        <Link href="/">
          <Image
            src="/images/logo/logo-70.png"
            alt="Wave"
            width={50}
            height={50}
            className="hidden dark:block"
          />
          <Image
            src="/images/logo/Black logo-70.png"
            alt="Wave"
            width={50}
            height={50}
            className="dark:hidden"
          />
        </Link>
      </div>
      <div>
        <NavigationMenu>
          <NavigationMenuList className="gap-6">
            <NavigationMenuItem>
              <Link href="/#home" legacyBehavior passHref>
                <NavigationMenuLink>Home</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/#about" legacyBehavior passHref>
                <NavigationMenuLink>About Us</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/#range" legacyBehavior passHref>
                <NavigationMenuLink>Our Product Range</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/#contact" legacyBehavior passHref>
                <NavigationMenuLink>Contact Us</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/products" legacyBehavior passHref>
                <NavigationMenuLink>Products</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="flex items-center space-x-4">
        {user ? (
          <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="p-0">
                <span className="text-sm">Hey, {user.user_name}</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <Card>
                <CardHeader>
                  <CardTitle>User Information</CardTitle>
                  <CardDescription>Your account details</CardDescription>
                </CardHeader>
                <CardContent>{renderUserInfo()}</CardContent>
              </Card>
            </PopoverContent>
          </Popover>
        ) : (
          <>
            <Link href="/login">
              <LogIn className="h-6 w-6" />
            </Link>
            <Link href="/signup">
              <UserPlus className="h-6 w-6" />
            </Link>
          </>
        )}
        <Link href="/cart" className="relative">
          <ShoppingCart className="h-6 w-6" />
          {cart.length > 0 && (
            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
              {cart.length}
            </span>
          )}
        </Link>
        <ModeToggle />
      </div>
    </div>
  );
}
