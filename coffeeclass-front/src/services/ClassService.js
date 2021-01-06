import axios from "axios";

const API_URL = "http://localhost:8080/classes";

class ClassService {
    getClassList() {
        return axios.get(`${API_URL}`);
    }
}

export default new ClassService();
