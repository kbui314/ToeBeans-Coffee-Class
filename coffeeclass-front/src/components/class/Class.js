import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import ClassService from "../../services/ClassService";
import "./Class.css";

export default function Class() {
    const history = useHistory();
    const id = useParams();
    const [course, setCourse] = useState({});

    function getClass() {
        ClassService.getClass(id).then((response) => {
            if (response !== undefined) {
                setCourse(response.data);
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
            <h1>Course Details</h1>
            <h2>{course.courseId}</h2>
            <h4>{course.description}</h4>
        </div>
    );
}
