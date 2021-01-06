import axios from "axios";

const API_URL = "http://localhost:8080/classes";

class ClassService {
  getClassList() {
    return axios.get(`${API_URL}`);
  }

  getClass(id) {
    return axios.get(`${API_URL}/class/${id}`);
  }
}

export default new ClassService();
