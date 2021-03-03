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
        if (sessionStorage.getItem("access_token")) {
            history.push("/classes");
        } else {
            history.push("/login");
        }
    }

    function goToContact() {
        history.push("/contact");
    }

    function logout() {
        sessionStorage.clear();
        history.push("/login");
    }

    function login() {
        history.push("/login");
    }

    useEffect(() => {
        if (sessionStorage.getItem("access_token")) {
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
                        <Nav.Link onClick={() => goToContact()} href="">
                            Contact
                        </Nav.Link>
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
