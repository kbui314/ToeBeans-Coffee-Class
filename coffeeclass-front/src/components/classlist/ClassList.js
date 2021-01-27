import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ClassService from "../../services/ClassService";
import NavBar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import "./ClassList.css";

export default function ClassList() {
    const history = useHistory();
    const [classList, setClassList] = useState([]);
    const [userClassList, setUserClassList] = useState([]);

    function refreshClass() {
        ClassService.getClassList().then((response) => {
            if (response !== undefined) {
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
                setUserClassList(response.data);
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
            <NavBar />
            <div className="container">
                <h1>Class List</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Class Title</th>
                        </tr>
                    </thead>
                    <tbody>
                        {classList.map((e) => {
                            return (
                                <tr
                                    key={e.courseId}
                                    onClick={() => viewCourse(e.courseId)}
                                    className="course"
                                >
                                    <td>{e.courseId}</td>
                                    <td>{e.title}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className="container">
                <h2>Upcoming Classes</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Class Title</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userClassList.map((e) => {
                            return (
                                <tr key={e.courseId} className="course">
                                    <td>{e.courseId}</td>
                                    <td>{e.title}</td>
                                    <td>{e.timeperiod}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <Footer />
        </div>
    );
}
