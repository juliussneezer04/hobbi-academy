import { isUserSignedIn } from "@/lib/firebase";
import { useRouter } from "next/router";
import React, { useEffect } from "react"

export default function AuthWrapper (props: {children: React.ReactNode }) {
  const router = useRouter();
  useEffect(() => {
    if (!isUserSignedIn()) {
      router.push("/");
    }
  }, [router])
  return (
    <>
      {props.children}
    </>
  )
}