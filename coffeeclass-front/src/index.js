import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import "./index.css";
import App from "./App";

export const history = createBrowserHistory();
ReactDOM.render(
    <React.StrictMode>
        <Router>
            <App />
        </Router>
    </React.StrictMode>,
    document.getElementById("root")
);
