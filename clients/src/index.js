import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./views/views";
import Nav from "./views/components/NavBar";
import "./css/main.css";

ReactDOM.render(
  <Router>
    <Nav />
    <Routes>
      <Route path="/home" element={<Home />} />
    </Routes>
  </Router>,
  document.getElementById("root")
);
