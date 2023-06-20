import React, { useContext, useEffect, useState } from "react";
import {
    Box,
    Button,
    Heading,
    List,
    ListItem,
    Spinner,
    Text,
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
        <Box>
            {rentals.length === 0 ? (
                <Text>No rentals found.</Text>
            ) : (
                <List styleType="disc">
                    {rentals.map((rental) => (
                        <ListItem key={rental._id}>
                            {JSON.stringify(rental)}
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
                                            Potwierdź wysyłkę
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

export default RentalList;
