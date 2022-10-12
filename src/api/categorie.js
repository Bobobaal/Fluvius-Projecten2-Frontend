import {
  axios
} from '.';

export const getById = async (id) => {
  const categorie = await axios.get(`data/categorie/${id}`);
  return categorie
}

export const getAll = async () => {
  const data = await axios.get(`data/categorie`)
  return data 
}

export const getDoelstellingen = async (id) => {
  const data = await axios.get(`data/doelstelling/categorie/${id}`)
  return data 
}
