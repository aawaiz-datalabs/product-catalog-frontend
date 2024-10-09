import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-20">
      <div className="flex items-center justify-evenly border-t">
        <div className="flex gap-4 py-4">
          <h3 className="text-center text-lg font-semibold">Follow Us </h3>
          <div className="flex items-center space-x-4">
            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
              <Link
                key={index}
                href="#"
                className="text-muted-foreground hover:text-primary"
              >
                <Icon className="h-5 w-5" />
                <span className="sr-only">{Icon.name}</span>
              </Link>
            ))}
          </div>
        </div>
        <div className="py-4">
          <h6>
            Copyright © {new Date().getFullYear()} Wave | All rights reserved.
          </h6>
        </div>
      </div>
    </footer>
  );
}
