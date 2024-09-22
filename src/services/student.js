import axios from 'axios';
const RESOURCE_URL = 'http://localhost:3002/students';

const getAll = () => {
  return axios.get(RESOURCE_URL);
};

const getPage = page => {
  return axios.get(`${RESOURCE_URL}?_page=${page}&_per_page=5`);
};

const buildQuery = conditions => {
  let query = '';

  for (const c in conditions) {
    query += `${c}_like=${conditions[c]}&`;
  }
  return query;
};

const search = conditions => {
  const query = buildQuery(conditions);
  return axios.get(`${RESOURCE_URL}?${query}`);
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
