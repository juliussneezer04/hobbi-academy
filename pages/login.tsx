import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  console.log(router.query)
  const { user } = router.query;
  return (
    <>
    </>
  );
}
