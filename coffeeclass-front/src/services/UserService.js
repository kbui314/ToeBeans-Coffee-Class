import axios from "axios";

const API_URL = "http://localhost:8080";

class UserService {
  insertNewUser(user) {
    return axios.post(`${API_URL}/signup`, {
      userId: 0,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.email,
      password: user.password,
      phone: user.phone,
    });
  }

  loginUser(email, password) {
    return axios.post(`${API_URL}/login`, {
      username: email,
      password: password,
    });
  }
}

export default new UserService();
