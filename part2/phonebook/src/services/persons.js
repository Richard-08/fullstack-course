import axios from "axios";

const baseUrl = "http://localhost:3001/api/persons";

function getAll() {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
}

function create(payload) {
  const request = axios.post(baseUrl, payload);
  return request.then((response) => response.data);
}

function remove(id) {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
}

function update(id, payload) {
  const request = axios.put(`${baseUrl}/${id}`, payload);
  return request.then((response) => response.data);
}

export default { getAll, create, remove, update };
