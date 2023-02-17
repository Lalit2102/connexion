import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Landing from "./pages/Landing";
import Signin from "./pages/Signin";
import AppContext from "./Contexts/AppContexts";
import Alerts from "./components/Alert";
import Spinner from "./components/Spinner";

function App() {
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
      <AppContext.Provider value={{ showAlert, showSpinner }}>
        <Router>
          <Alerts alert={alert} />
          <Spinner loading={loading} />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/signin" component={Signin} />
          </Switch>
        </Router>
      </AppContext.Provider>
    </div>
  );
}

export default App;
