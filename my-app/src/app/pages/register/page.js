import { register } from "module";
import Link from "next/link";
import "./register.css";

export default function RegistrationPage() {
  return (
    <>
      <h1> Create Account </h1>
      <form action="/api/auth/register" method="POST">
        <label htmlFor="email">Email Address</label>
        <input name="email" type="email"></input>
        <label htmlFor="password">Password</label>
        <input name="password" type="password"></input>

        <label htmlFor="fname">Email Address</label>
        <input name="fnam" type="text"></input>
        <label htmlFor="lname">Password</label>
        <input name="lname" type="text"></input>

        <button type="submit">Create Account</button>
      </form>
      <label htmlFor="loginButton">Already have an account?</label>
      <Link href="/pages/login">
        <button id="loginButton"> Log In</button>
      </Link>
    </>
  );
}
