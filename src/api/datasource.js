import {
    axios
} from '.';
  
export const getById = async (id) => {
    const data = await axios.get(`data/datasource/${id}`);
    return data;
}
  
export const getAll = async () => {
    const data = await axios.get(`data/datasource`);
    return data;
}

export const patchById = async (id, foutief, boodschap) => {
    const data = await axios.patch(`data/datasource/${id}`,
        { 
            foutief,
            boodschap,
        });
    return data;
}