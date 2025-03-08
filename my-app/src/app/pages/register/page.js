import Link from "next/link";

export default function RegistrationPage() {
  return (
    <>
      <h1> Create Account </h1>
      <form action="/api/auth/register" method="POST">
        <label htmlFor="em">Email Address</label>
        <input name="em" type="email"></input>
        <label htmlFor="pw">Password</label>
        <input name="pw" type="password"></input>
        <button type="submit">Create Account</button>
      </form>
      <label htmlFor="loginButton">Already have an account?</label>
      <Link href="/pages/login">
        <button id="loginButton"> Log In</button>
      </Link>
    </>
  );
}
