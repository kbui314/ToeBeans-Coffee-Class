import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ClassService from "../../services/ClassService";
import "./ClassList.css";

export default function ClassList() {
    const [classList, setClassList] = useState([]);
    const history = useHistory();

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

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (token == null) {
            history.push("/login");
        } else {
            refreshClass();
        }
    }, [history]);

    return (
        <div>
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
        </div>
    );
}
