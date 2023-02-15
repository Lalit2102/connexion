import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Landing from "./pages/Landing";
import Signin from "./pages/Signin";
import AppContext from "./Contexts/AppContexts";
import Alerts from "./components/Alert";

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      type: type,
      message: message,
    });
    setTimeout(() => {
      setAlert(null);
    }, 4000);
  };
  return (
    <div className="App">
      <AppContext.Provider value={{ showAlert }}>
        <Router>
          <Alerts alert={alert} />
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
