import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "@/components/loginButton";
import Loading from "@/components/loading";

// Landing Page
export default function Home() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);
  return (
    <div>
      <h1>Landing Page</h1>
      <LoginButton />
    </div>
)
} 
