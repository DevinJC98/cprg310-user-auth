import Link from "next/link";

export default function Home() {
  return (
    <>
      <div
        style={{
          position: "absolute",
          top: "60px",
          right: "120px",
          display: "flex",
          gap: "20px",
        }}
      >
        <Link href="pages/login">
          <button className="login_btn">Log In</button>
        </Link>
        <Link href="pages/register">
          <button className="signup_btn">Sign Up</button>
        </Link>
      </div>
      <p className="welcome_text">Welcome to our blog world! </p>
    </>
  );
}
