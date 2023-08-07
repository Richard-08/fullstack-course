import axios from "axios";

const baseUrl = "http://localhost:3000/anecdotes";

const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const createNew = async (payload) => {
  const res = await axios.post(baseUrl, payload);
  return res.data;
};

const updateVotes = async (payload) => {
  const res = await axios.put(baseUrl + `/${payload.id}`, payload);
  return res.data;
};

export default {
  getAll,
  createNew,
  updateVotes,
};
