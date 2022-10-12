import { Flex, Button, HStack, CircularProgress, CircularProgressLabel, Spinner } from "@chakra-ui/react";
import { React, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

//Context
import { useDoelstellingContext } from "../context/DoelstellingContext";
import { useSession } from '../context/AuthContext';


// Components
import LineChart from "../components/LineChart";
import PieChart from "../components/PieChart";

export default function DashboardDoelstelling({ id }) {  
    const { hasRole } = useSession();
    const { doelstellingLijst } = useDoelstellingContext();
    const [ doelstelling, setDoelstelling ] = useState();
    const history = useHistory();

    useEffect(() => {
        setDoelstelling(doelstellingLijst.find((doel) => doel.id === id))
    }, [setDoelstelling, id, doelstellingLijst]);

    const goToDoelstelling = () => {
        history.push(`/doelstelling/${id}`)
    }

    if (doelstelling) {
        return (
            <>
                <Flex 
                    direction='column' w={{base:'100%', xl: '48%'}} 
                    bgColor='white'
                    border='1px solid #484848' borderRadius={30}
                    data-cy="dashboard_doelstelling"
                >
                    <Flex w='100%' data-cy="dashboard_doelstellingChart">
                    {doelstelling.dataType === 0 && (
                        <LineChart 
                            data={doelstelling.chart}
                            title={doelstelling.naam}
                            height={'100%'}
                            width={'100%'}
                        />
                    )}
                    {doelstelling.dataType === 1 && (
                        <PieChart 
                            data={doelstelling.chart}
                            title={doelstelling.naam}
                            height={'100%'}
                            width={'100%'}
                        />
                    )}
                    </Flex>
                    <HStack p={2} align='center'>
                        <CircularProgress size="50px"
                            value={doelstelling.vooruitgang} 
                            color={
                                doelstelling.vooruitgang >= 100 ? 'green' : 
                                doelstelling.vooruitgang >= 75 ? 'green.300' : 
                                doelstelling.vooruitgang >= 50 ? 'yellow.300' : 
                                doelstelling.vooruitgang > 25 ? 'orange.500' : 'red.600'
                            }
                            data-cy="dashboard_doelstellingVooruitgang"
                        >
                            <CircularProgressLabel className="cirkelLabel">{`${doelstelling.vooruitgang}%`}</CircularProgressLabel>
                        </CircularProgress>
                        <Flex  flex='1 1 auto' />
                        { hasRole(1, 2, 3) && (
                            <Button 
                                onClick={goToDoelstelling}
                                alignSelf='end' justifySelf='end'
                                className='button2' m={3}
                                data-cy="dashboard_doelstellingDetails"
                            >
                                Details
                            </Button>
                        )}
                    </HStack>
                </Flex>
            </>
        );
    }

    return (
        <>
            <Flex
                    justify='center' gap={2}
                    borderRadius={10}
            >
                <Spinner data-cy="loading" size="sm" m={7} /> 
            </Flex>
        </>
    );
}
