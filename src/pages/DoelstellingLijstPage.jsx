import { useEffect, useMemo, useState, useCallback } from "react";
import { Wrap, Box, Text, Spinner, Select, HStack} from "@chakra-ui/react";
// Context
import { useDoelstellingContext } from "../context/DoelstellingContext";
import { useCategorieContext } from "../context/CategorieContext";
// Components
import Doelstelling from "../components/Doelstelling";
import SearchBar from "../components/SearchBar";
import ErrorMessage from "../components/ErrorMessage";


export default function DoelstellingLijst() {
  const { getAllDoelstellingen, doelstellingLijst, loading, error } = useDoelstellingContext();
  const { getAllCategorieen, categorieLijst } = useCategorieContext();
  const [search, setSearch] = useState("");
  const [searchCat, setSearchCat] = useState("0");

  useEffect(() => {
    async function fetchData() {
      getAllDoelstellingen();
      getAllCategorieen();
    }
    fetchData();
  }, [getAllDoelstellingen, getAllCategorieen]);

  const handleCat = useCallback(e => setSearchCat(e.target.value), [setSearchCat]);

  const filteredDoelstellingenLijst = useMemo(() => {
    if(searchCat !== "0"){
      const categorie = categorieLijst.filter(categorie => categorie.id === parseInt(searchCat))[0];
      return doelstellingLijst.filter(doelstelling => {
        return doelstelling.naam.toLowerCase().includes(search.toLowerCase()) && categorie.goals.includes(doelstelling.goal);
      });
    }
    return doelstellingLijst.filter(doelstelling => doelstelling.naam.toLowerCase().includes(search.toLowerCase()));
  }, [doelstellingLijst, search, searchCat, categorieLijst]);

  if (loading) {
    return (
      <Box mx={5}>
        <Text className="title" textAlign={"center"}>Doelsellingen</Text>
        <Spinner data-cy="loading" size="xl" my={10} mx="auto" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box mx={5}>
        <Text className="title">Doelstellingen</Text>
        <ErrorMessage error={error} />
      </Box>
    );
  }

  return (
    <>
    <Text className="title" textAlign={"center"}>Doelstellingen</Text>
      <HStack marginLeft="20px" width="97%">
        <SearchBar setSearch={setSearch} placeholder="Zoek naar een doelstelling"/>
        <Text>Zoeken op categorie:</Text>
        <Select
          value={searchCat}
          onChange={handleCat}
          width="50%"
        >
          <option value="0">--- Alle categorieën ---</option>
          {categorieLijst.map(cat => {
            return (
              <>
                <option key={cat.id} value={cat.id}>{cat.naam}</option>
              </>
            )
          })}
        </Select>
      </HStack>
      <Wrap m="20px" spacing="20px">
        {filteredDoelstellingenLijst && filteredDoelstellingenLijst
          .sort((d1, d2) => d1.naam !== d2.naam ? d1.naam < d2.naam ? -1 : 1 :0)
          .map((doel) => {
          return <Doelstelling key={doel.id} id={doel.id} naam={doel.naam} icoon={doel.icoon} vooruitgang={doel.vooruitgang} goal={doel.goal} subDoelstellingen={doel.subDoelstellingen}/>;
        })}
      </Wrap>
    </>
  );
}
