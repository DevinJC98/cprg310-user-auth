"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import "../../styles/navbar.css";
import Image from "next/image";

// function of getting cookies
const getCookie = (name) => {
  if (typeof document !== "undefined") {
    const match = document.cookie.match(
      new RegExp("(^| )" + name + "=([^;]+)")
    );
    if (match) return match[2];
  }
  return null;
};

//Hamburger Menu Functionality
const hamburger = () => {
  if (hamburgerbutton.innerHTML == "=") {
    navlinks.style.display = "grid";
    hamburgerbutton.innerHTML = "X";
  } else {
    navlinks.style.display = "none";
    hamburgerbutton.innerHTML = "=";
  }
  hamburgerbutton.classList.toggle("hamburgerclosed");
};

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // at loading check session token in cookies
  useEffect(() => {
    const token = getCookie("directus_session_token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // logout function
  const handleLogout = () => {
    // clear session token in cookies
    document.cookie =
      "directus_session_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    setIsLoggedIn(false);
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo">
        <Link href="/">
          <Image
            src="/logo2.png"
            alt="Travel Blog Logo"
            width={180}
            height={50}
          />
        </Link>
      </div>

      <ul className="nav-links" id="navlinks">
        <li>
          <Link href="/pages/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link href="/pages/share">Shared Blogs</Link>
        </li>
        <li>
          <Link href="/pages/archive">Archives</Link>
        </li>
        <li>
          <Link href="/pages/about">About Us</Link>
        </li>
      </ul>

      <div className="header_buttons">
        {isLoggedIn ? (
          <Link
            href="/pages/dashboard"
            onClick={handleLogout}
            className="logout_btn"
          >
            Log Out
          </Link>
        ) : (
          <>
            <Link href="/pages/login" className="login_btn">
              Log In
            </Link>
            <Link href="/pages/register" className="signup_btn">
              Sign Up
            </Link>
          </>
        )}
      </div>
      <button id="hamburgerbutton" onClick={hamburger}>
        =
      </button>
    </nav>
  );
}

//if the screen is resized above the point where the navigation bar is hidden, this function is called to ensure the links are visible.
window.addEventListener("resize", function () {
  if (screen.width > 1025) {
    navlinks.style.display = "grid";
  } else if (hamburgerbutton.innerHTML == "=") {
    navlinks.style.display = "none";
  }
});
