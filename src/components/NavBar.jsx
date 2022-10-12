import { React, useCallback } from "react";
import { NavLink } from "react-router-dom";
import {
  Flex,
  Image,
  Text,
  Button,
  VStack,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerHeader,
  DrawerBody,
} from "@chakra-ui/react";
import { IoClose, IoPerson } from "react-icons/io5";
import { useLogout, useSession } from "../context/AuthContext";

/* Roles
 * 0: stakeholder
 * 1: directie
 * 2: manager
 * 3: coordinator
 */

const DrawerItem = ({ to, label }) => {
  return (
    <NavLink to={to}>
      <Button className="nav-drawer-button">{label}</Button>
    </NavLink>
  );
};

const NavDrawer = ({ isOpen, onClose }) => {
  const { hasRole } = useSession();

  return (
    <>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px" display="flex" justify="center">
            <Text className="title" flex="1 1 auto">
              Menu
            </Text>
            <Button className="nav-drawer-close" onClick={onClose}>
              <IoClose size={22} />
            </Button>
          </DrawerHeader>
          <DrawerBody>
            <VStack align="right" gap={2}>
              <DrawerItem to="/categorie" label="Categoriëen" />
              <DrawerItem to="/doelstelling" label="Doelstellingen" />
              {hasRole(2, 3) && (
                <DrawerItem to="/datasource" label="Datasources" />
              )}
              {hasRole(3) && (
                <DrawerItem to="/dashboard/lijst" label="Beheer dashboards" />
              )}
              {hasRole(1, 2, 3) && (
                <DrawerItem to="/dashboard/stap2/personaliseer" label="Personaliseer dashboard" />
              )}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default function NavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const logout = useLogout();

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);
  return (
    <>
      <Flex
        h="4rem"
        borderBottom="1px"
        borderColor="black"
        bg="#055063"
        boxShadow="lg"
      >
        <Flex m={1} h="3.5rem" justify="left" align="center">
          <Image
            src="/images/banner-fluvius-blue.png"
            alt="logo-fluvius"
            h="100%"
            fit="contain"
          />
        </Flex>
        <Flex justify="right" align="center" grow={1} gap={5} mx={5}>
          <NavLink to="/dashboard" className="nav-button">
            Dashboard
          </NavLink>
          <Text onClick={onOpen} className="nav-button">
            Menu
          </Text>
          <Menu>
            <MenuButton as={Text} className="nav-button">
              <IoPerson size={28} />
            </MenuButton>
            <MenuList>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
      <NavDrawer isOpen={isOpen} onClose={onClose} />
    </>
  );
}
