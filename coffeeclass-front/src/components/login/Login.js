import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import NavBar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import "./Login.css";
import UserService from "../../services/UserService";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();
    const register = <a href="/signup">register</a>;

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
        UserService.loginUser(email, password).then((response) => {
            if (response !== undefined) {
                sessionStorage.setItem("access_token", response.data);
                history.push("/classes");
            }
        });
    }

    return (
        <div>
            <div id="header-back-section">
                <NavBar />
            </div>
            <div className="loginTitle">
                <h1>Log In</h1>
            </div>
            <div className="Login">
                <Form onSubmit={handleSubmit}>
                    <Form.Group size="lg" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Button
                        block
                        size="lg"
                        type="submit"
                        disabled={!validateForm()}
                    >
                        Login
                    </Button>
                    <p className="register-center">
                        Not a user? Please {register}
                    </p>
                </Form>
            </div>
            <Footer />
        </div>
    );
}
