import React from "react";
import { useHistory } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./MessageModal.css";

export default function MessageModal(props) {
    const history = useHistory();

    return (
        <React.Fragment>
            <Modal size="lg" centered show={props.showModal}>
                <Modal.Header>Message</Modal.Header>
                <Modal.Body>{props.message}</Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onClick}>Close</Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    );
}
