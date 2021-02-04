import React, { useState, useEffect } from "react";
import { Button, Container, Modal } from "react-bootstrap";
import { useParams, useHistory } from "react-router";
import ClassService from "../../services/ClassService";
import NavBar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import "./Class.css";

export default function Class() {
    const history = useHistory();
    const id = useParams();
    const [courses, setCourse] = useState({});
    const [message, setMessage] = useState("");
    const [showModal, setShowModal] = useState(false);

    function showMessagePopup() {
        setShowModal(true);
    }

    function getClass() {
        ClassService.getClass(id).then((response) => {
            if (response !== undefined) {
                setCourse(response.data);
            }
        });
    }

    function registerForClass(id) {
        ClassService.postRegistration(id).then((response) => {
            if (response !== undefined) {
                if (response.data === "registered") {
                    const message =
                        "You have already registered for this class";
                    setMessage(message);
                    showMessagePopup();
                } else {
                    history.push("/classes");
                }
            }
        });
    }

    function modalConfirm() {
        setShowModal(false);
        history.push("/classes");
    }

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (token == null) {
            history.push("/login");
        } else {
            getClass();
        }
    });

    return (
        <div>
            <div className="coffee-background">
                <NavBar />
                <div className="blur-title">
                    <h1 className="class-title">{courses.title}</h1>
                </div>
            </div>
            <Container className="details-container">
                <h1>Course Details</h1>
                <p>{courses.description}</p>
                <h2>Time Period:</h2>
                <h4>{courses.timeperiod}</h4>
                <div className="button-center">
                    <Button
                        onClick={() => {
                            registerForClass(courses.courseId);
                        }}
                        className="register-button"
                    >
                        Register
                    </Button>
                </div>
            </Container>
            <Footer />

            <Modal size="lg" centered show={showModal}>
                <Modal.Header>Message</Modal.Header>
                <Modal.Body>{message}</Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => modalConfirm()}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
