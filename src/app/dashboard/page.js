"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "./dashboard.css";

export default function Dashboard() {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Fetching query params for name and id
    const query = new URLSearchParams(window.location.search);
    setName(query.get("name"));
    setId(query.get("id"));
  }, [setTimeout]);

  // Logout handler
  const handleLogout = () => {
    // Optionally clear user-related data (e.g., localStorage, cookies)
    // localStorage.clear(); // Uncomment this if you're using localStorage

    // Redirect to the login page
    router.push("/");
  };

  return (
    <div className="w-full">
      <div className="dashboard-container">
        <header className="dashboard-header">
          <h1>Dashboard</h1>
          <p>
            Welcome, <span className="dashboard-username">back {name}</span>!
          </p>
          {/* Logout Button */}
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </header>

        <main className="dashboard-main">
          <div className="dashboard-card">
            <h2>User Details</h2>
            {name && (
              <p>
                <strong>Name:</strong> {name}
              </p>
            )}
            {id && (
              <p>
                <strong>ID:</strong> {id}
              </p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
