import { useState, useCallback } from "react";
import { Flex, Text, Input, Button } from "@chakra-ui/react";
import { IoSearch } from "react-icons/io5";
import { m } from "framer-motion";

export default function SearchBar({ setSearch, placeholder }) {
    const [text, setText] = useState("");

    const handleInputChange = useCallback((e) => {
        setText(e.target.value)
    }, []);

    const handleSearch = useCallback(() => {
        setSearch(text);
    }, [text, setSearch]);

    return (
        <>
            <Flex gap={2} my={3} w={{base:'100%', md:'40%'}} minW="250px">
                    <Input 
                        type='search'
                        value={text} 
                        onChange={handleInputChange}
                        placeholder={placeholder}
                        data-cy="searchbar_input"
                    />
                    <Button 
                        type='button'
                        className='button2'
                        onClick={handleSearch}
                        data-cy="searchbar_button"
                    >
                        <IoSearch />
                    </Button>
                </Flex>
        </>
    );

}