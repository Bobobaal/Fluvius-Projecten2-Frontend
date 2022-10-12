import {
  axios
} from '.';

export const getById = async (id) => {
  const categorie = await axios.get(`data/doelstelling/${id}`);
  return categorie
}

export const getAll = async () => {
  const data = await axios.get(`data/doelstelling`)
  return data 
}
