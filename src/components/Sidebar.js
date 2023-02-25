import React, { useState, Fragment, useContext } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import { BsPlusLg } from "react-icons/bs";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import { RxHamburgerMenu } from "react-icons/rx";
import ListItemText from "@mui/material/ListItemText";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import AppContext from "../Contexts/AppContexts";
import { Scrollbars } from "react-custom-scrollbars";
import { useHistory } from "react-router-dom";
// import { IconButton } from "@mui/material";
const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

function Sidebar() {
  const history = useHistory();
  const dm = [
    {
      name: "Vedant",
      rid: "0x3MuJK7zZdUgNBZh4O1IotGjWg1",
    },
    {
      name: "Raghav",
      rid: "0x3MuJK7zZdUgNBZh4O1IotGjWg1",
    },
    {
      name: "Lalit",
      rid: "0x3MuJK7zZdUgNBZh4O1IotGjWg1",
    },
    {
      name: "Kavya",
      rid: "0x3MuJK7zZdUgNBZh4O1IotGjWg1",
    },
  ];
  const people = ["Vedant", "Raghav", "Kavya", "Lalit"];
  const channel = ["Study Resources", "Ads", "CSGO", "Fortnight"];
  const context = useContext(AppContext);
  const { user } = context;
  const [open, setOpen] = useState(true);
  const toggleDrawer = (value) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(value);
  };
  const list = () => (
    <Box
      sx={{
        width: "250px",
        backgroundColor: "#141414!important",
        height: "100vh",
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}>
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
        <h4 className="m-0">Messages</h4>
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
                    history.push(`/chat/${user.rid}`);
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
        <h4 className="m-0">Channels</h4>
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
    </Box>
  );
  return (
    <>
      <Fragment>
        <RxHamburgerMenu
          style={{ color: "white", fontSize: "2rem" }}
          className="m-4"
          onClick={toggleDrawer(true)}
        />
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Drawer
            anchor="left"
            open={open}
            onClose={window.innerWidth < 750 ? toggleDrawer(false) : undefined}>
            {list()}
          </Drawer>
        </ThemeProvider>
      </Fragment>
    </>
  );
}

export default Sidebar;
