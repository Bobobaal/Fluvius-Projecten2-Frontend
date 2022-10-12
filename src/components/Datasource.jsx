import { useCallback, useState, useEffect } from 'react';
import { Flex, Text, HStack, Button, Input } from "@chakra-ui/react";
import { IoSearch, IoAlertCircle } from "react-icons/io5";
import { useHistory } from "react-router-dom";

// Context
import { useDatasourceContext } from '../context/DatasourceContext';
import { useSession } from '../context/AuthContext';

export default function Datasource({ id, naam, foutief, boodschap }) {
    const { hasRole } = useSession();
    const { markeerAlsFoutief } = useDatasourceContext();
    const history = useHistory();

    const [ isFoutief, setIsFoutief ] = useState();
    const [ isGerapporteerd, setIsGeraporteerd ] = useState();
    const [ foutBoodschap, setFoutboodschap ] = useState('');

    useEffect(() => {
        setIsFoutief(foutief)
        setIsGeraporteerd(Boolean(boodschap))
    }, [foutief, boodschap])

    const goToDatasource = () => {
        history.push(`/datasource/${id}`);
    };
      
    const handleInputChange = useCallback((e) => {
        setFoutboodschap(e.target.value);
    }, []);

    const handleMarkeerFoutief = useCallback(() => {
        if (hasRole(3)) {
            markeerAlsFoutief(id, false, "")
        }
        setIsFoutief(!isFoutief);
    }, [setIsFoutief, isFoutief, hasRole, markeerAlsFoutief, id])

    const handleRapporteren = useCallback(() => {
        setIsGeraporteerd(true);
        markeerAlsFoutief(id, true, foutBoodschap);
    }, [markeerAlsFoutief, foutBoodschap, id]);

    return (
        <>
            <Flex
                direction='column' gap={2}
                bg="#CDDCE0" p={4} borderRadius={20}
                data-cy="datasource"
            >
                <Text className='subtitle' data-cy="datasource_naam">{naam}</Text>
                <HStack align='end'>
                    { hasRole(2, 3) && (
                    <Button
                        onClick={goToDatasource} disabled={!hasRole(2, 3)}
                        gap={2} data-cy="datasource_detailsbutton" className='datasource-button'
                    >
                        <IoSearch /> Details
                    </Button>
                    )}
                    { (hasRole(2) || isFoutief) && (
                        <Button 
                            onClick={handleMarkeerFoutief} disabled={!hasRole(2, 3) || isGerapporteerd}
                            gap={2} data-cy="datasource_foutiefbutton" className={isFoutief ? 'datasource-button-foutief' : 'datasource-button'} 
                        >
                            <IoAlertCircle />
                            {isFoutief ? ('Foutief') : ('Fout rapporteren')}
                        </Button>
                    )}
                    { hasRole(3) && isGerapporteerd && (
                        <Button
                            onClick={handleMarkeerFoutief}
                            className='datasource-button'
                        >
                            Foutief opheffen
                        </Button>
                    )}
                </HStack>
                { isFoutief && !isGerapporteerd && (
                    <HStack>
                        <Input bgColor='white' onChange={handleInputChange}/>
                        <Button 
                            onClick={handleRapporteren}
                            className="button2"
                            data-cy="datasource_foutboodschap_tekstVak"
                        >
                            verzend
                        </Button>
                    </HStack>
                )}
                { isFoutief && isGerapporteerd && (
                    <HStack>
                        <Text className='errormsg' data-cy="datasource_foutboodschap">{boodschap}</Text>
                    </HStack>
                )}
            </Flex>
        </>
    );
}