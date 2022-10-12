import { useEffect } from "react";
import { Text, Image, HStack, Wrap, Box, Spinner, Divider } from "@chakra-ui/react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

//Context
import { useGoalsContext } from "../context/GoalsContext";
import { useCategorieContext } from "../context/CategorieContext";

//Components
import Doelstelling from "../components/Doelstelling";
import ErrorMessage from "../components/ErrorMessage";

export default function CategorieLijst() {
  const {
    getCategorie,
    categorie,
    loading,
    error,
  } = useCategorieContext();
  const { goalsLijst } = useGoalsContext();
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      getCategorie(id);
    }
    fetchData();
  }, [getCategorie, id]);

  if (loading) {
    return (
      <Box mx={5}>
        <Text className="title" textAlign={"center"}>Categorie</Text>
        <Spinner data-cy="loading" size="xl" my={10} mx="auto" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box mx={5}>
        <Text className="title" textAlign={"center"}>Categorie</Text>
        <ErrorMessage error={error} />
      </Box>
    );
  }

  if (categorie) {
    return (
      <>
      <Text className="title" textAlign={"center"}>Categorie</Text>
      <Box m="30px">
        <HStack margin="10px">
          <Image
            src={categorie.icoon}
            alt={`icoon`}
            boxSize="100px"
            borderRadius={10}
          />
          <Text flex="1 1 auto" className="title" ml={20} data-cy="categorie_naam">
            {categorie.naam}
          </Text>
          <HStack spacing={"5"}>
            {categorie.goals.map((goalId) => {
              return (
                <Image
                  key={goalId}
                  src={`/images/SDGs/${
                    goalsLijst.find((g) => g.id === goalId)?.icoon
                  }`}
                  alt="Goal"
                  boxSize="100px"
                  borderRadius={10}
                  data-cy="categorie_goals"
                />
              );
            })}
          </HStack>
        </HStack>
        <Divider className="divider"/>
        <Wrap spacing={9} marginTop="5">
          {categorie.doelstellingen &&
            categorie.doelstellingen.map((doel) => {
              return (
                <Doelstelling
                  key={doel.id}
                  id={doel.id}
                  naam={doel.naam}
                  icoon={doel.icoon}
                  vooruitgang={doel.vooruitgang}
                  goal={doel.goal}
                  subDoelstellingen={doel.subDoelstellingen}
                />
              );
            })}
        </Wrap>
      </Box>
      </>
    );
  } else {
    return null;
  }
}
