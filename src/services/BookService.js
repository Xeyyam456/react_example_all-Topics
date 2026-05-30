import axios from 'axios';

const API_URL = 'https://openlibrary.org/search.json?q=javascript&limit=10';

const BookService = {
  getBooks() {
    return axios.get(API_URL);
  },
};

export default BookService;
