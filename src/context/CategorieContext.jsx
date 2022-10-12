import {
  createContext,
  useState,
  useCallback,
  useMemo,
  useContext,
} from "react";
import * as categorieAPI from "../api/categorie";

export const CategorieContext = createContext();
export const useCategorieContext = () => useContext(CategorieContext);

export const CategorieProvider = ({ children }) => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const [categorie, setCategorie] = useState();
  const [categorieLijst, setCategorieLijst] = useState([]);

  const getAllCategorieen = useCallback(async () => {
    try {
      setError();
      setLoading(true);

      const data = await categorieAPI.getAll();

      setCategorieLijst(data.data);

      return data.data
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const getCategorie = useCallback(async (id) => {
    try {
      setError();
      setLoading(true);

      const categorie = await categorieAPI.getById(id);

      setCategorie(categorie.data);
      return categorie.data
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);


  const value = useMemo(
    () => ({
      error,
      loading,
      categorie,
      categorieLijst,
      getAllCategorieen,
      getCategorie,
    }),
    [
      error,
      loading,
      categorie,
      categorieLijst,
      getAllCategorieen,
      getCategorie,
    ]
  );

  return (
    <CategorieContext.Provider value={value}>
      {children}
    </CategorieContext.Provider>
  );
};
