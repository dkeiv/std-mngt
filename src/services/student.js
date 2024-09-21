import axios from 'axios';
const RESOURCE_URL = 'http://localhost:3002/students';

const getAll = () => {
  return axios.get(RESOURCE_URL);
};

const getPage = page => {
  return axios.get(`${RESOURCE_URL}?_page=${page}&_per_page=5`);
};

const buildQuery = query => {
  let result = '';

  for (const field in query) {
    result += `${field}_like=${query[field]}&`;
  }
  return result;
};

const search = query => {
  const q = buildQuery(query);
  return axios.get(`${RESOURCE_URL}?${q}`);
};

const sortBy = (field, isASC) => {
  if (!isASC) field = `-${field}`;
  return axios.get(`${RESOURCE_URL}?_sort=${field}`);
};

const create = student => {
  return axios.post(RESOURCE_URL, student);
};

const update = (id, student) => {
  return axios.patch(`${RESOURCE_URL}/${id}`, student);
};

const remove = id => {
  return axios.delete(`${RESOURCE_URL}/${id}`);
};

export default {
  getAll,
  create,
  update,
  remove,
  sortBy,
  getPage,
  search,
};
