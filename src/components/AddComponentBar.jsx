import { React, useCallback, useEffect, useState } from "react";
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
import { useDoelstellingContext } from "../context/DoelstellingContext";

export default function AddComponentBar({ isOpen, onClose, catId }) {
  return (
    <>
      {/* <Button colorScheme='blue' onClick={onOpen}>
        Open
      </Button> */}
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">
            Zoek naar een categorie om toe te voegen.
          </DrawerHeader>
          <DrawerBody>
            <Input placeholder="Zoek naar categorie" size="sm" />
            {catId ? (
              <DoelstellingBox catId={catId}></DoelstellingBox>
            ) : (
              <CategorieBox></CategorieBox>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

function DoelstellingBox() {
  const { rol, addDoelstelling, catId } = useDashboardContext();
  const { categorie, getCategorie } = useCategorieContext();
  const [doelstellingen, setDoelstellingen] = useState([]);

  //Haalt de doelstellingen van een categorie op
  useEffect(() => {
    let enabled = true;
    async function fetchData() {
      await getCategorie(catId);
      console.log("test1")
      if (enabled) {
        setDoelstellingen(categorie?.doelstellingen ?? []);
        console.log("test");
      }
    }
    fetchData();
    return () => {
      enabled = false;
    };
  }, []);

  const add = (id) => {
    addDoelstelling(id, catId);
    // const filteredCat = categorieen.filter(cat=>cat.id!==id)
    // setCategorieen(filteredCat)
  };

  return (
    <>
      {doelstellingen &&
        doelstellingen.map((doel) => {
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

function CategorieBox() {
  const { addCategorie, filteredCat } = useDashboardContext();

  const add = useCallback(
    async (id) => {
      addCategorie(id);
    },
    [addCategorie]
  );

  return (
    <>
      {filteredCat &&
        filteredCat.map((cat) => {
          return (
            <Box
              bg="#CDDCE0"
              borderRadius={5}
              mt="10px"
              p="5px"
              key={cat.id}
              display="flex"
              justifyContent={"space-between"}
            >
              <Text className="bold">{cat.naam}</Text>
              <Button size="sm" m={"0 0 0 10"} onClick={() => add(cat.id)}>
                Voeg toe
              </Button>
            </Box>
          );
        })}
    </>
  );
}
