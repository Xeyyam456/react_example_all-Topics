import axios from "axios";

const DUMMY_BASE_URL = "https://dummyjson.com";

class UserService {
  // Bütün istifadəçiləri gətir
  getUsers() {
    return axios
      .get(`${DUMMY_BASE_URL}/users`)
      .then((res) => res.data.users);
  }

  // ID ilə bir istifadəçini gətir
  getUserById(id) {
    return axios
      .get(`${DUMMY_BASE_URL}/users/${id}`)
      .then((res) => res.data);
  }
getTodos() {
    return axios
      .get(`${DUMMY_BASE_URL}/todos`)
      .then((res) => res.data.todos);
  }
  getRecipes() {
    return axios
      .get(`${DUMMY_BASE_URL}/recipes`)
      .then((res) => res.data.recipes);
  }

}

export default new UserService();
