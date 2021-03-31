import React, { useEffect, useState } from "react";
import NavBar from "../navbar/Navbar";
import { Container, ListGroup } from "react-bootstrap";
import "./Dashboard.css";
import { useHistory } from "react-router-dom";
import LocalStorageService from "../../services/LocalStorageService";
// import "bootstrap/dist/css/bootstrap.css";
import ClassService from "../../services/ClassService";

export default function Dashboard() {
    const history = useHistory();
    const [classList, setClassLists] = useState([]);
    const listClass = ["my-2", "class-list"];

    useEffect(() => {
        if (LocalStorageService.getToken() === null) {
            history.push("/login");
        }
    }, [history]);

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
    }, []);

    return (
        <React.Fragment>
            <div>
                <NavBar />
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
                        </ListGroup>
                    );
                })}
            </Container>
        </React.Fragment>
    );
}
