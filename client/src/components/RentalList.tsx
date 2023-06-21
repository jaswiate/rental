import React, { useContext, useEffect, useState } from "react";
import {
    Box,
    Button,
    Collapse,
    Flex,
    HStack,
    Heading,
    List,
    ListItem,
    Spinner,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import { AuthContext } from "../context/AuthContext";
import { Rental } from "../types/interfaces";
import { timeout } from "./utils/timeout";
import { RENTAL_DAYS_NUMBER } from "./utils/constants";

interface Props {
    rentals: Rental[];
    loading: boolean;
    error: string;
    adminButtons?: {
        loading: boolean;
        error: string;
        onclick: (rental: Rental) => Promise<void>;
    };
}

const RentalList: React.FC<Props> = ({
    rentals,
    loading,
    error,
    adminButtons,
}) => {
    if (loading) {
        return (
            <Box textAlign="center" mt="4">
                <Spinner size="xl" />
            </Box>
        );
    }

    if (error) {
        return (
            <Box textAlign="center" mt="4">
                <Text color="red.500">{error}</Text>
            </Box>
        );
    }
    console.log();
    return (
        <Box mt="5" mb="10">
            {rentals.length === 0 ? (
                <Text>No rentals found.</Text>
            ) : (
                <List styleType="disc">
                    {rentals.map((rental) => (
                        <ListItem key={rental._id}>
                            <RentalElement rental={rental} />
                            {adminButtons &&
                                (adminButtons.loading ? (
                                    <Text>
                                        <Spinner size="lg" />
                                    </Text>
                                ) : (
                                    <>
                                        <Button
                                            onClick={() =>
                                                adminButtons.onclick(rental)
                                            }
                                        >
                                            Confirm shipment
                                        </Button>
                                        {adminButtons?.error}
                                    </>
                                ))}
                        </ListItem>
                    ))}
                </List>
            )}
        </Box>
    );
};

interface RentalElementProps {
    rental: Rental;
}

const RentalElement: React.FC<RentalElementProps> = ({ rental }) => {
    const { isOpen, onToggle } = useDisclosure();
    const { user } = useContext(AuthContext);

    return (
        <Box
            mt="3"
            borderBottom="1px"
            borderColor="gray.200"
            borderRadius="base"
            padding="1"
            _hover={{
                border: "1px",
                borderColor: "gray.200",
                cursor: "pointer",
            }}
            onClick={onToggle}
        >
            <Text>{rental.productName}</Text>
            <Collapse in={isOpen}>
                <Flex justify="space-evenly" align="center" mb="2">
                    <HStack>
                        <Text mr="5">BorrowDate : </Text>
                        <Text mr="5">
                            DAY :{" "}
                            {rental.borrowDate
                                ? rental.borrowDate.toString().substring(0, 10)
                                : "pending shipment"}
                        </Text>
                        <Text>
                            TIME :{" "}
                            {rental.borrowDate
                                ? rental.borrowDate.toString().substring(11, 19)
                                : "pending shipment"}
                        </Text>
                    </HStack>
                    <HStack>
                        <Text mr="5">DueDate : </Text>
                        <Text mr="5">
                            DAY :{" "}
                            {rental.dueDate
                                ? rental?.dueDate.toString().substring(0, 10)
                                : "pending shipment"}
                        </Text>
                        <Text>
                            TIME :{" "}
                            {rental.dueDate
                                ? rental?.dueDate.toString().substring(11, 19)
                                : "pending shipment"}
                        </Text>
                    </HStack>
                </Flex>
                <Flex justify="space-evenly" align="center">
                    <HStack>
                        <Text mr="10">Fine : {rental.fine}</Text>
                        <Text>Quantity : {rental.quantity}</Text>
                    </HStack>
                </Flex>
                {user!.role === "admin" && (
                    <Flex justify="space-evenly">
                        <HStack>
                            <Text>Borrower's Id : {rental.clientId}</Text>
                            <Text mr="5">
                                Rented product Id: {rental.productId}
                            </Text>
                            {/* <Button as={Link} to={`/products/:${rental.productId}`}>GoTo Product</Button> */}
                        </HStack>
                    </Flex>
                )}
            </Collapse>
        </Box>
    );
};

export default RentalList;
