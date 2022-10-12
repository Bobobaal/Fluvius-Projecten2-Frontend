import { useCallback, useEffect } from "react";
import { Flex, Box, Image, Text, Button } from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useLogin, useSession } from '../context/AuthContext';
import LabelInput from "../components/LabelInput";


const validationRules = {
  username: {
    required: true,
  },
  password: {
    required: true,
  },
};

export default function Login() {
    const methods = useForm();
    const { loading, error, isAuthed } = useSession();
    const login = useLogin();
    const history = useHistory();
    const { handleSubmit } = methods;

    
    useEffect(() => {
		if (isAuthed) {
			history.push('/dashboard');
		}
	}, [isAuthed, history]);

    const handleLogin = useCallback(async ({ username, password }) => {
        const succes = await login(username, password);

        if (succes) {
            history.push('/dashboard')
        }
        
    }, [login, history]);
    
    return (
        <Flex justify='center'
            minW='100%' minH='100%' w='auto' h='100vh' top={0} left={0}
            position='absolute'
            bgImage='/images/login-background.png'
            bgRepeat='no-repeat'
            bgSize='cover'
        >
            <Flex background='white' boxShadow='lg' overflowY='auto'
                direction='column' align='start'
                m={50} minW='75%'
            >
                <Image src='/images/banner-fluvius-transparent.png' alt='logo-fluvius' 
                    h={{base: '50px', sm: '100px'}} fit='contain' mt={5} ml={5}
                />
                <Box display='block' flex='0 1 auto' my='auto' ml={20} w='80%'>
                    <FormProvider {...methods}>
                        <Text className='subtitle' py={4}>
                            Aanmelden met een bestaande Fluvius Account
                        </Text>
                        <form onSubmit={handleSubmit(handleLogin)}>
                            <LabelInput 
                                text="Gebruikersnaam"
                                label="username"
                                type="text"
                                defaultValue=""
                                placeholder="gebruikersnaam"
                                data-cy="username_input"
                                validation={validationRules.username} 
                            />
                            <LabelInput 
                                text="Wachtwoord"
                                label="password"
                                type="password"
                                defaultValue=""
                                placeholder="wachtwoord"
                                data-cy="password_input"
                                validation={validationRules.password}
                            />
                            <Flex gap={2} py={1} align='center'> 
                                <Box w='20%' mx={2} display={{base: 'none', sm: 'block'}}/>                    
                                <Button
                                    disabled={loading}
                                    type="submit"
                                    className="button2"
                                    data-cy="submit_btn"
                                >
                                    Meld aan
                                </Button>
                                {error ? <Text className="errormsg">{error}</Text> : null}
                            </Flex>
                        </form>
                    </FormProvider>
                    <Text className='subtitle' py={4}>
                        Aanmelden via eID of itsMe
                    </Text>
                    <Flex gap={2} direction={{base: 'column', sm: 'row'}}>
                        <Box border='1px solid black' w={{base: '100%', sm: '250px'}} h={100} background='#EFEFEF' boxShadow='lg'>
                            <Image src='/images/logo-eid.png' alt='logo-eid'
                                fit='contain' mx='auto' h='100%' py={2}  
                            />
                        </Box>
                        <Box border='1px solid black' w={{base: '100%', sm: '250px'}} h={100} background='#EFEFEF' boxShadow='lg'>
                            <Image src='/images/logo-itsme.png' alt='logo-itsme'
                                fit='contain' mx='auto' h='100%' py={2}  
                            />
                        </Box>
                    </Flex>
                </Box>
            </Flex>
        </Flex>
    );
}