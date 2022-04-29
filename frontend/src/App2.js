import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./App.css";
import Model2 from "./model2";
import Model1 from "./model1";
// import Administrator from "./components/administrator";
// import Consumer from "./components/consumer";
// import Login from "./components/login";
// import Publisher from "./components/publisher";
// import SignUp from "./components/signup";
export default function App() {
  // React States
  console.log("Hey Cool Abhisek");
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/hey" component={Model1} />
         
        </Switch>
      </BrowserRouter>
    </div >
  );
}

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);