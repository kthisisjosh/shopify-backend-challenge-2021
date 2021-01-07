import React from "react"
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import HomePage from "./containers/HomePage"
import Dashboard from "./containers/Dashboard"
import Signin from "./containers/Signin"
import Signup from "./containers/Signup"

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/dashboard" exact component={Dashboard} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
