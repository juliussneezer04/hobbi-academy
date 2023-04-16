import { useLocalStorage } from "@/lib/hooks/useUser";
import { useRouter } from "next/router";
import React, { useEffect } from "react"

export default function AuthWrapper (props: {children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useLocalStorage("user", null);
  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [router, user])
  return (
    <>
      {props.children}
    </>
  )
}