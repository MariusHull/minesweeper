import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import HomePage from "./containers/Home";
import GamePage from "./containers/Game";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/play" component={GamePage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
