import React, { useContext, useEffect, useState } from "react";
import { Box, Heading, List, ListItem, Spinner, Text } from "@chakra-ui/react";
import { AuthContext } from "../context/AuthContext";
import { Rental } from "../types/interfaces";

interface Props {
    rentals: Rental[];
    loading: boolean;
    error: string;
}

const RentalList: React.FC<Props> = ({ rentals, loading, error }) => {
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

    return (
        <Box>
            <Heading as="h3" size="md" mb="4">
                Your rentals:
            </Heading>
            {rentals.length === 0 ? (
                <Text>No rentals found.</Text>
            ) : (
                <List styleType="disc">
                    {rentals.map((rental) => (
                        <ListItem key={rental._id}>
                            {JSON.stringify(rental)}
                        </ListItem>
                    ))}
                </List>
            )}
        </Box>
    );
};

export default RentalList;
