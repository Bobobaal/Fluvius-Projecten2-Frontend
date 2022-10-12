import {
  Box,
  Flex,
  Spinner,
  Grid,
  GridItem,
  Text,
  HStack,
  Button,
  Wrap,
  Checkbox,
} from "@chakra-ui/react";
import { React, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

//Context
import { useDashboardContext } from "../context/DashboardContext";

// Component
import ErrorMessage from "../components/ErrorMessage";

export default function DashboardLijst() {
  const history = useHistory();
  const {
    getAllTemplates,
    templateLijst,
    error,
    loading,
    removeTemplate,
    getTemplateById,
    setDashboardValues,
    setDashboardData,
  } = useDashboardContext();

  const [initialLoad, setInitialLoad] = useState(false);

  useEffect(() => {
    async function fetchData() {
      getAllTemplates();
    }
    if (!initialLoad) {
      fetchData();
      setInitialLoad(true);
    }
  }, [initialLoad, getAllTemplates]);

  const createDashboard = () => {
    history.replace(`/dashboard/stap1`);
  };

  const wijzig = async (id) => {
    const temp = await getTemplateById(id);
    await setDashboardValues(temp.naam, temp.rol, temp.primair);
    await setDashboardData({ categorieen: temp.categorieen });
    history.replace(`/dashboard/stap1/${id}`);
  };

  const verwijder = (id) => {
    removeTemplate(id);
  };

  const rolToText = (rol) => {
    switch (rol) {
      case 0:
        return "Iedereen";
      case 1:
        return "Directie";
      case 2:
        return "Manager";
      case 3:
        return "Coördinator";
      default:
        return "Rol niet gevonden";
    }
  };

  if (loading) {
    return (
      <Box mx={5}>
        <Text className="title">dashboards</Text>
        <Spinner size="xl" my={10} mx="auto" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box mx={5}>
        <Text className="title">dashboards</Text>
        <ErrorMessage error={error} />
      </Box>
    );
  }

  return (
    <>
      <Box p={5}>
        <Text className="title" textAlign={"center"}>
        Dashboards
        </Text>

        <Wrap m="20px" spacing="20px">
          {templateLijst.map((temp) => {
            return (
              <Box
                key={temp.id}
                bg="#CDDCE0"
                w="48%"
                p={"0px 10px 10px 10px"}
                borderRadius={10}
                // minW="45%"
                minW="350px"
                data-cy="template"
              >
                <Text p={2} className="subtitle">
                  {temp.naam}
                </Text>
                <Text>Zichtbaarheid: {rolToText(temp.rol)}</Text>
                <HStack>
                  <Text>Primaire dashboard voor deze rol:</Text>
                  <Checkbox
                    isDisabled
                    defaultChecked={temp.primair}
                    mt={"4px"}
                  />
                </HStack>
                <HStack>
                  <Button className="button2" onClick={() => wijzig(temp.id)} data-cy="wijzig">
                    Wijzig
                  </Button>
                  <Button
                    className="button2"
                    onClick={() => verwijder(temp.id)}
                    data-cy="removeBtn"
                  >
                    Verwijder
                  </Button>
                </HStack>
              </Box>
            );
          })}
        </Wrap>
        <Button className="buttonGreen" onClick={createDashboard} ml="20px" minW="350px">
            Maak een dashboard aan
          </Button>
      </Box>
    </>
  );
}
