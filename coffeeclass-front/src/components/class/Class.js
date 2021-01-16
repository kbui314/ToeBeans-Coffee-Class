import React, { useState, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { useParams, useHistory } from "react-router";
import ClassService from "../../services/ClassService";
import NavBar from "../navbar/Navbar";
import "./Class.css";

export default function Class() {
    const history = useHistory();
    const id = useParams();
    const [courses, setCourse] = useState({});

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
                history.push("/classes");
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
        <Container>
            <NavBar />
            <h1>Course Details</h1>
            <h2>{courses.courseId}</h2>
            <h4>{courses.description}</h4>
            <Button
                onClick={() => {
                    registerForClass(courses.courseId);
                }}
            >
                Register
            </Button>
        </Container>
    );
}
