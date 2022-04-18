import axios from 'axios';

class Backend {
  baseUrl = 'http://localhost:3000/products';

  async getOne(id) {
    const result = await axios.get(this.baseUrl + "/" + id);
    return result.data;
  }

  async getAll() {
    const result = await axios.get(this.baseUrl);
    return result.data;
  }

  async create(data) {
    return axios.post(this.baseUrl, data);
  }

  async update(id, data) {
    return axios.patch(this.baseUrl + "/" + id, data);
  }

  async delete(id) {
    return axios.delete(this.baseUrl + "/" + id);
  }
}

export default new Backend();