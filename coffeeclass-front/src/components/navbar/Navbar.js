import React from "react";
import "./Navbar.css";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

export default function NavBar() {
    return (
        <Navbar collapseOnSelect expand="lg" bd="dark" variant="dark">
            <Navbar.Brand href="#home">ToeBeans</Navbar.Brand>
            <Navbar.Toggle aria-controls="response-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="#features">Features</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                    <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">
                            Action
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
