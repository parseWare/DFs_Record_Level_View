
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import Administrator from "./components/administrator";
import Consumer from "./components/consumer";
import Login from "./components/login";
import Publisher from "./components/publisher";
import SignUp from "./components/signup";
export default function App() {
  // React States
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/publisher" element={<Publisher />} />
          <Route path="/administrator" element={<Administrator />} />
          <Route path="/consumer" element={<Consumer />} />
        </Routes>
      </BrowserRouter>
    </div >
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);