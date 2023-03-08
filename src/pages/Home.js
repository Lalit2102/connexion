import React, { useState, useEffect } from "react";
// import Sidebar from "../components/Sidebar";
// import { auth } from "../firebase-config";
// import { signOut } from "firebase/auth";
import { RxHamburgerMenu } from "react-icons/rx";
import Sidepanel from "../components/Sidepanel";
function Home() {
  const [show, setShow] = useState(() => {
    if (window.innerWidth < 750) return false;
    return true;
  });
  useEffect(() => {
    if (window.innerWidth < 750) setShow(false);
    else setShow(true);
  }, []);

  return (
    <div
      className="d-flex"
      style={{
        backgroundColor: "#101010",
        // width: "100vw",
        height: "100vh",
      }}>
      <RxHamburgerMenu
        className="m-2"
        style={{
          display: !show ? "block" : "none",
          fontSize: "3rem",
          position: "absolute",
        }}
        onClick={() => {
          setShow(!show);
        }}
      />
      <div style={{ display: show ? "block" : "none" }}>
        <Sidepanel setShow={setShow} show={show} />
      </div>
      <div
        className="d-flex justify-content-center align-items-center flex-column"
        style={{ marginLeft: !show ? "0" : "250px" }}>
        <h5 className="mont">Welcome to </h5>
        <h1 className="mont display-1 purple">Connexion</h1>
        <h5 className="mont text-center">
          To get started, choose a chat or channel from the sidebar.
        </h5>
      </div>
      {/* <button
        onClick={() => {
          signOut(auth);
          localStorage.removeItem("auth-token");
        }}>
        Sign out
      </button> */}
    </div>
  );
}

export default Home;
