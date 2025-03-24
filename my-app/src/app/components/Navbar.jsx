"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
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
  const navlinksRef = useRef(null);
  const hamburgerbuttonRef = useRef(null);

  // at loading check session token in cookies
  useEffect(() => {
    const token = getCookie("directus_session_token");
    if (token) {
      setIsLoggedIn(true);
    }
    
    // Handle responsive navigation
    const handleResize = () => {
      
      if (navlinksRef.current && window.innerWidth > 1025) {
        navlinksRef.current.style.display = "grid";
      } else if (hamburgerbuttonRef.current && hamburgerbuttonRef.current.innerHTML === "=") {
        if (navlinksRef.current) navlinksRef.current.style.display = "none";
      }
    };

    // Add event listener
    window.addEventListener("resize", handleResize);
    

    // Cleanup event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Hamburger Menu Functionality
  const hamburger = () => {
    if (hamburgerbuttonRef.current && navlinksRef.current) {
      if (hamburgerbuttonRef.current.innerHTML === "=") {
        navlinksRef.current.style.display = "grid";
        hamburgerbuttonRef.current.innerHTML = "X";
      } else {
        navlinksRef.current.style.display = "none";
        hamburgerbuttonRef.current.innerHTML = "=";
      }
      hamburgerbuttonRef.current.classList.toggle("hamburgerclosed");
    }
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

      <ul className="nav-links" id="navlinks" ref={navlinksRef}>
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
      <button id="hamburgerbutton" onClick={hamburger} ref={hamburgerbuttonRef}>
        =
      </button>
    </nav>
  );
}