import {
  createContext,
  useState,
  useCallback,
  useMemo,
  useContext,
} from "react";
import * as dashboardAPI from "../api/dashboard";
import config from "../config.json";

const DASHBOARD_NAAM = config.dashboard_naam;
const DASHBOARD_ROL = config.dashboard_rol;
const DASHBOARD_PRIMAIR = config.dashboard_primair;

export const DashboardContext = createContext();
export const useDashboardContext = () => useContext(DashboardContext);

export const DashboardProvider = ({ children }) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [templateLijst, setTemplateLijst] = useState([]);
  const [primaryTemplate, setPrimaryTemplate] = useState();
  const [template, setTemplate] = useState();

  const [naam, setNaam] = useState(localStorage.getItem(DASHBOARD_NAAM));
  const [rol, setRol] = useState(localStorage.getItem(DASHBOARD_ROL));
  const [primair, setPrimair] = useState(
    localStorage.getItem(DASHBOARD_PRIMAIR)
  );

  //De categorieen met de doelstellingen die het dashboard vormen
  const [dashboardData, setDashboardData] = useState({ categorieen: [] });
  //De categorieen die kunnen toegevoegd worden aan het dashboard en nog niet toegevoegd zijn
  //Bestaat uit object met naam en id
  const [filteredCat, setFilteredCat] = useState([]);
  //ID van categorie wordt bijgehouden voor het offcanvas op dan de doelstellingen ervan op de halen
  const [catId, setCatId] = useState();

  //Zet de naam en rol in de localstorage
  const setDashboardValues = useCallback(async (naam, rol, primair) => {
    setNaam(naam);
    setRol(rol);
    setPrimair(primair);
    localStorage.setItem(DASHBOARD_NAAM, naam);
    localStorage.setItem(DASHBOARD_ROL, rol);
    localStorage.setItem(DASHBOARD_PRIMAIR, primair);
  }, []);

  //Categorie toevoegen aan dashboard
  const addCategorie = useCallback(
    async (catId) => {
      //Voeg categorie toe aan dashboard
      if (!dashboardData.categorieen.map((cat) => cat.id).includes(catId)) {
        const categorieen = [
          ...dashboardData.categorieen,
          { id: catId, doelstellingen: [] },
        ];
        setDashboardData({ categorieen: [...categorieen] });

        //verwijder categorie uit filteredCat
        const filter = await filteredCat.filter((cat) => cat.id !== catId);
        setFilteredCat(filter);
      }
    },
    [dashboardData, filteredCat]
  );

  //Doelstelling toevoegen aan dashboard
  const addDoelstelling = useCallback(
    async (doelId, catId) => {
      // console.log(dashboardData.categorieen.find((cat) => (cat.id = catId)));
      const categorie = dashboardData.categorieen.find(
        (cat) => cat.id === catId
      );
      if (!categorie.doelstellingen.includes(doelId)) {
        categorie.doelstellingen = [...categorie.doelstellingen, doelId];
        await setDashboardData({ categorieen: dashboardData.categorieen });
      }
    },
    [dashboardData]
  );

  //Categorie verwijderen van dashboard
  const removeCategorie = useCallback(
    async (catId, naam) => {
      //Verwijder cat uit dashboard
      const categorieen = dashboardData.categorieen.filter(
        (cat) => cat.id !== catId
      );
      setDashboardData({ categorieen: [...categorieen] });

      //Voeg cat toe aan filteredCat
      const addCat = [...filteredCat, { id: catId, naam: naam }];
      setFilteredCat(addCat);
    },
    [dashboardData.categorieen, filteredCat]
  );

  //Doelstelling verwijderen aan dashboard
  const removeDoelstelling = useCallback(
    async (doelId, catId) => {
      const categorie = dashboardData.categorieen.find(
        (cat) => cat.id === catId
      );
      if (categorie.doelstellingen.includes(doelId)) {
        categorie.doelstellingen = categorie.doelstellingen.filter(
          (doel) => doel !== doelId
        );

        await setDashboardData({ categorieen: dashboardData.categorieen });
      }
    },
    [dashboardData]
  );

  const submitDashboard = useCallback(
    async (id) => {
      try {
        setError();
        setLoading(true);
        const personaliseerbaar = rol === "0" ? false : true;

        const data = await dashboardAPI.saveDashboard(
          id,
          naam,
          rol,
          localStorage.getItem(DASHBOARD_PRIMAIR),
          personaliseerbaar,
          dashboardData.categorieen
        );

        localStorage.removeItem(DASHBOARD_NAAM);
        localStorage.removeItem(DASHBOARD_ROL);
        localStorage.removeItem(DASHBOARD_PRIMAIR);
        setDashboardData({ categorieen: [] });
        setRol("0");
        setNaam("");
        setPrimair(false);
        return data;
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    },
    [dashboardData.categorieen, naam, rol]
  );

  const personaliseerDashboard = useCallback(async () => {
    try {
      setError();
      setLoading(true);

      let data = null

      //Als de template al gepersonaliseerd is
      if (!primaryTemplate.naam) {
        data = await dashboardAPI.personaliseerDashboard(
          primaryTemplate.id,
          null,
          dashboardData.categorieen
        );
      } else {
        data = await dashboardAPI.personaliseerDashboard(
          null,
          primaryTemplate.id,
          dashboardData.categorieen
        );
      }

      setDashboardData({ categorieen: [] });
      setPrimaryTemplate(data.data);
      return data;
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [dashboardData.categorieen, naam, rol]);

  const getAllTemplates = useCallback(async () => {
    try {
      setError();
      setLoading(true);
      const data = await dashboardAPI.getAll();
      setTemplateLijst(data.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const getTemplateById = useCallback(async (id) => {
    try {
      setError();
      setLoading(true);
      const data = await dashboardAPI.getById(id);
      setTemplate(data.data);
      return data.data;
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  });

  const removeTemplate = useCallback(async (id) => {
    try {
      setError();
      setLoading(true);
      await dashboardAPI.remove(id);

      getAllTemplates();
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  });

  const getPrimaryTemplate = useCallback(async () => {
    try {
      setError();
      setLoading(true);
      const data = await dashboardAPI.getPrimaryTemplate();

      setDashboardData({ categorieen: data.data.categorieen });
      setPrimaryTemplate(data.data);

    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  });

  const value = useMemo(
    () => ({
      error,
      loading,
      naam,
      rol,
      primair,
      addCategorie,
      removeCategorie,
      addDoelstelling,
      removeDoelstelling,
      dashboardData,
      filteredCat,
      setFilteredCat,
      catId,
      setCatId,
      setDashboardValues,
      setDashboardData,
      submitDashboard,
      getAllTemplates,
      templateLijst,
      getTemplateById,
      template,
      removeTemplate,
      primaryTemplate,
      getPrimaryTemplate,
      personaliseerDashboard,
      setError,
    }),
    [
      error,
      loading,
      naam,
      rol,
      primair,
      addCategorie,
      removeCategorie,
      addDoelstelling,
      removeDoelstelling,
      dashboardData,
      filteredCat,
      catId,
      setDashboardValues,
      submitDashboard,
      getAllTemplates,
      templateLijst,
      getTemplateById,
      template,
      removeTemplate,
      primaryTemplate,
      getPrimaryTemplate,
      personaliseerDashboard,
      setError,
    ]
  );

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};
