import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signup from "./pages/Signup";
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/signup">
            <Signup />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
