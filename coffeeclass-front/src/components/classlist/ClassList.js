import { useState, useEffect } from "react";
import { Button, Container, ListGroup } from "react-bootstrap";
import ClassService from "../../services/ClassService";
import NavBar from "../navbar/Navbar";
import "./ClassList.css";
import "bootstrap/dist/css/bootstrap.css";
import MessageModal from "../messagemodal/MessageModal";

export default function ClassList(props) {
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
        props.history.push(`/class/${id}`);
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
        props.history.push("/contact");
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
                            break;
                        }
                    }
                } else {
                    setMessage("Delete Failed");
                }
                setShowModal(true);
            }
        });
        setShowModal(true);
    }

    function modalConfirm() {
        setShowModal(false);
    }

    useEffect(() => {
        const token = sessionStorage.getItem("access_token");
        if (token == null) {
            props.history.push("/login");
        } else {
            refreshClass();
            refreshUserClass();
        }
    }, [props.history]);

    return (
        <div>
            <div>
                <NavBar history={props.history} />
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
                <div className="classlist-div">
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
            <MessageModal
                showModal={showModal}
                message={message}
                onClick={() => modalConfirm()}
            />
        </div>
    );
}
