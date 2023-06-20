import { useContext, useEffect, useState } from "react";
import {
    Box,
    Button,
    Heading,
    List,
    ListItem,
    Spinner,
    Text,
} from "@chakra-ui/react";
import { Navigate } from "react-router-dom";
import { Rental } from "../types/interfaces";

export const AdminPanel: React.FC = () => {
    return <>AdminPanel</>;
};

const RentalList: React.FC = () => {
    const [rentals, setRentals] = useState<Rental[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchRentals = async () => {
            try {
                const response = await fetch("/rentals");
                if (!response.ok) {
                    throw new Error(
                        "An error occurred while retrieving the rentals."
                    );
                }
                const data = await response.json();
                setRentals(data);
                setLoading(false);
            } catch (error) {
                setError("An error occurred while retrieving the rentals.");
                setLoading(false);
            }
        };

        fetchRentals();
    }, []);

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
            <Heading as="h1" mb="4">
                All Rentals
            </Heading>
            {rentals.length === 0 ? (
                <Text>No rentals found.</Text>
            ) : (
                <List styleType="disc">
                    {rentals.map((rental) => (
                        <ListItem key={rental._id}>{rental.clientId}</ListItem>
                    ))}
                </List>
            )}
        </Box>
    );
};
