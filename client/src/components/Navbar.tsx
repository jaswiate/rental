import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
    Heading,
    Flex,
    HStack,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    useColorMode,
    useColorModeValue,
    Button,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const Navbar: React.FC = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const bgColor = useColorModeValue("gray.100", "whiteAlpha.100");
    const { user } = useContext(AuthContext);

    return (
        <Flex
            justify="space-between"
            align="center"
            bg={bgColor}
            p="5"
            fontSize="2xl"
        >
            <Heading>RentalService</Heading>
            <HStack>
                <Breadcrumb>
                    {user?.role === "admin" && (
                        <BreadcrumbItem>
                            <BreadcrumbLink as={Link} to="/admin">
                                Admin Panel
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    )}
                    <BreadcrumbItem>
                        <BreadcrumbLink as={Link} to="/">
                            Collection
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <BreadcrumbLink as={Link} to="/profile">
                            Profile
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
                <Button onClick={toggleColorMode}>
                    {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                </Button>
            </HStack>
        </Flex>
    );
};
