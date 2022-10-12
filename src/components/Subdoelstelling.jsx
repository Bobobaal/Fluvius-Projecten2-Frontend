import { Box, HStack, Text, Table, Tr, Td, Tbody} from "@chakra-ui/react";
import { useMemo } from "react";
import {IoSearchSharp} from "react-icons/io5";

export default function SubDoelstelling({ hoofdDoelstellingId, id, naam, dataType, drempelwaarde, huidigewaarde, chart, data }) {
  const drempelWaardes = useMemo(() => {
    return drempelwaarde.split(", ");
  }, [drempelwaarde]);
  const huidigeWaardes = useMemo(() => {
    return huidigewaarde.split(", ");
  }, [huidigewaarde]);

  return (
    <Box width="25%" bg="#CDDCE0" borderRadius={20} data-cy="doelstelling_subdoelstelling">
      <HStack>
        <Text className="subDoelstellingNaam" m="10px" flex="1 1 auto" data-cy="doelstelling_subdoelstelling_naam">{naam}</Text>
        <a href={`/doelstelling/${hoofdDoelstellingId}/${id}`}>
          <IoSearchSharp className="searchIconSubdoelstelling"/>
        </a>
      </HStack>
      <Table variant="simple" width="95%" m="10px">
        <Tbody>
          <Tr>
            <Td className="tableRightBorder tableCell"><Text align="right">Huidige waarde</Text></Td>
            <Td className="tableCell">{huidigeWaardes.map(waarde => {
                    return (<Text key={waarde} data-cy="doelstelling_subdoelstelling_huidigeWaarde">{dataType === 0 ? waarde + " " + chart.yLabel : waarde}</Text>)
                  })}</Td>
          </Tr>
          <Tr>
            <Td className="tableRightBorder tableCell middleCell"><Text align="right">Drempelwaarde</Text></Td>
            <Td className="tableCell middleCell">{drempelWaardes.map(waarde => {
                    return (<Text key={waarde} data-cy="doelstelling_subdoelstelling_drempelWaarde">{dataType === 0 ? waarde + " " + chart.yLabel : waarde}</Text>)
                  })}</Td>
          </Tr>
          <Tr>
            <Td className="tableRightBorder tableCell"><Text align="right">Datasource(s)</Text></Td>
            <Td className="tableCell" data-cy="doelstelling_subdoelstelling_datasource_naam">{data[0].naam}</Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
}