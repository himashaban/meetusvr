"use client";

import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import "./dashboard.css";

export default function Dashboard() {
  const router = useRouter();
  const { name, id } = useSelector((state) => state.user);

  // Logout handler
  const handleLogout = () => {
    // Optionally clear Redux state or cookies if needed
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
