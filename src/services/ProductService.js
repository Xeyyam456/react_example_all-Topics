import axios from "axios";

const BASE_URL = "https://dummyjson.com";

class ProductService {
  getProducts() {
    return axios.get(`${BASE_URL}/products?limit=20`).then((res) => res.data.products);
  }

  getCategories() {
    return axios.get(`${BASE_URL}/products/categories`).then((res) => res.data);
  }

  getProductsByCategory(category) {
    return axios
      .get(`${BASE_URL}/products/category/${category}`)
      .then((res) => res.data.products);
  }

  getProductById(id) {
    return axios.get(`${BASE_URL}/products/${id}`).then((res) => res.data);
  }
}

export default new ProductService();
