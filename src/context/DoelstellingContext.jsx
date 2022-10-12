import {
  createContext,
  useState,
  useCallback,
  useMemo,
  useContext,
} from "react";
import * as doelstellingAPI from "../api/doelstelling";

export const DoelstellingContext = createContext();
export const useDoelstellingContext = () => useContext(DoelstellingContext);

export const DoelstellingProvider = ({ children }) => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const [doelstelling, setDoelstelling] = useState();
  const [doelstellingLijst, setDoelstellingLijst] = useState([]);

  const getAllDoelstellingen = useCallback(async () => {
    try {
      setError();
      setLoading(true);

      const data = await doelstellingAPI.getAll();
      
      setDoelstellingLijst(data.data);
      return data.data;
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const getDoelstelling = useCallback(async (id) => {
    try {
      setError();
      setLoading(true);

      const doelstelling = await doelstellingAPI.getById(id);

      setDoelstelling(doelstelling.data);
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
      doelstelling,
      doelstellingLijst,
      getAllDoelstellingen,
      getDoelstelling,
      setDoelstellingLijst,
    }),
    [
      error,
      loading,
      doelstelling,
      doelstellingLijst,
      getAllDoelstellingen,
      getDoelstelling,
      setDoelstellingLijst,
    ]
  );

  return (
    <DoelstellingContext.Provider value={value}>
      {children}
    </DoelstellingContext.Provider>
  );
};
