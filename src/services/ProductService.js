import axios from "axios";

const BASE_URL = "https://dummyjson.com";

class ProductService {
  getProducts() {
    return axios.get(`${BASE_URL}/products`).then((res) => res.data.products);
  }

  getProductById(id) {
    return axios.get(`${BASE_URL}/products/${id}`).then((res) => res.data);
  }
}

export default new ProductService();
