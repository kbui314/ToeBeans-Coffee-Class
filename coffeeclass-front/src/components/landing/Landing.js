import React from "react";
import NavBar from "../navbar/Navbar";
import { Container } from "react-bootstrap";
import "./Landing.css";

export default function Landing() {
  return (
    <div>
      <NavBar />
      <h1>Landing</h1>
      <div id="landing"></div>
      <div id="intro"></div>
      <div id="slider"></div>
    </div>
  );
}
