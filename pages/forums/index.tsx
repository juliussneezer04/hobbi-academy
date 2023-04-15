import AuthWrapper from "@/components/auth";
import DefaultLayout from "@/components/defaultLayout";
import React from "react";

export default function Forums() {
  return (
    <AuthWrapper>
      <DefaultLayout>
        <div>
          <h1>Forums</h1>
        </div>
      </DefaultLayout>
    </AuthWrapper>
  );
}
