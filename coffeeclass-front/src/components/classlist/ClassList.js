import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button, Container, Modal, ListGroup } from "react-bootstrap";
import ClassService from "../../services/ClassService";
import NavBar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import "./ClassList.css";
import "bootstrap/dist/css/bootstrap.css";

export default function ClassList() {
    const history = useHistory();
    const [classList, setClassList] = useState([]);
    const [userClassList, setUserClassList] = useState([]);
    const listClass = ["my-2", "class-list"];
    const [message, setMessage] = useState("");
    const [showModal, setShowModal] = useState(false);

    function refreshClass() {
        ClassService.getClassList().then((response) => {
            if (response !== undefined) {
                response.data.sort(function (a, b) {
                    return a.courseId - b.courseId;
                });
                setClassList(response.data);
            }
        });
    }

    function viewCourse(id) {
        history.push(`/class/${id}`);
    }

    function refreshUserClass() {
        ClassService.getUserClasses().then((response) => {
            if (response !== undefined) {
                response.data.sort(function (a, b) {
                    return a.courseId - b.courseId;
                });
                setUserClassList(response.data);
            }
        });
    }

    function goToContact() {
        history.push("/contact");
    }

    function deleteCourse(courseId) {
        ClassService.deleteUserCourse(courseId).then((response) => {
            if (response !== undefined) {
                if (response.data === "Success") {
                    let list = userClassList;
                    for (let i = 0; i < list.length; i++) {
                        if (list[i].courseId === courseId) {
                            list.splice(i, 1);
                            setMessage("Delete Success");
                            setShowModal(true);
                            setUserClassList(list);
                            break;
                        }
                    }
                } else {
                    setMessage("Delete Failed");
                    setShowModal(true);
                }
            }
        });
    }

    useEffect(() => {
        const token = sessionStorage.getItem("access_token");
        if (token == null) {
            history.push("/login");
        } else {
            refreshClass();
            refreshUserClass();
        }
    }, [history, userClassList]);

    return (
        <div>
            <div>
                <NavBar />
            </div>
            <Container>
                <div>
                    <h2>Class List</h2>
                    {classList.map((e) => {
                        return (
                            <ListGroup
                                horizontal="sm"
                                className={listClass}
                                key={e.courseId}
                                onClick={() => viewCourse(e.courseId)}
                            >
                                <ListGroup.Item variant="info">
                                    {e.courseId}
                                </ListGroup.Item>
                                <ListGroup.Item action className="course-title">
                                    {e.title}
                                </ListGroup.Item>
                            </ListGroup>
                        );
                    })}
                </div>
            </Container>
            <Container>
                <div>
                    <h2>Upcoming Classes</h2>
                    {userClassList.map((e) => {
                        return (
                            <ListGroup
                                horizontal="sm"
                                className="my-2"
                                key={e.courseId}
                            >
                                <ListGroup.Item variant="danger">
                                    {e.courseId}
                                </ListGroup.Item>
                                <ListGroup.Item className="course-title">
                                    {e.title}
                                </ListGroup.Item>
                                <ListGroup.Item className="course-title">
                                    {e.timeperiod}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Button
                                        variant="danger"
                                        onClick={() => deleteCourse(e.courseId)}
                                    >
                                        Delete
                                    </Button>
                                </ListGroup.Item>
                            </ListGroup>
                        );
                    })}
                </div>
            </Container>
            <div className="coffeebean">
                <div className="blur center">
                    <h3>
                        Have Questions?
                        <div
                            className="contact-title"
                            onClick={() => goToContact()}
                        >
                            Go to our Contact page.
                        </div>
                    </h3>
                </div>
            </div>
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
