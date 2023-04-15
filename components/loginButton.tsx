import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

interface LoginButtonProps {
  className: string;
  text?: string;
}

const LoginButton = (props: LoginButtonProps) => {
  const { loginWithRedirect } = useAuth0();
  const { className, text } = props;

  return <button className={className} onClick={() => loginWithRedirect()}>{text || "Log In"}</button>;
};

export default LoginButton;
