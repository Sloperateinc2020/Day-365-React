import React, { useState, useEffect } from "react";
import { FaGoogle, FaFacebook, FaApple, FaEye, FaEyeSlash } from "react-icons/fa";
import { IoLogoOctocat } from "react-icons/io";
import { useNavigate } from "react-router-dom";

import Footer from "./Footer";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate(); // React Router hook for navigation


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSignIn = (e) => {
    e.preventDefault();
    console.log("Sign-in attempted with:", { email, password });
  };

// Mobile version
if (isMobile) {
  return (
    <div className="mobile-signup-container md:hidden" style={{ overflowX: 'hidden', position: 'relative' }}>
    <div
      className="min-h-screen bg-white flex flex-col justify-center px-6"
      style={{
        minHeight: "100px", // Full height of viewport
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "60px", // Space around the container
        backgroundColor: "#f9f9f9",
        overflow: "hidden", // Prevent scrolling
        boxSizing: "border-box", // Include padding in element's total width/height
        marginRight:'-90px',
        marginLeft:'-90px',
        marginTop:'-95px',
        

      }}
    >
      <div
        style={{
          width: "100%", // Full width on mobile
          maxWidth: "530px", // Max width for content
          background: "white",
          borderRadius: "10px",
          padding: "20px",
        }}
      >
        <h1
          style={{
            fontSize: "35px",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          Sign in
        </h1>

        {/* Social Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          <button
            style={{
              backgroundColor: "#DB4437",
              border: "none",
              borderRadius: "50%",
              width: "50px",
              height: "50px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <FaGoogle style={{ color: "white", fontSize: "20px" }} />
          </button>
          <button
            style={{
              backgroundColor: "#1877F2",
              border: "none",
              borderRadius: "50%",
              width: "50px",
              height: "50px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <FaFacebook style={{ color: "white", fontSize: "20px" }} />
          </button>
          <button
            style={{
              backgroundColor: "#000000",
              border: "none",
              borderRadius: "50%",
              width: "50px",
              height: "50px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <FaApple style={{ color: "white", fontSize: "20px" }} />
          </button>
        </div>

        <div
          style={{
            textAlign: "center",
            marginBottom: "15px",
            fontSize: "14px",
            color: "#888",
          }}
        >
          OR
        </div>

        {/* Sign-In Form */}
        <form onSubmit={handleSignIn}>
          <div style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
              }}
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email or mobile"
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            />
          </div>

          <div style={{ marginBottom: "15px", position: "relative" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
              }}
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                top: "70%",
                right: "10px",
                transform: "translateY(-50%)",
                cursor: "pointer",
              }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <label style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <input type="checkbox" /> Remember me
            </label>
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#6A5ACD",
              color: "white",
              border: "none",
              borderRadius: "5px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Sign in
          </button>

          <a
            href="#"
            style={{
              color: "#6A5ACD",
              textDecoration: "none",
              display: "block",
              textAlign: "center",
              marginTop: "10px",
            }}
          >
            Forgot password?
          </a>

          <div
            style={{
              textAlign: "center",
              marginTop: "50px",
              fontSize: "14px",
            }}
          >
            Don't have an account?{" "}
            <a
              href="#"
              style={{ color: "#6A5ACD", textDecoration: "none" }}
              onClick={() => navigateToSignUp()}
            >
              Sign up
            </a>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
}

function navigateToSignUp() {
  window.location.href = "/signup"; // Adjust the path to your signup page
}

  // Desktop version
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#f9f9f9",
        overflowX: "hidden",
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "70px",
            left: "10px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <IoLogoOctocat
            size={30}
            style={{ color: "#6A5ACD", marginRight: "8px" }}
          />
          <span
            style={{ fontSize: "20px", fontWeight: "bold", color: "#333" }}
          >
            Day 365
          </span>
        </div>

        <a
          href="#"
          style={{
            position: "absolute",
            top: "80px",
            right: "10px",
            color: "black",
            fontSize: "14px",
            textDecoration: "none",
          }}
        >
          Don't have an account?{' '}
          <span style={{ color: "#6A5ACD" }}>Register Now</span>
        </a>

        <div
          style={{
            marginTop: "140px",
            maxWidth: "500px",
            width: "100%",
            backgroundColor: "#fff",
            padding: "40px",
            borderRadius: "8px",
            margin: "20px 0",
            position: "relative",
          }}
        >
          <h1
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              textAlign: "center",
              color: "#333",
              marginBottom: "5px",
            }}
          >
            Welcome back
          </h1>
          <p
            style={{
              textAlign: "center",
              color: "#666",
              marginBottom: "5px",
              fontSize: "12px",
            }}
          >
            Enter your details to sign in to your account.
          </p>

          <form
            onSubmit={handleSignIn}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              marginTop: "50px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
              <label style={{ color: "#333", fontWeight: "500" }}>
                Email or Mobile Number
              </label>
              <input
                type="text"
                placeholder="Mobile number or email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  padding: "12px",
                  fontSize: "12px",
                  borderRadius: "20px",
                  border: "1px solid #ddd",
                  outline: "none",
                  color: "#333",
                  backgroundColor: "#f9f9f9",
                }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1px", position: "relative" }}>
              <label style={{ color: "#333", fontWeight: "500" }}>Password</label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  padding: "12px",
                  fontSize: "12px",
                  borderRadius: "20px",
                  border: "1px solid #ddd",
                  outline: "none",
                  color: "#333",
                  backgroundColor: "#f9f9f9",
                }}
              />
             
            </div>

            <a
              href="#"
              style={{
                color: "#6A5ACD",
                textAlign: "left",
                fontSize: "14px",
                textDecoration: "none",
              }}
            >
              Forgot Password?
            </a>

            <button
              type="submit"
              style={{
                padding: "12px",
                fontSize: "16px",
                borderRadius: "20px",
                backgroundColor: "#6A5ACD",
                color: "#fff",
                border: "none",
                cursor: "pointer",
              }}
            >
              Continue
            </button>
          </form>

          <div
            style={{ display: "flex", alignItems: "center", margin: "20px 0" }}
          >
            <hr
              style={{
                flex: 1,
                border: "none",
                height: "1px",
                backgroundColor: "#ddd",
              }}
            />
            <span style={{ margin: "0 10px", color: "#999" }}>
              Or Sign in with
            </span>
            <hr
              style={{
                flex: 1,
                border: "none",
                height: "1px",
                backgroundColor: "#ddd",
              }}
            />
          </div>

          <div
            style={{ display: "flex", justifyContent: "center", gap: "10px" }}
          >
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                padding: "10px 20px",
                border: "1px solid black",
                borderRadius: "20px",
                backgroundColor: "#fff",
                cursor: "pointer",
              }}
            >
              <FaGoogle /> Google
            </button>
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                padding: "10px 20px",
                border: "1px solid black",
                borderRadius: "20px",
                backgroundColor: "#fff",
                cursor: "pointer",
              }}
            >
              <FaApple /> Apple
            </button>
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                padding: "10px 20px",
                border: "1px solid black",
                borderRadius: "20px",
                backgroundColor: "#fff",
                cursor: "pointer",
              }} 
            >
              <FaFacebook /> Facebook
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default SignIn;
