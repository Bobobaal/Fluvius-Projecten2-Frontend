import {
  Flex, Box, Spinner, Text, Grid
} from "@chakra-ui/react";
import { React, useEffect, useState } from "react";

//Context
import { useDashboardContext } from "../context/DashboardContext";
import { useCategorieContext } from "../context/CategorieContext";
import { useDoelstellingContext } from '../context/DoelstellingContext';

// Component
import DashboardCategorie from '../components/DashboardCategorie';
import ErrorMessage from "../components/ErrorMessage";

export default function Dashboard() {
  const { primaryTemplate, getPrimaryTemplate, loading, error } = useDashboardContext();
  const { getAllCategorieen } = useCategorieContext();
  const { getAllDoelstellingen } = useDoelstellingContext();
  const [initialLoad, setInitialLoad] = useState(false);

  useEffect(() => {
      if (!initialLoad) {
          getPrimaryTemplate();
          getAllCategorieen();
          getAllDoelstellingen();
          setInitialLoad(true);
      }
  }, [initialLoad, getPrimaryTemplate, getAllCategorieen, getAllDoelstellingen]);

  if (loading) {
    return (
      <Flex mx={5} direction='column' align='center'>
        <Text className='title' >Dashboard</Text>
        <Spinner size="xl" data-cy="loading" my={10} mx='auto'/> 
      </Flex>
    );
  }

  if (error) {
    return (    
      <Flex mx={5} direction='column' align='center'>
        <Text className='title' >Dashboard</Text>
        <ErrorMessage error={error} />
      </Flex>
    );
  }

  return (
    <>
      <Box mx={5}>
        <Text className='title' textAlign='center'>Dashboard</Text>
      </Box>
      <Grid  
        templateColumns={{base:"repeat(1, 1fr)", lg:"repeat(2, 1fr)"}} 
        gap={4} px={5} 
      >
        { Boolean(primaryTemplate)  && primaryTemplate?.categorieen?.map((categorie) => {
            return (
                <DashboardCategorie 
                  key={categorie.id} 
                  id={categorie.id}
                  doelstellingen={categorie.doelstellingen}
                />
            );
        })}
      </Grid>
    </>
  )
}