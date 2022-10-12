import { React, useCallback, useEffect, useState, useMemo } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Input,
  Box,
  Button,
  Text,
} from "@chakra-ui/react";

//Context
import { useDashboardContext } from "../context/DashboardContext";
import { useCategorieContext } from "../context/CategorieContext";

import SearchBar from "./SearchBar";

export default function AddComponentBar({ isOpen, onClose }) {
  return (
    <>
      {/* <Button colorScheme='blue' onClick={onOpen}>
        Open
      </Button> */}
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">
            Zoek naar een doelstelling om toe te voegen.
          </DrawerHeader>
          <DrawerBody>
            <DoelstellingBox></DoelstellingBox>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

function DoelstellingBox() {
  const { addDoelstelling, catId, rol } = useDashboardContext();
  const { getCategorie } = useCategorieContext();
  const [doelstellingen, setDoelstellingen] = useState([]);
  const [search, setSearch] = useState("");

  const filteredDoelstellingenLijst = useMemo(() => {
    return doelstellingen.filter((doelstelling) => {
      return doelstelling.naam.toLowerCase().includes(search.toLowerCase())
    });
  }, [doelstellingen, search]);

  //Haalt de doelstellingen van een categorie op
  useEffect(() => {
    async function fetchData() {
      const cat = await getCategorie(catId);

      setDoelstellingen(
        cat?.doelstellingen.filter((doel) => doel.rollen.includes(rol))
      );
    }
    fetchData();
  }, [getCategorie]);

  const add = (id) => {
    addDoelstelling(id, catId);
  };

  return (
    <>
      <SearchBar setSearch={setSearch} placeholder="Doelstelling"/>

      {filteredDoelstellingenLijst &&
        filteredDoelstellingenLijst.map((doel) => {
          return (
            <Box
              bg="#CDDCE0"
              borderRadius={5}
              mt="10px"
              p="5px"
              key={doel.id}
              display="flex"
              justifyContent={"space-between"}
            >
              <Text className="bold">{doel.naam}</Text>
              <Button size="sm" m={"0 0 0 10"} onClick={() => add(doel.id)}>
                Voeg toe
              </Button>
            </Box>
          );
        })}
    </>
  );
}
