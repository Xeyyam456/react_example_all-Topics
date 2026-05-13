import axios from 'axios';

const BASE_URL = 'https://blog-api-t6u0.onrender.com';

class EmployeeService {
  // ID-si 100-dən böyük olan işçiləri gətir
  getEmployees() {
    return axios
      .get(`${BASE_URL}/posts`)
      .then((res) => res.data.filter((item) => item.id > 100));
  }

  // Yeni işçi əlavə et
  addEmployee(data) {
    return axios
      .post(`${BASE_URL}/posts`, data)
      .then((res) => res.data);
  }

  // ID ilə bir işçini yenilə
  updateEmployee(id, data) {
    return axios
      .put(`${BASE_URL}/posts/${id}`, data)
      .then((res) => res.data);
  }

  // ID ilə bir işçini sil
  deleteEmployee(id) {
    return axios
      .delete(`${BASE_URL}/posts/${id}`);
  }
}

export default new EmployeeService();
