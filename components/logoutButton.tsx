import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

interface LogoutButtonProps {
  className: string;
}

export default function LogoutButton(props: LogoutButtonProps) {
  const { logout } = useAuth0();
  return <button className={props.className} onClick={() => logout({
    logoutParams: {
      returnTo: process.env.NEXT_PUBLIC_AUTH0_HOME_URI ?? "http://localhost:3000/",
    },
  })}>Log Out</button>;
}
