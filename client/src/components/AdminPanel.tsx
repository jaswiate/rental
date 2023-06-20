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
import RentalList from "./RentalList";
import { AuthContext } from "../context/AuthContext";

export const AdminPanel: React.FC = () => {
    const [rentals, setRentals] = useState<Rental[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const apiKey: string = process.env.REACT_APP_API_URL || "";
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchRentals = async () => {
            console.log("fetching...");
            try {
                const response = await fetch(`${apiKey}/rentals`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "x-access-token": user?.accessToken as string,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setRentals(data);
                    setLoading(false);
                } else {
                    const errorData = await response.json();
                    setError(errorData.message);
                    setLoading(false);
                }
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        fetchRentals();
    }, [user, apiKey]);

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
            <RentalList rentals={rentals} loading={loading} error={error} />
        </Box>
    );
};
