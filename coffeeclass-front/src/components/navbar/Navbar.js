import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";

export default function NavBar() {
    const [isLogin, setIsLogin] = useState(false);
    const history = useHistory();

    function goToHome() {
        history.push("/");
    }

    function goToCourses() {
        history.push("/classes");
    }

    function logout() {
        localStorage.clear();
        history.push("/login");
    }

    function login() {
        history.push("/login");
    }

    useEffect(() => {
        if (localStorage.getItem("access_token")) {
            setIsLogin(true);
        }
    }, []);

    return (
        <Container>
            <Navbar collapseOnSelect expand="lg" bd="light" variant="light">
                <Navbar.Brand id="brand" onClick={() => goToHome()} href="">
                    ToeBeans
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="response-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#contact">Contact</Nav.Link>
                        <Nav.Link onClick={() => goToCourses()} href="">
                            Course
                        </Nav.Link>
                    </Nav>
                    <Nav className="ml-auto">
                        {isLogin ? (
                            <Nav.Link onClick={() => logout()} href="">
                                Log Out
                            </Nav.Link>
                        ) : (
                            <Nav.Link onClick={() => login()} href="">
                                Log In
                            </Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </Container>
    );
}
