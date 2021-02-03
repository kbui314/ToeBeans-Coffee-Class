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
            <NavBar />
            <Container>
                <h1>Course Details</h1>
                <h2>{courses.courseId}</h2>
                <h4>{courses.description}</h4>
                <h4>{courses.timeperiod}</h4>
                <Button
                    onClick={() => {
                        registerForClass(courses.courseId);
                    }}
                >
                    Register
                </Button>
            </Container>
            <Footer />

            <Modal size="lg" centered show={showModal}>
                <Modal.Header>Message</Modal.Header>
                <Modal.Body>{message}</Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setShowModal(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
