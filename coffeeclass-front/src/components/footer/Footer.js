import React from "react";
import { Container } from "react-bootstrap";
import "./Footer.css";

export default function Footer() {
    return (
        <div className="footer-bg">
            <Container>
                <h3 className="text-center">Footer</h3>
                <ul>
                    <li>Twitter</li>
                    <li>Facebook</li>
                    <li>Instagram</li>
                </ul>
                <h3 className="text-center">
                    &copy; Toe Beans Group LLC. All Rights Reserved
                </h3>
            </Container>
        </div>
    );
}
