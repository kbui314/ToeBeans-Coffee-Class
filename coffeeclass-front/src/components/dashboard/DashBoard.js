import React, { useEffect, useState } from "react";
import NavBar from "../navbar/Navbar";
import { Button, Container, ListGroup } from "react-bootstrap";
import "./Dashboard.css";
import LocalStorageService from "../../services/LocalStorageService";
import ClassService from "../../services/ClassService";
import NewCourseModal from "../NewCourseModal/NewCourseModal";
import MessageModal from "../messagemodal/MessageModal";

export default function Dashboard(props) {
    const [classList, setClassLists] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState("");
    const [messageModal, setMessageModal] = useState(false);
    const listClass = ["my-2", "class-list"];

    function addClass() {
        setShowModal(true);
    }

    function deleteClass(courseId) {
        ClassService.deleteClass(courseId).then((response) => {
            if (response !== undefined && response.data === "Success") {
                refreshClass();
                setMessage("Delete Class Success");
            } else {
                setMessage("Delete Class Failed");
            }
            setMessageModal(true);
        });
    }

    function refreshClass() {
        ClassService.getClassList().then((response) => {
            if (response !== undefined) {
                response.data.sort(function (a, b) {
                    return a.courseId - b.courseId;
                });
                setClassLists(response.data);
            }
        });
    }

    useEffect(() => {
        if (LocalStorageService.getToken() === null) {
            props.history.push("/login");
        }
    }, [props.history]);

    useEffect(() => {
        const getClassList = () => {
            ClassService.getClassList().then((response) => {
                if (response !== undefined) {
                    response.data.sort(function (a, b) {
                        return a.courseId - b.courseId;
                    });
                    setClassLists(response.data);
                }
            });
        };
        getClassList();
    }, [showModal]);

    return (
        <div className="main-dashboard">
            <div>
                <NavBar history={props.history} />
            </div>
            <Container>
                <h2>Class List</h2>
                {classList.map((e) => {
                    return (
                        <ListGroup
                            horizontal="sm"
                            className={listClass}
                            key={e.courseId}
                        >
                            <ListGroup.Item variant="info">
                                {e.courseId}
                            </ListGroup.Item>
                            <ListGroup.Item action className="course-title">
                                {e.title}
                            </ListGroup.Item>
                            <ListGroup.Item action>
                                {e.timeperiod}
                            </ListGroup.Item>
                            <Button
                                variant="danger"
                                onClick={() => deleteClass(e.courseId)}
                            >
                                Delete
                            </Button>
                        </ListGroup>
                    );
                })}
                <Button
                    onClick={() => {
                        addClass();
                    }}
                >
                    + Add Class
                </Button>
            </Container>
            <NewCourseModal showModal={showModal} onClick={setShowModal} />
            <MessageModal
                showModal={messageModal}
                message={message}
                onClick={() => setMessageModal(false)}
            />
        </div>
    );
}
