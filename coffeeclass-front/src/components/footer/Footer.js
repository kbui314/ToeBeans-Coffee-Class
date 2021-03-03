import React from "react";
import { Container } from "react-bootstrap";
import twitterLogo from "../../images/twitter_icon.png";
import facebookLogo from "../../images/facebook_icon.png";
import instagramLogo from "../../images/instagram_icon.png";
import "./Footer.css";

export default function Footer() {
    return (
        <div className="footer-bg">
            <Container>
                <ul>
                    <li>
                        <img src={twitterLogo} alt="Twitter" />
                    </li>
                    <li>
                        <img src={facebookLogo} alt="Facebook" />
                    </li>
                    <li>
                        <img src={instagramLogo} alt="Instagram" />
                    </li>
                </ul>
                <h3 className="text-center">
                    &copy; Toe Beans Group LLC. All Rights Reserved
                </h3>
            </Container>
        </div>
    );
}
