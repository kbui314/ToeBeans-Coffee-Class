import React, { useState } from "react";
import { Button, Col, Form, Modal } from "react-bootstrap";
import ClassService from "../../services/ClassService";
import "./NewCourseModal.css";

export default function NewCourseModal(props) {
    const [classTitle, setClassTitle] = useState("");
    const [description, setDescription] = useState("");
    const [fromHour, setFromHour] = useState("");
    const [fromMinute, setFromMinute] = useState("");
    const [fromMeridian, setFromMeridian] = useState("AM");
    const [toHour, setToHour] = useState("");
    const [toMinute, setToMinute] = useState("");
    const [toMeridian, setToMeridian] = useState("AM");

    function clearInput() {
        setClassTitle("");
        setDescription("");
        setFromHour("");
        setFromMinute("");
        setFromMeridian("AM");
        setToHour("");
        setToMinute("");
        setToMeridian("AM");
    }

    function submitClassForm() {
        let timeperiod = [
            fromHour,
            fromMinute,
            fromMeridian,
            "-",
            toHour,
            toMinute,
            toMeridian,
        ].join(" ");
        let newClass = {
            courseid: 0,
            title: classTitle,
            description: description,
            timeperiod: timeperiod,
        };
        ClassService.insertNewClass(newClass).then((response) => {
            if (response === undefined || response.data.classTitle === "") {
                console.log("Class Creation Failed");
            } else if (response.data.title === "classTitle") {
                console.log("Success");
            }
            clearInput();
            props.onClick(false);
        });
    }

    function cancelClassForm() {
        clearInput();
        props.onClick(false);
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
                            <Form.Control
                                as="select"
                                size="sm"
                                value={fromHour}
                                onChange={(e) => setFromHour(e.target.value)}
                            >
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
                        :
                        <Col>
                            <Form.Control
                                as="select"
                                size="sm"
                                value={fromMinute}
                                onChange={(e) => setFromMinute(e.target.value)}
                            >
                                <option>00</option>
                                <option>15</option>
                                <option>30</option>
                                <option>45</option>
                            </Form.Control>
                        </Col>
                        <Col>
                            <Form.Control
                                as="select"
                                size="sm"
                                value={fromMeridian}
                                onChange={(e) =>
                                    setFromMeridian(e.target.value)
                                }
                            >
                                <option>AM</option>
                                <option>PM</option>
                            </Form.Control>
                        </Col>
                        -
                        <Col>
                            <Form.Control
                                as="select"
                                size="sm"
                                value={toHour}
                                onChange={(e) => setToHour(e.target.value)}
                            >
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
                        :
                        <Col>
                            <Form.Control
                                as="select"
                                size="sm"
                                value={toMinute}
                                onChange={(e) => setToMinute(e.target.value)}
                            >
                                <option>00</option>
                                <option>15</option>
                                <option>30</option>
                                <option>45</option>
                            </Form.Control>
                        </Col>
                        <Col>
                            <Form.Control
                                as="select"
                                size="sm"
                                value={toMeridian}
                                onChange={(e) => setToMeridian(e.target.value)}
                            >
                                <option>AM</option>
                                <option>PM</option>
                            </Form.Control>
                        </Col>
                    </Form.Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Col>
                    <Button onClick={() => cancelClassForm()}>Cancel</Button>
                </Col>
                <Col md={{ span: 2, offset: 2 }}>
                    <Button variant="success" onClick={() => submitClassForm()}>
                        Submit
                    </Button>
                </Col>
            </Modal.Footer>
        </Modal>
    );
}
