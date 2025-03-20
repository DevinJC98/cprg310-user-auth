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

  //Hamburger Menu Functionality
  const hamburger = () => {
    if (hamburgerbutton.innerHTML == "=") {
      navlinks.style.display = "grid";
      hamburgerbutton.innerHTML = "X";
      hamburgerbutton.style.backgroundColor = "initial";
      hamburgerbutton.style.border = "2px solid var(--teal)";
      hamburgerbutton.style.color = "black";
      burgerisopen = true;
    } else {
      navlinks.style.display = "none";
      hamburgerbutton.innerHTML = "=";
      hamburgerbutton.style.backgroundColor = "#008799ea";
      hamburgerbutton.style.border = "none";
      hamburgerbutton.style.color = "white";
      burgerisopen = false;
    }
  };

  let burgerisopen = false;

  window.addEventListener("resize", function () {
    if (screen.width > 1024) {
      navlinks.style.display = "grid";
    } else {
      hamburger();
    }
  });

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
          <Link href="/pages/dashboard">
            <button onClick={handleLogout} className="logout_btn">
              Log Out
            </button>
          </Link>
        ) : (
          <>
            <Link href="/pages/login">
              <button className="login_btn">Log In</button>
            </Link>
            <Link href="/pages/register">
              <button className="signup_btn">Sign Up</button>
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
