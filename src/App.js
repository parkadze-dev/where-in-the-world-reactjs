import React, { useState } from "react";
import AppBar from "./components/AppBar/AppBar";
import Home from "./views/Home/Home";
import CountryInfo from "./components/CountryInfo/CountryInfo";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <AppBar />
      <Switch>
        <Route exact path="/" render={(props) => <Home {...props} />} />
        <Route
          exact
          path="/country/:id"
          render={(props) => <CountryInfo {...props} />}
        />
      </Switch>
    </div>
  );
}

export default App;
