import { useEffect } from "react";
import { useParams } from "react-router";
import { 
    Text, Flex, Spinner, Box, HStack, Button,
    Grid, GridItem 
} from "@chakra-ui/react";
import { IoAlertCircleSharp } from "react-icons/io5";
import { useHistory } from "react-router-dom";

// Context
import { useDatasourceContext } from "../context/DatasourceContext";

// Components
import ErrorMessage from "../components/ErrorMessage";
import LineChart from "../components/LineChart";
import PieChart from "../components/PieChart";


export default function DatasourcePage() {
    const { getDatasource, datasource, error, loading } = useDatasourceContext();
    const { id } = useParams();
    const history = useHistory();

    const typeSizes = {
        "undefined": () => 0,
        "boolean": () => 4,
        "number": () => 8,
        "string": item => 2 * item.length,
        "object": item => !item ? 0 : Object
          .keys(item)
          .reduce((total, key) => sizeOf(key) + sizeOf(item[key]) + total, 0)
      };
      
      const sizeOf = value => typeSizes[typeof value](value);
    
    useEffect(() => {
        getDatasource(id);
    }, [getDatasource, id])

    const goBack = () => {
        history.replace('/datasource')
      };

    if (loading) {
        return (
            <Box mx={5}>
                <Text className='title'>Datasource {id}</Text>
                <Spinner size="xl" data-cy="loading" my={10} mx='auto'/> 
            </Box>
        );
    }

    if (error) {
        return (    
            <Box mx={5}>
                <Text className='title'>Datasource {id}</Text>
                <ErrorMessage error={error} />
            </Box>
        );
    }

    if (datasource) {
        return (
            <Box mx={5}>
                <HStack>
                    <Text flex='1 1 auto'className='title'>Datasource {id}</Text>
                    <Button onClick={goBack} className='button2'>Terug</Button>
                </HStack>
                <Text className='subtitle' data-cy="datasource_naam">{datasource.naam}</Text>
                {datasource.foutief && (
                    <Flex 
                        direction='row' align='center' gap={3}
                        border='solid 1px red' borderRadius={7}
                        p={2} my={2} bgColor='#FFCCCC'
                        data-cy="datasource_foutbox"
                    >
                        <IoAlertCircleSharp className='errormsg'/>
                        <Text data-cy="datasource_foutboodschap" className='errormsg'>FOUT GERAPPORTEERD: {datasource.boodschap}</Text>
                    </Flex>
                )}
                <Text data-cy="datasource_grootte">Grootte: {sizeOf(datasource.data)} bytes</Text>
                <Text>Preview:</Text>
                <Box 
                    border='solid 1px black' bgColor='#F8F8F8' borderRadius={7} 
                    m={5} p={3} maxW='fit-content'
                    data-cy="datasource_preview"
                >
                {datasource.type === 0 && (
                    <LineChart 
                        data={datasource.data}
                        title={datasource.naam}
                        height={250}
                        width={500}
                    />
                )}
                {datasource.type === 1 && (
                    <PieChart 
                        data={datasource.data}
                        title={datasource.naam}
                        height={250}
                        width={500}
                    />
                )}
                </Box>
                <Text>Waarden:</Text>
                <Grid templateColumns={{base:"repeat(1, 1fr)", md:`repeat(${Object.keys(datasource.data).length}, 1fr)`}}
                    gap={4}  p={5} data-cy="datasource_waarden"
                >
                    {Object.entries(datasource.data).map(([k1, v1]) => {
                        return (
                            <Box 
                                key={k1}
                                border='1px solid black'
                                borderRadius={10}
                            >
                                <GridItem 
                                    className='subtitle'
                                    bg='#CDDCE0'
                                    borderTopRadius={10}
                                    borderBottom='2px solid black' p={2}
                                >
                                    {k1}
                                </GridItem>
                                <GridItem p={2} borderBottomRadius={10}>
                                    {typeof v1 === 'object' ? (
                                        Object.entries(v1).map(([k2, v2]) => {
                                            return (
                                                <Text key={k2}>{v2}</Text>
                                            )})
                                        ) : ( v1
                                    )}
                                </GridItem>

                            </Box>
                        )
                    })}
                </Grid>
            </Box>
        );
    }

    return (
        <Box mx={5}>
            <Text className='title'>Datasource {id}</Text>
            <Spinner data-cy="loading" size="xl" my={10} mx='auto'/> 
        </Box>
    );
}