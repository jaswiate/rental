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
import { useFetchRentals } from "../hooks/useFetchRentals";

export const AdminPanel: React.FC = () => {
    const { rentals, loading, error } = useFetchRentals("/rentals");
    const apiKey: string = process.env.REACT_APP_API_URL || "";
    const { user } = useContext(AuthContext);
    const [resultMessage, setResultMessage] = useState<JSX.Element>();

    const requestRecalculation = async () => {
        setResultMessage(
            <Text>
                <Spinner size="lg" />
            </Text>
        );
        try {
            const response = await fetch(`${apiKey}/rentals/fines`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": user?.accessToken as string,
                },
            });
            if (response.ok) {
                setResultMessage(<Text>Kary naliczone pomyślnie</Text>);
            } else {
                setResultMessage(<Text color="red">Wystąpił błąd</Text>);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Box>
            <Box>
                <Button onClick={requestRecalculation} colorScheme="red">
                    recalculate all fines
                </Button>
                {resultMessage}
            </Box>
            <Heading as="h3" size="md" mb="4">
                All Rentals
            </Heading>
            <RentalList rentals={rentals} loading={loading} error={error} />
        </Box>
    );
};
