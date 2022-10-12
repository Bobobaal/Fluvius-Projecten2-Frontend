import { useEffect, useMemo} from "react";
import { Text, Image, HStack, Divider, Table, Tbody, Tr, Td, Box, Wrap, Spinner} from "@chakra-ui/react";
import { useParams } from "react-router";

//Context
import { useGoalsContext } from "../context/GoalsContext";
import { useDoelstellingContext } from "../context/DoelstellingContext";

//Components
import SubDoelstelling from "../components/Subdoelstelling";
import Datasource from "../components/Datasource";
import ErrorMessage from "../components/ErrorMessage";

export default function DoelstellingPage({isSubdoelstelling}) {
  const {
    getDoelstelling,
    doelstelling,
    loading,
    error
  } = useDoelstellingContext();
  const { goalsLijst } = useGoalsContext();
  const { id, subDoelstellingId } = useParams();
  let subDoelstelling;
  const aantalSubdoelstellingen = useMemo(() => {
    return doelstelling?.subDoelstellingen?.length;
  }, [doelstelling]);

  useEffect(() => {
    async function fetchData() {
      getDoelstelling(id);
    }
    fetchData();
  }, [getDoelstelling, id]);

  if (loading) {
    return (
      <Box mx={5}>
        <Text className="title" textAlign={"center"}>Doelstelling</Text>
        <Spinner data-cy="loading" size="xl" my={10} mx="auto" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box mx={5}>
        <Text className="title" textAlign={"center"}>Doelstelling</Text>
        <ErrorMessage data-cy="error_message" error={error} />
      </Box>
    );
  }

  if (doelstelling) {
    if(isSubdoelstelling){
      subDoelstelling = doelstelling.subDoelstellingen.filter(subdoelstelling => {
        return subdoelstelling.id == subDoelstellingId;
      });
    }
    return (
      <>
      <Text className="title" textAlign={"center"}>Doelstelling</Text>
        <Box m="30px">
          <HStack>
            <Image
              src={isSubdoelstelling ? subDoelstelling[0].icoon : doelstelling.icoon}
              alt={`icoon van ${isSubdoelstelling ? "subdoelstelling" + subDoelstelling[0].naam : "doelstelling" + doelstelling.icoon}`}
              boxSize="100px"
              borderRadius={10}
              data-cy="doelstelling_icoon"
            />
            <Text flex="1 1 auto" className="title" ml={20} data-cy="doelstelling_naam">
              {isSubdoelstelling ? subDoelstelling[0].naam : doelstelling.naam}
            </Text>
            {isSubdoelstelling ? 
              null :
              <>
                <Image
                  key={doelstelling.goal}
                  src={`/images/SDGs/${goalsLijst.find((g) => g.id === doelstelling.goal)?.icoon}`}
                  alt="Goal"
                  boxSize="100px"
                  borderRadius={10}
                  data-cy="doelstelling_goal"
                />
              </>
            }
          </HStack>
          <Divider className="divider"/>
            <Table className="doelstellingTable" variant="simple" width="20%">
              <Tbody>
                <Tr>
                  <Td className="tableRightBorder tableCell"><Text align="right">Huidige waarde</Text></Td>
                  {isSubdoelstelling ? 
                  <Td className="tableCell">{subDoelstelling[0]?.huidigewaarde?.split(", ").map(waarde => {
                    return (<Text key={waarde} data-cy="doelstelling_huidigeWaarde">{subDoelstelling[0]?.dataType === 0 ? waarde + " " + subDoelstelling[0]?.chart.yLabel : waarde}</Text>)
                  })}</Td> : 
                  <Td className="tableCell">{doelstelling?.huidigewaarde?.split(", ").map(waarde => {
                    return (<Text key={waarde} data-cy="doelstelling_huidigeWaarde">{doelstelling.dataType === 0 ? waarde + " " + doelstelling.chart.yLabel : waarde}</Text>)
                  })}</Td>}
                </Tr>
                <Tr>
                  <Td className="tableRightBorder tableCell middleCell"><Text align="right">Drempelwaarde</Text></Td>
                  {isSubdoelstelling ? 
                  <Td className="tableCell">{subDoelstelling[0]?.drempelwaarde?.split(", ").map(waarde => {
                    return (<Text key={waarde} data-cy="doelstelling_drempelWaarde">{subDoelstelling[0]?.dataType === 0 ? waarde + " " + subDoelstelling[0]?.chart.yLabel : waarde}</Text>)
                  })}</Td> : 
                  <Td className="tableCell">{doelstelling?.drempelwaarde?.split(", ").map(waarde => {
                    return (<Text key={waarde} data-cy="doelstelling_drempelWaarde">{doelstelling.dataType === 0 ? waarde + " " + doelstelling.chart.yLabel : waarde}</Text>)
                  })}</Td>}
                </Tr>
              </Tbody>
            </Table>
          <Divider className="divider"/>
          <Text className="subtitle">Datasources</Text>
          <Wrap marginTop="20px" marginBottom="40px">
            {
              isSubdoelstelling ? 
                subDoelstelling[0].data.map(datasource => {
                  return (<Datasource key={datasource.id} id={datasource.id} naam={datasource.naam} foutief={datasource.foutief} boodschap={datasource.boodschap}/>)
                }):
                doelstelling.data.map(datasource => {
                  return (<Datasource key={datasource.id} id={datasource.id} naam={datasource.naam} foutief={datasource.foutief} boodschap={datasource.boodschap}/>)
                })
            }
          </Wrap>
          {!isSubdoelstelling ? (
            <>
              <Divider className="divider"/>
              <Text className="subtitle" marginBottom="15px">Subdoelstellingen ({aantalSubdoelstellingen})</Text>
              <Wrap>
                {doelstelling.subDoelstellingen.map(subdoelstelling => {
                  return (<SubDoelstelling key={subdoelstelling.id} hoofdDoelstellingId={id} id={subdoelstelling.id} naam={subdoelstelling.naam} dataType={subdoelstelling.dataType} drempelwaarde={subdoelstelling.drempelwaarde} huidigewaarde={subdoelstelling.huidigewaarde} chart={subdoelstelling.chart} data={subdoelstelling.data}/>)
                })}
              </Wrap>
            </>
          ) : null}
        </Box>
      </>
    );
  } else {
    return null;
  }
}