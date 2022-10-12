import { Box, Image, Text, HStack, Button } from "@chakra-ui/react";
import { useGoalsContext } from "../context/GoalsContext";
import { useHistory } from "react-router-dom";

export default function Categorie({ id, naam, goals }) {
  const { goalsLijst } = useGoalsContext();
  const history = useHistory();

  const goToCategorie = () => {
    history.replace(`/categorie/${id}`);
  };

  return (
    <Box bg="#CDDCE0" w={{base: "100%", lg: "47%"}} p={4} borderRadius={20} minW="45%" data-cy="categorie">
      <HStack>
        <Text flex="1 1 auto" className="subtitle" data-cy="categorie_naam">{naam}</Text>

        <Button className="button2" align="right" onClick={goToCategorie}>
          Ga naar categorie
        </Button>
      </HStack>

      <HStack>
        {goals.map((goalId) => {
          return (
            <Image
              key={goalId}
              src={`/images/SDGs/${
                goalsLijst.find((g) => g.id === goalId)?.icoon
              }`}
              alt="Goal"
              boxSize={{base:"40px", md: "65px"}}
              // boxSize="70px"
              m="5px"
              borderRadius={10}
              display="inline-flex"
              data-cy="categorie_goals"
            />
          );
        })}
      </HStack>
    </Box>
  );
}
