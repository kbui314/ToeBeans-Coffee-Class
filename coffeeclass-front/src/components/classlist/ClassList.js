import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button, Container, ListGroup } from "react-bootstrap";
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
                            refreshUserClass();
                            break;
                        }
                    }
                    alert("Delete Success");
                } else {
                    alert("Delete Failed");
                }
            }
        });
    }

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (token == null) {
            history.push("/login");
        } else {
            refreshClass();
            refreshUserClass();
        }
    }, [history]);

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
        </div>
    );
}
