import axios from 'axios';

class Backend {
  baseUrl = 'http://localhost:3000/products';

  getOne(id) {
    return axios.get(this.baseUrl + "/" + id);
  }

  getAll() {
    return axios.get(this.baseUrl);
  }

  create(data) {
    return axios.post(this.baseUrl, data);
  }

  update(id, data) {
    return axios.patch(this.baseUrl + "/" + id, data);
  }

  delete(id) {
    return axios.delete(this.baseUrl + "/" + id);
  }
}

export default new Backend();