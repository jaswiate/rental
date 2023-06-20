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

    return (
        <Box>
            <Heading as="h1" mb="4">
                All Rentals
            </Heading>
            <RentalList rentals={rentals} loading={loading} error={error} />
        </Box>
    );
};
