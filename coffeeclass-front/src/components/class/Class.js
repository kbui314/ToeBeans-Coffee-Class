import React, { useState, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { useParams } from "react-router";
import ClassService from "../../services/ClassService";
import NavBar from "../navbar/Navbar";
import MessageModal from "../messagemodal/MessageModal";
import "./Class.css";

export default function Class(props) {
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
        let message = "";
        ClassService.postRegistration(id).then((response) => {
            if (response !== undefined) {
                if (response.data === "registered") {
                    message = "You have already registered for this class";
                } else {
                    message = "Registration Successful";
                }
                setMessage(message);
                showMessagePopup();
            }
        });
    }

    function modalConfirm() {
        setShowModal(false);
        props.history.push("/classes");
    }

    useEffect(() => {
        const token = sessionStorage.getItem("access_token");
        if (token == null) {
            props.history.push("/login");
        } else {
            getClass();
        }
    });

    return (
        <div>
            <div className="coffee-background">
                <NavBar history={props.history} />
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

            <MessageModal
                showModal={showModal}
                message={message}
                onClick={() => modalConfirm()}
            />
        </div>
    );
}
