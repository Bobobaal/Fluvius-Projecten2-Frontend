import {Flex, Text, Wrap, VStack, Image, Spinner } from "@chakra-ui/react";
import { React, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

// Context
import { useCategorieContext } from "../context/CategorieContext";
import { useGoalsContext } from "../context/GoalsContext";

// Component
import DashboardDoelstelling from '../components/DashboardDoelstelling';

export default function DashboardCategorie({ id, doelstellingen }) {  
    const { categorieLijst } = useCategorieContext();
    const { goalsLijst } = useGoalsContext(); 
    const [ categorie, setCategorie ] = useState()
    const history = useHistory();

    const goToCategorie = () => {
      history.replace(`/categorie/${id}`);
    };
    
    useEffect(() => {
        setCategorie(categorieLijst.find((cat) => cat.id === id))
    }, [setCategorie, id, categorieLijst]);

    if (categorie) {
        return (
            <>
                <VStack
                    align='center' justify='start' gap={2}
                    bg="#CDDCE0" 
                    borderRadius={20}
                    py={3}
                    data-cy="dashboard_categorie"
                >
                    <VStack onClick={goToCategorie} align='center' justify='start'>
                        <Text className='title' data-cy="dashboard_categorieNaam">{categorie.naam}</Text>
                        <Wrap justify='center' >
                            {categorie.goals.map((goalId) => {
                                return (
                                    <Image
                                        key={goalId}
                                        src={`../images/SDGs/${goalsLijst.find((g) => g.id === goalId)?.icoon}`}
                                        alt="Goal"
                                        boxSize='3.5rem' borderRadius={5}
                                        data-cy="dashboard_goal"
                                    />
                                );
                            })}
                        </Wrap>
                    </VStack>
                    <Wrap justify='center' width='100%' px={2}>
                    { doelstellingen && doelstellingen.map((doelId) => {
                        return ( 
                            <DashboardDoelstelling
                                key={doelId} 
                                id={doelId}
                            />
                        );
                    })}
                    </Wrap>
                </VStack>
            </>
        );
    }

    return (
        <>
            <Flex
                    justify='center' gap={2}
                    bg="#CDDCE0"
                    borderRadius={10}
            >
                <Spinner data-cy="loading" size="xl" my={10} mx='auto'/> 
            </Flex>
        </>
    );

}