import React from "react";
import NavBar from "../navbar/Navbar";
import { Container, Row, Col } from "react-bootstrap";
import seasonalLogo from "../../images/seasonal.png";
import organicLogo from "../../images/organic.png";
import fairTradeLogo from "../../images/fairtrade.png";
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
                    <Col className="col-center">
                        <img src={seasonalLogo} alt="Seasonal" />
                        <p>This is the seasonal statement</p>
                    </Col>
                    <Col className="col-center">
                        <img src={organicLogo} alt="Organic" />
                        <p>This is the organic statement</p>
                    </Col>
                    <Col className="col-center">
                        <img src={fairTradeLogo} alt="Fair Trade" />
                        <p>This is the fair trade statement</p>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </div>
    );
}
