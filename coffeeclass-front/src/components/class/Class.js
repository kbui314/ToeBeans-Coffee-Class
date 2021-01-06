import React from "react";
import "./Class.css";

export default function Class(props) {
    return (
        <tr key={props.class.courseId}>
            <td>{props.class.courseId}</td>
            <td>{props.class.description}</td>
        </tr>
    );
}
