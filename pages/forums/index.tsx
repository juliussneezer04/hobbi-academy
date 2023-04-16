import DefaultLayout from "@/components/defaultLayout";
import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

export default function Forums() {
  const { user } = useAuth0();
  console.log(user);
  return (
    <DefaultLayout>
      <div>
        <h1>Forums</h1>
      </div>
    </DefaultLayout>
  );
}
