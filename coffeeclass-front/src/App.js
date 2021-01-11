import React from "react";
import { Route, useHistory } from "react-router-dom";
import axios from "axios";
import "./App.css";
import LocalStorageService from "./services/LocalStorageService";
import Login from "./components/login/Login";
import SignUp from "./components/signup/Signup";
import ClassList from "./components/classlist/ClassList";
import Class from "./components/class/Class";

export default function App() {
    const history = useHistory();
    const localStorageService = LocalStorageService.getService();
    axios.interceptors.request.use(
        (config) => {
            const token = localStorageService.getToken();
            if (token) {
                config.headers["Authorization"] = "Bearer" + token;
            }
            return config;
        },
        (error) => {
            Promise.reject(error);
        }
    );

    axios.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            history.push("/login");
            Promise.reject(error);
        }
    );
    return (
        <div>
            <Route exact path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <Route path="/classes" component={ClassList} />
            <Route path="/classes/:id" component={Class} />
        </div>
    );
}
