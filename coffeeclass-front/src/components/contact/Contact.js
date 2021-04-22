import React, { useState } from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import NavBar from "../navbar/Navbar";
import Form from "react-bootstrap/Form";
import UserService from "../../services/UserService";
import "./Contact.css";

export default function Contact() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [description, setDescription] = useState("");

    function validateForm() {
        return (
            firstName.length > 0 &&
            lastName.length > 0 &&
            email.length > 0 &&
            description.length > 0
        );
    }

    function handleSubmit(event) {
        event.preventDefault();
        let contact = {
            formId: -1,
            firstName: firstName,
            lastName: lastName,
            email: email,
            description: description,
        };
        UserService.sendContact(contact).then((response) => {
            if (response.data.formId === 0) {
                alert("Sending contact has failed");
            } else {
                alert("Successful");
                clearInput();
            }
        });
    }

    function clearInput() {
        setFirstName("");
        setLastName("");
        setEmail("");
        setDescription("");
    }

    return (
        <div>
            <NavBar />
            <Container className="header-section">
                <div>
                    <h1>Have Questions?</h1>
                    <h1>We Have Answers.</h1>
                </div>
            </Container>
            <Container className="section">
                <div>
                    <h2 id="contact-title">Contact Us</h2>
                    <Row id="two-col-row">
                        <Col className="col-center">
                            <h4>Phone Number</h4>
                            <p>985-554-1311</p>
                        </Col>
                        <Col className="loc-add">
                            <h4>Location</h4>
                            <div>
                                <p>21118 S Ellsworth Loop</p>
                                <p>Queen Creek, AZ</p>
                                <p>85142</p>
                            </div>
                        </Col>
                    </Row>
                    <div className="form">
                        <Form onSubmit={handleSubmit}>
                            <Form.Group size="lg" controlId="email">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={firstName}
                                    onChange={(e) =>
                                        setFirstName(e.target.value)
                                    }
                                ></Form.Control>
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={lastName}
                                    onChange={(e) =>
                                        setLastName(e.target.value)
                                    }
                                ></Form.Control>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                ></Form.Control>
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={10}
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                ></Form.Control>
                            </Form.Group>
                            <Button
                                id="submit-button"
                                block
                                size="lg"
                                type="submit"
                                disabled={!validateForm()}
                            >
                                Submit
                            </Button>
                        </Form>
                    </div>
                </div>
            </Container>
        </div>
    );
}
