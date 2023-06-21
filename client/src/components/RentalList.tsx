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
import { RentalElement } from "./RentalElement";

interface Props {
    rentals: Rental[];
    loading: boolean;
    error: string;
    adminButtons?: {
        loading: boolean;
        error: string;
        onclick: (rental: Rental) => Promise<void>;
        text: string;
    };
}

export const RentalList: React.FC<Props> = ({
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
                            <RentalElement
                                rental={rental}
                                adminButtons={adminButtons}
                            />
                        </ListItem>
                    ))}
                </List>
            )}
        </Box>
    );
};
