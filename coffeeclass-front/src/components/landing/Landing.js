import React from "react";
import NavBar from "../navbar/Navbar";
import { Container, Row, Col } from "react-bootstrap";
import "./Landing.css";
import Footer from "../footer/Footer";

export default function Landing() {
    return (
        <div>
            <div id="landing">
                <NavBar />
                <h2 id="big-text">Welcome</h2>
            </div>
            <Container className="section">
                <div id="statement"></div>
            </Container>
            <Container className="section">
                <Row>
                    <Col>1 of 3</Col>
                    <Col>2 of 3</Col>
                    <Col>3 of 3</Col>
                </Row>
            </Container>
            <Footer />
        </div>
    );
}
