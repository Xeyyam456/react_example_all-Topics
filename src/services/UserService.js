import axios from "axios";

const BASE_URL = "https://dummyjson.com";

class UserService {
  // Bütün istifadəçiləri gətir
  getUsers() {
    return axios
      .get(`${BASE_URL}/users`)
      .then((res) => res.data.users);
  }
getTodos() {
    return axios
      .get(`${BASE_URL}/todos`)
      .then((res) => res.data.todos);
  }

}

export default new UserService();
