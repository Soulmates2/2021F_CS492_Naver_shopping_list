import React from "react";
import logo from "./logo.svg";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import NaverIdLogin from "./NaverLogin";

function App() {
  return (
    <div className="App">
      <NaverIdLogin />
      {/* <Router>
        <Switch>
          <Route path="/login" component={NaverLogin} />
        </Switch>
      </Router> */}
    </div>
  );
}

export default App;
