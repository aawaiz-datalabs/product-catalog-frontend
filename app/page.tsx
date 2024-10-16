"use client";

import { useEffect } from "react";
import Container from "@/components/container";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Range from "@/components/Range";
import ContactForm from "@/components/ContactForm";
import { useAuth } from "@/hooks/useAuth";

function Home() {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      console.log(user ? "User logged in:" : "User not logged in", user);
    }
  }, [user, loading]);

  if (loading) {
    return (
      <Container>
        <div className="flex min-h-screen items-center justify-center">
          <p>Loading...</p>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <Hero />
      <About />
      <Range />
      {user ? (
        <ContactForm />
      ) : (
        <div className="py-8 text-center">
          <p>Please log in to access the contact form.</p>
        </div>
      )}
    </Container>
  );
}

export default Home;
