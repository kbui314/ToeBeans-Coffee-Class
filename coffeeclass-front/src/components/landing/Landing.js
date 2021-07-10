import React from "react";
import NavBar from "../navbar/Navbar";
import { Container, Row, Col } from "react-bootstrap";
import seasonalLogo from "../../images/seasonal.png";
import organicLogo from "../../images/organic.png";
import fairTradeLogo from "../../images/fairtrade.png";
import "./Landing.css";

export default function Landing(props) {
    return (
        <div>
            <div id="landing">
                <NavBar history={props.history} />
                <h2 id="big-text">Welcome</h2>
            </div>
            <Container className="section">
                <div id="statement">
                    <p>
                        Toe Beans is founded by a group of like-minded
                        individuals who knew that good coffee does not have to
                        come at the expense of compromised ethical standards. We
                        strive to provide the best conditions for our farmers
                        which results in providing the best coffee for you.
                    </p>
                </div>
            </Container>
            <div id="coffee-beans">
                <div className="blur center">
                    <h2>Our Story</h2>
                </div>
            </div>
            <Container className="section">
                <Row>
                    <Col className="col-center">
                        <img src={seasonalLogo} alt="Seasonal" />
                        <h3 className="center-title">Seasonal</h3>
                        <p>
                            Our coffee beans are picked at peak ripeness in
                            order to provide the best flavor.
                        </p>
                    </Col>
                    <Col className="col-center">
                        <img src={organicLogo} alt="Organic" />
                        <h3 className="center-title">Organic</h3>
                        <p>
                            Coffee beans are grown without any pesticides and
                            are NON-GMO.
                        </p>
                    </Col>
                    <Col className="col-center">
                        <img src={fairTradeLogo} alt="Fair Trade" />
                        <h3 className="center-title">Fair Trade</h3>
                        <p>
                            We are Fair Trade certified meaning improved
                            relationships with the farmers which in turn
                            produces better coffee.
                        </p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
