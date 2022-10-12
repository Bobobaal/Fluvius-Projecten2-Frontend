import { React, useState, useEffect, useCallback } from "react";
import {
  Text,
  HStack,
  Button,
  Flex,
  useDisclosure,
  Box,
  Wrap,
  Spinner,
  Alert,
  AlertIcon,
  InputGroup,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

//Context
import { useDashboardContext } from "../context/DashboardContext";
import { useCategorieContext } from "../context/CategorieContext";
import { useDoelstellingContext } from "../context/DoelstellingContext";

//Components
import OffCanvasDoelstelling from "../components/OffCanvasDoelstelling";
import OffCancasCategorie from "../components/OffCanvasCategorie";
import ErrorMessage from "../components/ErrorMessage";

export default function DashboardStap2() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getAllCategorieen } = useCategorieContext();
  const { getAllDoelstellingen, setDoelstellingLijst } =
    useDoelstellingContext();
  const {
    setFilteredCat,
    rol,
    submitDashboard,
    error,
    loading,
    getPrimaryTemplate,
    personaliseerDashboard,
  } = useDashboardContext();
  const [initialLoad, setInitialLoad] = useState(true);
  const history = useHistory();
  const { id } = useParams();
  const [succes, setSucces] = useState(false);

  //haalt de categorieen op en filtert ze op rol
  useEffect(() => {
    async function fetchData() {
      const categorieen = await getAllCategorieen();
      const doelstellingen = await getAllDoelstellingen();

      const filterDoel = doelstellingen.filter((doel) =>
        doel.rollen.includes(rol)
      );
      await setDoelstellingLijst(filterDoel);

      const filterCat1 = categorieen.filter((cat) => cat.rollen.includes(rol));
      const filterCat2 = filterCat1.map((cat) => {
        return { id: cat.id, naam: cat.naam };
      });
      setFilteredCat(filterCat2);

      if (window.location.pathname === "/dashboard/stap2/personaliseer") {
        await getPrimaryTemplate();
      }

      setInitialLoad(false);
    }
    if (initialLoad) {
      fetchData();
    }
  }, []);

  // useEffect(() => {
  //     if (window.location.pathname === "/dashboard/stap2/personaliseer") {
  //       if(!primaryTemplate){
  //         getPrimaryTemplate();
  //         console.log("p")
  //       }

  //     }
  // })

  const submit = async () => {
    let data = {};
    if (window.location.pathname === "/dashboard/stap2/personaliseer") {
      data = await personaliseerDashboard();
    } else {
      data = await submitDashboard(id);
    }
      // if (error) {
      //   console.log(error);
      // }
      // if (!error) {
      //   history.replace("/dashboard/lijst");
      // }
      if (data) {
        setSucces(true);
      }

  };

  const terug = () => {
    id
      ? history.replace(`/dashboard/stap1/${id}`)
      : history.replace(`/dashboard/stap1`);
  };

  const succesMsg = () => {
    if (window.location.pathname === "/dashboard/stap2/personaliseer") {
      history.replace("/dashboard")
    } else {
      history.replace("/dashboard/lijst")
    }
    
  }


  if (loading) {
    return (
      <Box mx={5}>
        <Text className="title">Dashboard</Text>
        <Spinner size="xl" my={10} mx="auto" />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert
      status="error"
      m={"10px auto"}
      width="90%"
      borderRadius={"5px"}
    >
      <AlertIcon />
      <ErrorMessage error={error} />
      <Button
        backgroundColor={"#e74f4f"}
        ml="auto"
        // onClick={() => setError()}
      >
        Begrepen
      </Button>
    </Alert>
    );
  }
  if (succes) {
    return (
      <Alert status="success" m={"40px auto"} width="90%" borderRadius={"5px"} data-cy="succesAlert">
        <AlertIcon />
        Dashboard succesvol opgeslagen
        <Button
          backgroundColor={"#3eb475"}
          ml="auto"
          onClick={succesMsg}
          data-cy="succes"
        >
          {window.location.pathname === "/dashboard/stap2/personaliseer"? ("Naar template"): ("Ga terug")}
        </Button>
      </Alert>
    );
  }else{

  return (
    <Flex flexDirection="column" alignItems={"center"}>
      <Text className="subtitle">
        Voeg de categorieën en doelstellingen toe
      </Text>

      <Wrap margin={"10px"}>
        <Button className="buttonGreen" w={"250px"} onClick={onOpen}>
          Voeg categorie toe
        </Button>
        <Button className="buttonGreen" w={"250px"} onClick={submit} data-cy="submitTemplate">
          {window.location.pathname === "/dashboard/stap2/personaliseer"
            ? "Personaliseer"
            : id
            ? "Wijzig dashboard"
            : "Maak dashboard"}
        </Button>
        {window.location.pathname !== "/dashboard/stap2/personaliseer" ? (
          <Button className="buttonGreen" w={"250px"} onClick={terug}>
            Terug
          </Button>
        ) : null}
      </Wrap>

      <OffCancasCategorie
        isOpen={isOpen}
        onClose={onClose}
      ></OffCancasCategorie>
      <CategoriePanel></CategoriePanel>
    </Flex>
  );}
}

function CategoriePanel() {
  const { dashboardData } = useDashboardContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { categorieLijst } = useCategorieContext();

  return (
    <Wrap>
      {dashboardData.categorieen &&
        dashboardData.categorieen.map((cat) => {
          const categorie = categorieLijst.find((c) => c.id === cat.id);
          if (!categorie) {
            return null;
          }
          return (
            <Categorie
              key={categorie.id}
              catId={categorie.id}
              catNaam={categorie.naam}
              onOpen={onOpen}
            />
          );
        })}
      <OffCanvasDoelstelling
        isOpen={isOpen}
        onClose={onClose}
      ></OffCanvasDoelstelling>
    </Wrap>
  );
}

function Categorie({ catId, catNaam, onOpen }) {
  const { removeCategorie, setCatId, dashboardData, removeDoelstelling } =
    useDashboardContext();
  const [addedDoelstellingen, setAddedDoelstellingen] = useState([]);
  const { doelstellingLijst } = useDoelstellingContext();

  useEffect(() => {
    async function fetchData() {

      const doellenId = await dashboardData.categorieen.find(
        (cat) => cat.id === catId
      ).doelstellingen;
  
      const data = await doellenId.map((doelId) => {
        return doelstellingLijst.find(
          (doelstelling) => doelstelling.id === doelId
        );
      });

      setAddedDoelstellingen(data);
    }



    fetchData();
  }, [catId, dashboardData, doelstellingLijst]);

  const remove = (id, naam) => {
    removeCategorie(id, naam);
  };

  const addDoelstellingCanvas = useCallback(
    (id) => {
      setCatId(id);
      onOpen();
    },
    [setCatId, onOpen]
  );

  const verwijderDoelstelling = (doelId) => {
    removeDoelstelling(doelId, catId);
  };

  return (
    <>
      <Box key={catId} bg="#CDDCE0" borderRadius={20}>
        <Text className="subtitle" p="5px" textAlign={"center"}>
          {catNaam}
        </Text>
        <HStack>
          <Button
            className="button2"
            margin={"10px"}
            onClick={() => addDoelstellingCanvas(catId)}
          >
            Voeg een doelstelling toe
          </Button>
          <Button
            className="button2"
            margin={"10px !important"}
            onClick={() => remove(catId, catNaam)}
          >
            Verwijder categorie
          </Button>
        </HStack>
        {addedDoelstellingen &&
          addedDoelstellingen.map((doel) => {
            if (!doel) {
              return null;
            }
            return (
              <Box
                key={doel.id}
                bgColor={"white"}
                m="8px"
                p="3px"
                borderRadius={"8px"}
                display="flex"
              >
                <Text className="titelSubdoelstellingText">{doel.naam}</Text>
                <Button
                  m={"0 2px 0 auto"}
                  h="30px"
                  onClick={() => verwijderDoelstelling(doel.id)}
                >
                  Verwijder
                </Button>
              </Box>
            );
          })}
      </Box>
    </>
  );
}
