import {
  createContext,
  useState,
  useCallback,
  useMemo,
  useContext,
  useEffect,
} from "react";
import * as goalsAPI from "../api/goals";

export const GoalsContext = createContext();
export const useGoalsContext = () => useContext(GoalsContext);

export const GoalsProvider = ({ children }) => {
  const [initialLoad, setInitialLoad] = useState(false)
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [goalsLijst, setGoalsLijst] = useState([]);

  const getAllGoals = useCallback(async () => {
    try {
      setError();
      setLoading(true);

      const data = await goalsAPI.getAll();

      setGoalsLijst(data.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!initialLoad){
      getAllGoals();
      setInitialLoad(true)
    }
  }, [initialLoad, getAllGoals]);

  const value = useMemo(() => ({error, loading, goalsLijst}), [error, loading, goalsLijst]);

  return (
    <GoalsContext.Provider value={value}>
      {children}
    </GoalsContext.Provider>
  );
};
