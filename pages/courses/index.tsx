import React from "react"
import AuthWrapper from "../../components/auth"
import DefaultLayout from "../../components/defaultLayout"

export default function Courses() {
  return (
    <AuthWrapper>
      <DefaultLayout>
        <div>
          <h1>Courses</h1>
        </div>
      </DefaultLayout>
    </AuthWrapper>
  )
}
