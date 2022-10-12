import { useEffect, useMemo, useState } from "react";
import { Wrap, Text, Box, Spinner } from "@chakra-ui/react";
// Context
import { useCategorieContext } from "../context/CategorieContext";
// Components
import Categorie from "../components/Categorie";
import ErrorMessage from "../components/ErrorMessage";
import SearchBar from "../components/SearchBar";

export default function CategorieLijst() {
  const { getAllCategorieen, categorieLijst, loading, error } = useCategorieContext();
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchData() {
      getAllCategorieen();
    }
    fetchData();
  }, [getAllCategorieen]);

  const filteredCategorieLijst = useMemo(() => {
    return categorieLijst.filter(categorie => categorie.naam.toLowerCase().includes(search.toLowerCase()));
  }, [categorieLijst, search]);

  if (loading) {
    return (
      <Box mx={5}>
        <Text className="title" textAlign={"center"}>Categorieën</Text>
        <Spinner data-cy="loading" size="xl" my={10} mx="auto" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box mx={5}>
        <Text className="title">Categorieën</Text>
        <ErrorMessage error={error} />
      </Box>
    );
  }

  return (
    <>
    <Text className="title" textAlign={"center"}>Categorieën</Text>
    <Box marginLeft="20px">
      <SearchBar setSearch={setSearch} placeholder="Zoek naar een categorie" />
    </Box>
    <Wrap m="20px" spacing="20px">
      {filteredCategorieLijst && filteredCategorieLijst.map((cat) => {
        return <Categorie key={cat.id} id={cat.id} naam={cat.naam} goals={cat.goals}/>;
      })}
    </Wrap>
    </>
  );
}
