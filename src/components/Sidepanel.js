import React, { useContext } from "react";
import List from "@mui/material/List";
import { BsPlusLg } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
// import { RxHamburgerMenu } from "react-icons/rx";
import ListItemText from "@mui/material/ListItemText";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import CssBaseline from "@mui/material/CssBaseline";
import AppContext from "../Contexts/AppContexts";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useHistory } from "react-router-dom";

function Sidepanel(props) {
  const history = useHistory();
  const dm = [
    {
      name: "Vedant",
      rid: "0x3MuJK7zZdUgNBZh4O1IotGjWg1",
      uid: "0x3MuJK7zZdUgNBZh4O1IotGjWg1",
    },
    {
      name: "Raghav",
      rid: "0x3MuJK7zZdUgNBZh4O1IotGjWg1",
      uid: "ITl6ZLl1dNbgVQv9p6wXhCtHJ152",
    },
    {
      name: "Lalit",
      rid: "hifiuw938732687",
      uid: "hifiuw938732687",
    },
    {
      name: "Kavya",
      rid: "hfsjehfohoho03942u",
      uid: "hfsjehfohoho03942u",
    },
  ];
  const channel = ["Study Resources", "Ads", "CSGO", "Fortnight"];
  const context = useContext(AppContext);
  const { user } = context;
  return (
    <>
      <div
        style={{
          width: "250px",
          height: "100vh",
          backgroundColor: "#141414",
        }}>
        <AiOutlineClose
          style={{ float: "right", display: props.show ? "none" : "block" }}
          onClick={() => {
            props.setShow(false);
          }}
        />
        <div
          className="header d-flex my-1 px-2 align-items-center"
          style={{ height: "15vh" }}>
          <div style={{ width: "30%" }}>
            <img
              src={`https://api.dicebear.com/5.x/pixel-art/svg?seed=${user?.email}&size=48`}
              alt=""
            />
          </div>
          <div>
            <h3 className="mont m-0">Hi, {user?.displayName}</h3>
            <span className="m-0" style={{ fontSize: "0.7rem" }}>
              My Profile{" >"}
            </span>
          </div>
        </div>
        <div
          className="mont d-flex px-3 purple align-items-center justify-content-between"
          style={{ height: "5vh" }}>
          <h4 className="m-0 purple">Messages</h4>
          <Button variant="contained" size="small">
            <BsPlusLg />
          </Button>
        </div>
        <Scrollbars
          className="d-flex justify-content-center flex-column"
          style={{ height: "30vh" }}>
          <List className="d-flex justify-content-center flex-column">
            {dm.map((person, index) => (
              <ListItem key={person.name} disablePadding>
                <ListItemButton>
                  <ListItemText
                    primary={person.name}
                    onClick={() => {
                      history.push(`/chat/${person.rid}`);
                      window.location.reload(false);
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Scrollbars>
        <hr className="my-3 mx-auto" style={{ width: "85%" }} />
        <div
          className="mont d-flex px-3 purple align-items-center justify-content-between"
          style={{ height: "5vh" }}>
          <h4 className="m-0 purple">Channels</h4>
          <Button variant="contained" size="small">
            <BsPlusLg />
          </Button>
        </div>
        <Scrollbars style={{ height: "30vh" }}>
          <List>
            {channel.map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Scrollbars>
      </div>
    </>
  );
}

export default Sidepanel;
