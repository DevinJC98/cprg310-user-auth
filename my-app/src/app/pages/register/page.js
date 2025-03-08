import Link from "next/link";

export default function RegistrationPage() {
  return (
    <>
      <h1> Create Account </h1>
      <form action="/api/auth/register" method="POST">
        <label htmlFor="email">Email Address</label>
        <input name="email" type="email"></input>
        <label htmlFor="password">Password</label>
        <input name="password" type="password"></input>
        <button type="submit">Create Account</button>
      </form>
      <label htmlFor="loginButton">Already have an account?</label>
      <Link href="/pages/login">
        <button id="loginButton"> Log In</button>
      </Link>
    </>
  );
}
