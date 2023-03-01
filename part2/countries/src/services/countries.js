import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://restcountries.com/v3.1",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

function getAll() {
  const request = apiClient.get("/all");
  return request.then((response) => response.data);
}

export default { getAll };
