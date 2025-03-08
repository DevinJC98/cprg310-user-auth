import Link from "next/link";

export default function LoginPage() {
  return (
    <>
      <h1> Log In </h1>
      <form action="/api/auth/login" method="POST">
        <label htmlFor="email">Email Address</label>
        <input name="email" type="email"></input>
        <label htmlFor="password">Password</label>
        <input name="password" type="password"></input>
        <button type="submit">Log In</button>
        <label htmlFor="registerButton">Don't have an account?</label>
        <Link href="/pages/register">
          <button id="registerButton"> Register</button>
        </Link>
      </form>
    </>
  );
}
