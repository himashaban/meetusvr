"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "../login.css";
import Image from "next/image";
import passwordimg from "../images/password.png";
import emailimg from "../images/sms.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [generalError, setGeneralError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    setEmailError("");
    setGeneralError("");

    if (!email || !password) {
      setGeneralError("Email and password are required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email format.");
      return;
    }

    try {
      const loginResponse = await fetch(
        "https://api-yeshtery.dev.meetusvr.com/v1/yeshtery/token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password, isEmployee: true }),
        }
      );

      if (loginResponse.status !== 200) {
        throw new Error("Invalid credentials");
      }

      const { token } = await loginResponse.json();

      const userInfoResponse = await fetch(
        "https://api-yeshtery.dev.meetusvr.com/v1/user/info",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (userInfoResponse.status !== 200) {
        throw new Error("Failed to fetch user info");
      }

      const { id, name } = await userInfoResponse.json();

      ////////////////////////////////////// Redirect to the dashboard page ////////////////////////////////////////////////
      router.push(
        `/dashboard?name=${encodeURIComponent(name)}&id=${encodeURIComponent(
          id
        )}`
      );
    } catch (err) {
      setGeneralError(err.message || "Something went wrong");
    }
  };

  return (
    <main className="login-container">
      <div
        className="mainLogin"
        style={{
          padding: "20px",
          maxWidth: "470px",
          margin: "auto",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <div>
          <label
            className="mainLabel"
            style={{ fontSize: "56px", fontWeight: "bold" }}
          >
            Welcome back
          </label>
          <p style={{ fontSize: "20px", marginTop: "8px" }}>
            Step into our shopping metaverse for an unforgettable shopping
            experience
          </p>
          <div style={{ marginTop: "36px" }} className="input-wrapper">
            <Image
              src={emailimg}
              width={20}
              height={20}
              alt="icon"
              className="input-icon"
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
              }}
            />
          </div>
          {emailError && <p style={{ color: "red" }}>{emailError}</p>}
          <div style={{ marginTop: "20px" }} className="input-wrapper">
            <Image
              src={passwordimg}
              width={20}
              height={20}
              alt="icon"
              className="input-icon"
            />
            <input
              className="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {/*///////////////////////////////////////////////////////////////general erorr //////////////////////////////////////////////////////////*/}
          {generalError && (
            <p style={{ color: "red", margin: "0" }}>{generalError}</p>
          )}
          <button
            onClick={handleLogin}
            style={{
              padding: "12px 18px",
              height: "43px",
              background: "#9414ff",
              width: "381px",
              alignSelf: "stretch",
              alignItems: "center",
              gap: "4px",
              marginLeft: "0",
              borderRadius: "8px",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              marginBottom: "36px",
              marginTop: "36px",
            }}
            disabled={!email || !password}
          >
            Login
          </button>
          <br />
          <span
            style={{
              color: "#62626b",
              fontSize: "14px",
              textAlign: "center",
            }}
          >
            Don't have an account? Sign up
          </span>
        </div>
      </div>
    </main>
  );
}