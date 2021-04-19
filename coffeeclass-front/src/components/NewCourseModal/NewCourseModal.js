import React, { useState } from "react";
import { Button, Col, Form, Modal } from "react-bootstrap";
import ClassService from "../../services/ClassService";
import "./NewCourseModal.css";

export default function NewCourseModal(props) {
    const [classTitle, setClassTitle] = useState("");
    const [description, setDescription] = useState("");
    const [hour, setHour] = useState("");
    const [minute, setMinute] = useState("");
    const [meridian, setMeridian] = useState("AM");

    function submitClassForm() {
        let newClass = {
            courseid: 0,
            title: classTitle,
            description: description,
        };
        ClassService.insertNewClass(newClass).then((response) => {
            if (response === undefined || response.data.classTitle === "") {
                console.log("Class Creation Failed");
            }
            if (response.data.title === "classTitle") {
                console.log("Success");
            }
        });
    }

    return (
        <Modal size="lg" centered show={props.showModal}>
            <Modal.Header>New Class</Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Label>Class Title</Form.Label>
                    <Form.Control
                        type="text"
                        value={classTitle}
                        onChange={(e) => setClassTitle(e.target.value)}
                    />
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <Form.Label>Time Period</Form.Label>
                    <Form.Row>
                        <Col>
                            <Form.Control as="select" size="sm">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7</option>
                                <option>8</option>
                                <option>9</option>
                                <option>10</option>
                                <option>11</option>
                                <option>12</option>
                            </Form.Control>
                        </Col>
                        <Col>
                            <Form.Control as="select" size="sm">
                                <option>00</option>
                                <option>15</option>
                                <option>30</option>
                                <option>45</option>
                            </Form.Control>
                        </Col>
                        :
                        <Form.Control as="select" size="sm">
                            <option>AM</option>
                            <option>PM</option>
                        </Form.Control>
                    </Form.Row>
                    <Button onClick={() => submitClassForm}>Submit</Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => props.onClick(false)}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    );
}
