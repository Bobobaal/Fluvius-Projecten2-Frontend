import { React, useCallback } from "react";
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
            Zoek naar een categorie om toe te voegen.
          </DrawerHeader>
          <DrawerBody>
              <CategorieBox></CategorieBox>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
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
