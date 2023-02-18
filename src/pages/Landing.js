import React, { useEffect } from "react";
//import { Button } from "@mui/material";
import { Link, useHistory } from "react-router-dom";

//TODO: Make the design responsive, right now it is not at all responsive.

function Landing() {
  const history = useHistory();
  useEffect(() => {
    if (localStorage.getItem("auth-token")) history.push("/home");
  }, []);

  return (
    <>
      <div className="bg"></div>
      <div className="name-container d-flex flex-column justify-content-center p-3">
        <h1 className="mont title">CONNEXION</h1>
        <p className=" mont white my-4">
          Join thousands of other peers using Connexion and find the latest
          news, activities and updates. Share your thoughts, seek guidance or
          ask questions, everything is possible on Connexion. Join us today to
          become part of a vibrant and supportive college community.
        </p>
        <div className="button-group d-flex my-2">
          {/* <Link to="/signup" style={{ width: "30%", textDecoration: "none" }}>
            <Button variant="outlined" className="m-2">
              Sign Up
            </Button>
          </Link> */}
          <Link
            to="/signup"
            className="mx-2"
            style={{ textDecoration: "none" }}>
            <button
              type="button"
              className="btn btn-sm btn-outline-primary py-0"
              style={{ height: "30px" }}>
              Sign Up
            </button>
          </Link>
          <Link
            to="/signin"
            className="mx-2"
            style={{ textDecoration: "none" }}>
            <button
              type="button"
              className="btn btn-sm btn-outline-primary py-0"
              style={{ height: "30px" }}>
              Sign In
            </button>
          </Link>
          {/* <Button
            variant="outlined"
            className="my-2"
            style={{ width: "30%" }}
            size="small"
            onClick={() => {
              alert("clicked");
            }}>
            Sign In
          </Button> */}
        </div>
      </div>
    </>
  );
}

export default Landing;
