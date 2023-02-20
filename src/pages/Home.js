import React from "react";
import Sidebar from "../components/Sidebar";
import { auth } from "../firebase-config";
import { signOut } from "firebase/auth";
function Home() {
  return (
    <div
      style={{
        backgroundColor: "#101010",
        width: "100vw",
        height: "100vh",
      }}>
      <Sidebar />
      <button
        onClick={() => {
          signOut(auth);
          localStorage.removeItem("auth-token");
        }}>
        Sign out
      </button>
    </div>
  );
}

export default Home;
