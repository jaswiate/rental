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
import { Rental } from "../../types/interfaces";
import RentalList from "../RentalList";
import { AuthContext } from "../../context/AuthContext";
import { useFetchRentals } from "../../hooks/useFetchRentals";
import { timeout } from "../utils/timeout";
import { PendingRentals } from "./PendingRentals";

export const AdminPanel: React.FC = () => {
    const [update, setUpdate] = useState<boolean>(false);
    const { rentals, loading, error } = useFetchRentals("/rentals", update);
    const apiKey: string = process.env.REACT_APP_API_URL || "";
    const { user } = useContext(AuthContext);
    const [finesLoading, setFinesLoading] = useState<boolean>(false);
    const [resultMessage, setResultMessage] = useState<string>();

    const requestRecalculation = async () => {
        try {
            setFinesLoading(true);
            const response = await fetch(`${apiKey}/rentals/fines`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": user?.accessToken as string,
                },
            });
            if (response.ok) {
                setResultMessage("Kary naliczone pomyślnie");
            } else {
                setResultMessage("Wystąpił błąd");
            }
        } catch (error) {
            console.error(error);
        }
        setFinesLoading(false);
        await timeout(5000);
        setResultMessage("");
    };

    return (
        <Box>
            <Box>
                <Button onClick={requestRecalculation} colorScheme="red">
                    Recalculate all fines
                </Button>
                {finesLoading ? (
                    <Text>
                        <Spinner size="lg" />
                    </Text>
                ) : (
                    <Text>{resultMessage}</Text>
                )}
            </Box>
            <PendingRentals />
            <Heading as="h3" size="md" mb="4">
                All Rentals
            </Heading>
            <RentalList rentals={rentals} loading={loading} error={error} />
        </Box>
    );
};
