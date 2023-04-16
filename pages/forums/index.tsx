import DefaultLayout from "@/components/defaultLayout";
import Loading from "@/components/loading";
import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

export default function Forums() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  if (isLoading) {
    return <Loading />;
  }
  return (
    <DefaultLayout>
      <div>
        <h1>Forums</h1>
      </div>
    </DefaultLayout>
  );
}
