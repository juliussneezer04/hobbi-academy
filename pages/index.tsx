import React from "react";
import LoginButton from "@/components/loginButton";
import AuthWrapper from "@/components/auth";

// Landing Page
export default function Home() {
  return (
    <AuthWrapper>
      <div>
        <h1>Landing Page</h1>
        <LoginButton />
      </div>
    </AuthWrapper>
)
} 
