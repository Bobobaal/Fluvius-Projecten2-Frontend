import { useEffect, useState, useMemo } from "react";
import { Grid, Text, Spinner, Box, Flex } from "@chakra-ui/react";

// Context
import { useDatasourceContext } from '../context/DatasourceContext';

// Component
import SearchBar from '../components/SearchBar';
import Datasource from '../components/Datasource';
import ErrorMessage from "../components/ErrorMessage";

export default function DatasourceLijstPage() {
    const { getAllDatasources, datasourceLijst, error, loading } = useDatasourceContext();
    const [initialLoad, setInitialLoad] = useState(false);
    const [search, setSearch] = useState("");

    useEffect(() => {
        if (!initialLoad) {
            getAllDatasources();
            setInitialLoad(true);
        }
    }, [initialLoad, getAllDatasources]);

    const filteredDatasourceLijst = useMemo(() => {
        return datasourceLijst.filter((data) => {
            return data.naam.toLowerCase().includes(search.toLowerCase())
        });
    },  [datasourceLijst, search])

    if (loading) {
        return (
            <Flex mx={5} direction='column' align='center'>
                <Text className='title' >Datasources</Text>
                <Spinner data-cy="loading" size="xl" my={10} mx='auto'/> 
            </Flex>
        );
    }
    
    if (error) {
        return (    
            <Flex mx={5} direction='column' align='center'>
                <Text className='title' >Datasources</Text>
                <ErrorMessage error={error} />
            </Flex>
        );
    }
    
    return (
        <>  
            <Box mx={5}>
                <Text className='title' textAlign='center'>Datasources ({datasourceLijst.length})</Text>
                <SearchBar setSearch={setSearch} placeholder='Zoek naar datasource' w='40%'/>
            </Box>
            <Grid templateColumns={{base:"repeat(1, 1fr)", md:"repeat(3, 1fr)"}} gap={4}  px={5}>
                {filteredDatasourceLijst && filteredDatasourceLijst
                    .sort((d1, d2) => d1.naam !== d2.naam ? d1.naam < d2.naam ? -1 : 1: 0)
                    .map((data) => {
                        return <Datasource 
                            key={data.id}  
                            id={data.id} 
                            naam={data.naam} 
                            foutief={data.foutief}
                            boodschap={data.boodschap}
                        />;
                })}
            </Grid>
        </>
    )
}
