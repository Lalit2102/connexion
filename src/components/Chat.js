import React, { useState, useEffect, useContext, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import Sidepanel from "../components/Sidepanel";
import dayjs from "dayjs";
import {
  query,
  collection,
  where,
  getDocs,
  orderBy,
  addDoc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db, auth } from "../firebase-config.js";
import AppContext from "../Contexts/AppContexts.js";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { IoMdSend } from "react-icons/io";
import { useForm } from "react-hook-form";
import Scrollbars from "react-custom-scrollbars-2";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

//TODO: Responsive Chat UI
function Chat() {
  const newMesRef = useRef(null);
  const { rid } = useParams();
  const history = useHistory();
  const usersRef = collection(db, "users");
  const { register, reset, handleSubmit } = useForm();
  const messagesRef = collection(db, "messages");
  const [show, setShow] = useState(() => {
    if (window.innerWidth < 750) return false;
    return true;
  });
  const dm = [
    {
      name: "Vedant",
      rid: "0x3MuJK7zZdUgNBZh4O1IotGjWg1",
      uid: "0x3MuJK7zZdUgNBZh4O1IotGjWg1",
    },
    {
      name: "Raghav",
      rid: "fsjhsjfhlsjkhvp9uu3e09",
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
  const AppContexts = useContext(AppContext);
  const { showSpinner } = AppContexts;
  const [temp, setTemp] = useState({});
  const [user, setUser] = useState({});
  const [message, setMessage] = useState([]);
  const getData = async (temp) => {
    const q = query(usersRef, where("uid", "==", temp?.uid));
    const q1 = await getDocs(q);
    q1.forEach((doc) => {
      setUser(doc.data());
    });
  };
  React.state = {
    mounted: false,
  };
  // useEffect(() => {
  //   // console.log(message);
  //   if (newMesRef) {

  //     // console.log("test");
  //   }
  // }, [message]);

  useEffect(() => {
    const room = query(
      messagesRef,
      where("rid", "==", rid),
      orderBy("createdAt")
    );
    const unsub = onSnapshot(room, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      if (
        message.length > 0 &&
        messages.length > 0 &&
        JSON.stringify(message) !== JSON.stringify(messages)
      ) {
        console.log("message", message);
        console.log("messages", messages);
        newMesRef.current?.scrollToBottom();
      }
      setMessage(messages);
      return () => unsub();
    });
  });

  useEffect(() => {
    if (window.innerWidth < 750) setShow(false);
    else setShow(true);

    if (Object.keys(temp).length !== 0) {
      showSpinner(true);
      getData(temp);
      showSpinner(false);
    } else {
      for (let index = 0; index < dm.length; index++) {
        const roomid = dm[index].rid;
        if (rid === roomid) setTemp(dm[index]);
      }
    }

    return () => {};
  }, [temp, history.location.pathname]);

  const sendMessage = async (data) => {
    if (data.text === "") return;
    try {
      await addDoc(messagesRef, {
        text: data.text,
        createdAt: serverTimestamp(),
        user: auth.currentUser.displayName,
        sendermail: auth.currentUser.email,
        rid,
      });
      reset({ text: null });
    } catch (e) {
      console.log(e);
    }
  };
  // useEffect(() => {
  //   newMesRef.current?.scrollToBottom();
  // });

  return (
    <>
      <div
        className="d-flex"
        style={{
          backgroundColor: "#101010",
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
          className="chatui w-100"
          style={{
            height: "100vh",
            display: "flex",
            flexFlow: "column",
            width: "100vw",
          }}>
          <div
            className="cheat-header d-flex align-items-center px-4"
            style={{
              width: "100%",
              flex: "0 1 75px",
              backgroundColor: "#202020",
            }}>
            <img
              src={`https://api.dicebear.com/5.x/pixel-art/svg?seed=${user?.email}&size=48`}
              alt=""
            />
            <hr
              className="mx-4"
              style={{ width: "1px", height: "50px", display: "inline-block" }}
            />
            <h3 className="mont mx-2">{user?.name}</h3>
          </div>
          <Scrollbars
            ref={newMesRef}
            className="p-4"
            autoHide
            style={{ flex: "1 1 auto" }}>
            <div className="p-2">
              {message.map((message) => {
                return (
                  <div className="d-flex my-2" key={message.id}>
                    <div>
                      <img
                        src={`https://api.dicebear.com/5.x/pixel-art/svg?seed=${message?.sendermail}&size=32`}
                        alt=""
                      />
                    </div>
                    <div className="">
                      <div className="d-flex m-0">
                        {/* <p className=" nunito mx-3 mb-0"> */}
                        <strong className=" nunito mx-3 mb-0">
                          {message.user}
                        </strong>
                        {/* </p> */}
                        <p className="nunito m-0">
                          <small style={{ fontSize: "0.6rem", color: "gray" }}>
                            {dayjs(message.createdAt?.toDate()).format(
                              "h:mm A, MMM D."
                            )}
                          </small>
                        </p>
                      </div>
                      <p className="mx-3 mt-0">{message.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Scrollbars>
          <div
            className="chat-input d-flex align-items-center justify-content-between px-4"
            style={{
              width: "100%",
              flex: "0 1 50px",
              // position: "fixed",
              // bottom: "0",
              backgroundColor: "#202020",
            }}>
            <ThemeProvider theme={darkTheme}>
              <div
                className="input d-flex flex-column justify-content-center "
                style={{ width: "100%" }}>
                <form
                  onSubmit={handleSubmit(sendMessage)}
                  style={{ display: "flex" }}>
                  <TextField
                    id="standard-basic"
                    fullWidth
                    {...register("text")}
                    label={`Message ${user?.name}...`}
                    variant="standard"
                  />
                  <Button type="submit">
                    <IoMdSend
                      style={{ fontSize: "2rem", color: "#a798e4!important" }}
                    />
                  </Button>
                </form>
              </div>
            </ThemeProvider>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chat;
