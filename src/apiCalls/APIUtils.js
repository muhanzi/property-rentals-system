import axios from "axios";
import { API_PATH, LAPISHAGROUP_API_PATH } from "./constants";

class ApiUtils {
  signup(userData) {
    return axios({
      method: "post",
      url: `${API_PATH}/signup.php`,
      headers: { "content-type": "application/json" },
      data: userData,
    });
  }

  login(userCrednetials) {
    let results = {};
    axios({
      method: "post",
      url: `${API_PATH}/signin.php`,
      headers: { "content-type": "application/json" },
      data: userCrednetials,
    })
      .then((response) => {
        if (response.data.status === 200) {
          results = { status: 200, user_data: response.data.user_data };
        } else {
          results = {
            status: response.data.status,
            message: response.data.message,
          };
        }
      })
      .catch((error) => {
        results = { status: 500, message: error.message };
      });
    return results;
  }

  getCurrentUser() {
    // we get a response if there is session data
    let results = {};
    axios({
      method: "get",
      url: `${API_PATH}/checkcurrentuser.php`,
      headers: { "content-type": "application/json" },
    })
      .then((response) => {
        if (response.data.status === 200) {
          results = { status: 200, user_data: response.data.session_data };
        } else {
          results = {
            status: response.data.status,
            message: response.data.message,
          };
        }
      })
      .catch((error) => {
        results = { status: 500, message: error.message };
      });
    return results;
  }

  Logout() {
    return axios({
      method: "get",
      url: `${API_PATH}/logout.php`,
      headers: { "content-type": "application/json" },
    });
  }

  getProperties() {
    return axios({
      method: "get",
      url: `${LAPISHAGROUP_API_PATH}`,
      headers: { "content-type": "application/json" },
    });
  }
}

export default ApiUtils;
