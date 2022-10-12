import {
    createContext,
    useState,
    useCallback,
    useMemo,
    useContext,
} from "react";
import * as datasourceApi from '../api/datasource';

export const DatasourceContext = createContext();
export const useDatasourceContext = () => useContext(DatasourceContext);

export const DatasourceProvider = ({ children}) => {
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
  
    const [datasource, setDatasource] = useState();
    const [datasourceLijst, setDatasourceLijst] = useState([]);

    const getAllDatasources = useCallback(async () => {
        try {
            setError();
            setLoading(true);
            const data = await datasourceApi.getAll();
            setDatasourceLijst(data.data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }, []);

    const getDatasource = useCallback(async(id) => {
        try {
            setError();
            setLoading(true);
            const data = await datasourceApi.getById(id);
            setDatasource(data.data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }, []);

    const markeerAlsFoutief = useCallback(async(id, foutief, boodschap) => {
        try {
            setError();
            setLoading(true);
            await datasourceApi.patchById(id, foutief, boodschap);
            getAllDatasources()
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }, [getAllDatasources])

    const value = useMemo(() => ({
        error,
        loading,
        datasource,
        datasourceLijst,
        getAllDatasources,
        getDatasource,
        markeerAlsFoutief,
    }), [
        error,
        loading,
        datasource,
        datasourceLijst,
        getAllDatasources,
        getDatasource, 
        markeerAlsFoutief,
    ]);

    return (
        <DatasourceContext.Provider value={value}>
            {children}
        </DatasourceContext.Provider>
    );
};