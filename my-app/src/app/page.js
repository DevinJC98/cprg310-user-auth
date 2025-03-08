import Link from "next/link";

export default function Home() {
  return (
    <>
      <Link href="pages/login">
        <button>Log In</button>
      </Link>
      <Link href="pages/register">
        <button>Sign Up</button>
      </Link>
    </>
  );
}
