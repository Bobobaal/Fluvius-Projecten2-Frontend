
import { useFormContext } from 'react-hook-form';
import { Flex, Input, FormControl, FormLabel, Text } from '@chakra-ui/react';


export default function LabelInput({ text, label, type, defaultValue, validation, ...rest }) {
    const { register, formState: { errors } } = useFormContext();
    return (
        <FormControl>
            <Flex direction={{base:'column', sm: 'row'}} gap={2} py={1} justify='left'>
                <FormLabel htmlFor={label} w={{base: '100%', sm: '20%'}} pt={2}>{text ? text : label}</FormLabel>
                <Input w={{base: '100%', sm: '60%'}} bgColor='white' rounded='lg'
                    {...register(label, validation)}
                    defaultValue={defaultValue}
                    placeholder={label}
                    type={type}
                    name={label}
                    {...rest}
                />
            </Flex>
            {
                errors[label] && (
                <Flex>
                    <Text w={{base: '100%', sm: '60%'}} 
                        className='errormsg'
                    >
                        {errors[label].message}
                    </Text>
                </Flex>
            )
            }
        </FormControl>
    );
};
