import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Navbar, Nav, Container } from "react-bootstrap";

export default function NavBar() {
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("access_token")) {
            setIsLogin(true);
        }
    }, []);

    return (
        <Container>
            <Navbar collapseOnSelect expand="lg" bd="light" variant="light">
                <Navbar.Brand href="#home">ToeBeans</Navbar.Brand>
                <Navbar.Toggle aria-controls="response-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#contact">Contact</Nav.Link>
                        <Nav.Link href="#course">Course</Nav.Link>
                    </Nav>
                    <Nav className="ml-auto">
                        {isLogin ? (
                            <Nav.Link href="#login">Logout</Nav.Link>
                        ) : (
                            <Nav.Link href="#login">Login</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </Container>
    );
}
