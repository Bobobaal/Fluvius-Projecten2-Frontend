import {
  axios
} from ".";

export const getAll = async () => {
  const data = await axios.get(`template`);
  return data;
}

export const getById = async (id) => {
  const data = await axios.get(`template/${id}`)
  return data;
}

export const getPrimaryTemplate = async () => {
  const data = await axios.get('template/primair');
  return data;
}

export const remove = async (id) => {
  const data = await axios.delete(`template/${id}`)
  return data;
}

export const saveDashboard = async (
  id,
  naam,
  rol,
  primair,
  personaliseerbaar,
  categorieen
) => {
  const data = await axios({
    method: id ? 'put' : 'post',
    url: `template/${id ?? ''}`,
    data: {
      naam,
      rol,
      primair,
      personaliseerbaar,
      categorieen,
    }
  })
  return data;
}

export const personaliseerDashboard = async (
  id,
  rolTemplate,
  categorieen
) => {
  const data = await axios({
    method: id ? 'put' : 'post',
    url: `template/user/${id ?? ''}`,
    data: {
      rolTemplate,
      categorieen
    }
  })
  return data;
}