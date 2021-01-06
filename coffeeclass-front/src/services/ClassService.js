import axios from "axios";

const API_URL = "http://localhost:8080/classes";

class ClassService {
    getClassList() {
        return axios.get(`${API_URL}`);
        // return axios.get(`${API_URL}`, {
        //     headers: {
        //         authorization: "bearer" + localstorage.getitem("access_token"),
        //     },
        // });
    }
}

export default new ClassService();
