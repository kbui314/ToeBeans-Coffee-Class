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

    sendContact(contactForm) {
        return axios.post(`${API_URL}/sendform`, {
            formId: contactForm.formId,
            firstName: contactForm.firstName,
            lastName: contactForm.lastName,
            email: contactForm.email,
            description: contactForm.description,
        });
    }

    verifyUser() {
        return axios.get(`${API_URL}/verify`);
    }
}

export default new UserService();
