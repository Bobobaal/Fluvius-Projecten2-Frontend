import { Box, HStack, Image, Text, Button, CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { useMemo } from "react";

//Contexts
import { useGoalsContext } from "../context/GoalsContext";

export default function Doelstelling({ id, naam, icoon, vooruitgang, goal, subDoelstellingen }) {
  const { goalsLijst } = useGoalsContext();
  const history = useHistory();
  const heeftSubdoelstellingen = Boolean(subDoelstellingen.length > 0);
  const aantalSubdoelstellingen = useMemo(() => {
    return subDoelstellingen.length;
  },[subDoelstellingen])

  const goToDoelstelling = () => {
    history.push(`/doelstelling/${id}`)
  }

  return (
    <Box bg="#CDDCE0" w="48%" p={4} borderRadius={20} minW="45%" data-cy="doelstelling">
      <HStack>
          <Image
            src={icoon}
            alt={`Icoon voor doelstelling genaamd ${naam}`}
            boxSize="70px"
            borderRadius={10}
            data-cy="doelstelling_icoon"
          />

          <Text flex="1 1 auto" className="subtitle" lineHeight="65px" data-cy="doelstelling_naam">{naam}</Text>

          <Image
            key={goal}
            src={`/images/SDGs/${goalsLijst.find((g) => g.id === goal)?.icoon}`}
            alt="Goal"
            boxSize="70px"
            borderRadius={10}
            data-cy="doelstelling_goal"
          />
      </HStack>
      <Text className="vooruitgangText">Vooruitgang: </Text>
      <CircularProgress size="50px" value={vooruitgang} color={vooruitgang >= 100 ? 'green' : vooruitgang >= 75 ? 'green.300' : vooruitgang >= 50 ? 'yellow.300' : vooruitgang > 25 ? 'orange.500' : 'red.600'}>
        <CircularProgressLabel className="cirkelLabel">{`${vooruitgang}%`}</CircularProgressLabel>
      </CircularProgress>
      {heeftSubdoelstellingen ? (
        <>
          <Text className="titelSubdoelstellingText">{`Subdoelstellingen (${aantalSubdoelstellingen}):`}</Text>

          <HStack>
            {subDoelstellingen.map(subdoelstelling => {
              return (
                <Box key={subdoelstelling.id} className="subDoelstellingBox" data-cy="doelstelling_subdoelstelling">
                  <Text className="subDoelstellingText" data-cy="doelstelling_subdoelstelling_naam">{subdoelstelling.naam}</Text>
                </Box>
              );
            })}
          </HStack>
        </>
      ) : (
        <>
          <Text className="titelSubdoelstellingText">Deze doelstelling heeft geen subdoelstellingen.</Text>
        </>
      ) }

      <Button className="button2" onClick={goToDoelstelling}>Details doelstelling</Button>
    </Box>
  );
}