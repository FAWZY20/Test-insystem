import axios from 'axios';

export default axios.create({
  baseURL: `https://hubeau.eaufrance.fr/api`
});