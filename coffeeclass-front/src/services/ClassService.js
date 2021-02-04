import axios from "axios";

const API_URL = "http://localhost:8080/classes";

class ClassService {
    getClassList() {
        return axios.get(`${API_URL}`);
    }

    getClass(courseId) {
        return axios.get(`${API_URL}/${courseId.id}`);
    }

    postRegistration(courseId) {
        return axios.post(`${API_URL}/register/${courseId}`);
    }

    getUserClasses() {
        return axios.get(`${API_URL}/user`);
    }

    deleteUserCourse(courseId) {
        return axios.post(`${API_URL}/delete/${courseId}`);
    }
}

export default new ClassService();
