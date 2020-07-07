import axios from "axios";
import { API_PATH, LAPISHAGROUP_API_PATH } from "./constants";

class ApiUtils {
  signup(userData) {
    return axios.post(`${API_PATH}/signup`, userData);
  }

  login(userCrednetials) {
    return axios({
      method: "post",
      url: `${API_PATH}/signin`,
      headers: { "Content-type": "application/json" },
      data: userCrednetials,
    });
  }

  getCurrentUser() {
    // we get a response if there is session on the backend server
    return axios.get(`${API_PATH}/checkcurrentuser.php`);
  }

  Logout() {
    return axios.get(`${API_PATH}/logout.php`);
  }

  getProperties() {
    return axios.get(`${LAPISHAGROUP_API_PATH}`);
  }
}

export default ApiUtils;
