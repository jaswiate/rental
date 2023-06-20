import React, { useContext, useEffect, useState } from "react";
import { Box, Heading, List, ListItem, Spinner, Text } from "@chakra-ui/react";
import { AuthContext } from "../../context/AuthContext";

interface Rental {
    _id: string;
    clientId: string;
    productId: string;
    quantity?: number;
    borrowDate: Date;
    dueDate: Date;
    fine?: number;
    ifProlonged?: boolean;
}

const RentalList: React.FC = () => {
    const [rentals, setRentals] = useState<Rental[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const { user } = useContext(AuthContext);
    const apiKey: string = process.env.REACT_APP_API_URL || "";

    useEffect(() => {
        const fetchRentals = async () => {
            console.log("fetching...");
            try {
                const response = await fetch(
                    `${apiKey}/user/rentals/${user!.id}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "x-access-token": user?.accessToken as string,
                        },
                    }
                );
                if (response.ok) {
                    const data = await response.json();
                    setRentals(data);
                    setLoading(false);
                } else {
                    const errorData = await response.json();
                    setError(errorData.message);
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
