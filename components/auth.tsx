import { useAuth0 } from "@auth0/auth0-react"
import { useRouter } from "next/router";
import React, { useEffect } from "react"

export default function AuthWrapper (props: {children: React.ReactNode }) {
  const { isAuthenticated } = useAuth0()
  const router = useRouter();
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router])
  return (
    <>
      {props.children}
    </>
  )
}