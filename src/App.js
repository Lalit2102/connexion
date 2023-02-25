import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Landing from "./pages/Landing";
import Signin from "./pages/Signin";
import AppContext from "./Contexts/AppContexts";
import Alerts from "./components/Alert";
import Spinner from "./components/Spinner";
import Home from "./pages/Home";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase-config";
import Chat from "./components/Chat";
function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);
  const showAlert = (message, type) => {
    setAlert({
      type: type,
      message: message,
    });
    setTimeout(() => {
      setAlert(null);
    }, 4000);
  };
  const showSpinner = (value) => {
    setLoading(value);
  };
  return (
    <div className="App">
      <AppContext.Provider value={{ showAlert, showSpinner, user }}>
        <Router>
          <Alerts alert={alert} />
          <Spinner loading={loading} />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/home" component={Home} />
            <Route path="/chat/:rid" component={Chat} />
          </Switch>
        </Router>
      </AppContext.Provider>
    </div>
  );
}

export default App;
