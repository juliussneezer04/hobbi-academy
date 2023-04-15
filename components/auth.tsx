import { Auth0Provider, useAuth0 } from "@auth0/auth0-react"
import { useRouter } from "next/router";
import React, { useEffect } from "react"

export default function AuthWrapper (props: {children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth0()
  const router = useRouter();
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, isLoading, router])
  return (
    <Auth0Provider
      domain={process.env.AUTH0_DOMAIN ?? ""}
      clientId={process.env.AUTH0_CLIENT_ID ?? ""}
      authorizationParams={{
        redirect_uri: process.env.AUTH0_REDIRECT_URI ?? "http://localhost:3000/dashboard",
      }}
    >
      {props.children}
    </Auth0Provider>
  )
}