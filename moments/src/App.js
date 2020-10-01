import React from 'react';
import './App.css';
import { Switch, Route, Redirect } from "react-router-dom";
import LandingPage from "./component/LandingPage";
import Home from "./component/Home/Home";
import Settings from "./component/Setting/Settings";
import PageNotFound from "./component/PageNotFound";

function App() {
  return (
    <React.Fragment>
      <Switch>
        <Route path="/" exact>
          <LandingPage></LandingPage>
        </Route>
        <Route path="/home">
          <Home></Home>
        </Route>
        <Route path="/setting">
          <Settings></Settings>
          </Route>
        <Redirect from="/login" to="/"></Redirect>
        <Route>
          <PageNotFound></PageNotFound>
        </Route>
      </Switch>
    </React.Fragment>
  );
}

export default App;
