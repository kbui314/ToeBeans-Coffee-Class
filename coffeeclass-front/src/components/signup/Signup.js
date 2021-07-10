import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import UserService from "../../services/UserService";
import "./Signup.css";
import NavBar from "../navbar/Navbar";

export default function SignUp(props) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const link = <a href="/login">Sign in</a>;

    function validateForm() {
        return (
            firstName.length > 0 &&
            lastName.length > 0 &&
            email.length > 0 &&
            password.length > 0 &&
            phone.length > 0
        );
    }

    function handleSubmit(event) {
        event.preventDefault();
        let user = {
            id: -1,
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            phone: phone,
        };
        UserService.insertNewUser(user).then((response) => {
            props.history.push("/login");
        });
    }

    return (
        <div>
            <NavBar history={props.history} />
            <div className="signUpTitle">
                <h1>Register</h1>
            </div>
            <div className="SignUp">
                <Form onSubmit={handleSubmit}>
                    <Form.Group size="lg" controlId="firstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            autoFocus
                            type="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group size="lg" controlId="lastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            type="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group size="lg" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group size="lg" controlId="password">
                        <Form.Label> Set Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group size="lg" controlId="phone">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                            type="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Button
                        block
                        size="lg"
                        type="submit"
                        disabled={!validateForm()}
                    >
                        Sign Up
                    </Button>
                    <p className="text-center">Already a user? Please {link}</p>
                </Form>
            </div>
        </div>
    );
}
