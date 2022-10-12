import { axios } from '.';

export const login = async (gebruikersnaam, wachtwoord) => {
	const {
		data
	} = await axios.post(`user/login`, {
		gebruikersnaam,
		wachtwoord
	});
	return data;
};

export const getCurrentUser = async () => {
	const {
	  data
	} = await axios.get(`user/profiel`);
	return data;
};
