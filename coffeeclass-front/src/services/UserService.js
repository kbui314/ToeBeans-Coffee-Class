import axios from "axios";

const API_URL = "http://localhost:8080";

class UserService {
    insertNewUser(user) {
        return axios.post(`${API_URL}/users`, {
            userId: 0,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.lastName,
            password: user.password,
            phone: user.phone,
        });
    }
}

export default new UserService();
