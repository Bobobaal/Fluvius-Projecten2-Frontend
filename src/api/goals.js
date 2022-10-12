import {
  axios
} from '.';

export const getAll = async () => {
  const data = await axios.get(`data/goal`)
  return data 
}
