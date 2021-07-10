import React from "react";
import { Route, useHistory } from "react-router-dom";
import axios from "axios";
import "./App.css";
import LocalStorageService from "./services/LocalStorageService";
import Landing from "./components/landing/Landing";
import Login from "./components/login/Login";
import SignUp from "./components/signup/Signup";
import ClassList from "./components/classlist/ClassList";
import Class from "./components/class/Class";
import Contact from "./components/contact/Contact";
// import NavBar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Dashboard from "./components/dashboard/DashBoard";

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
            <Route
                exact
                path="/"
                render={(props) => <Landing {...props} history={history} />}
            />
            <Route path="/contact" component={Contact} />
            {/* <Route path="/login" component={Login} /> */}
            <Route
                path="/login"
                render={(props) => <Login {...props} history={history} />}
            />
            {/* <Route path="/signup" component={SignUp} /> */}
            <Route
                path="/signup"
                render={(props) => <SignUp {...props} history={history} />}
            />
            {/* <Route path="/classes" component={ClassList} /> */}
            <Route
                path="/classes"
                render={(props) => <ClassList {...props} history={history} />}
            />
            {/* <Route path="/class/:id" component={Class} /> */}
            <Route
                path="/class/:id"
                render={(props) => <Class {...props} history={history} />}
            />
            {/* <Route path="/dashboard" component={Dashboard} /> */}
            <Route
                path="/dashboard"
                render={(props) => <Dashboard {...props} history={history} />}
            />
            <Footer />
        </div>
    );
}
