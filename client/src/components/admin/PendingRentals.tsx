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
import { AuthContext } from "../../context/AuthContext";
import { Rental } from "../../types/interfaces";
import { timeout } from "../utils/timeout";
import { useFetchRentals } from "../../hooks/useFetchRentals";
import RentalList from "../RentalList";
import { RENTAL_DAYS_NUMBER } from "../utils/constants";

interface Props {
    update: boolean;
    setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PendingRentals: React.FC<Props> = ({ update, setUpdate }) => {
    const apiKey: string = process.env.REACT_APP_API_URL || "";
    const {
        rentals: pendingRentals,
        loading: pendingLoading,
        error: pendingError,
    } = useFetchRentals("/rentals/pending");
    const [updateLoading, setUpdateLoading] = useState(false);
    const [updateError, setUpdateError] = useState("");
    const currDate = new Date();
    const dueDate = new Date();
    dueDate.setDate(currDate.getDate() + RENTAL_DAYS_NUMBER);
    const { user } = useContext(AuthContext);

    const handleUpdate = async (rental: Rental) => {
        setUpdateLoading(true);
        try {
            const response = await fetch(`${apiKey}/rentals/${rental._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": user?.accessToken as string,
                },
                body: JSON.stringify({
                    borrowDate: currDate,
                    dueDate: dueDate,
                    isPending: false,
                }),
            });

            if (response.ok) {
                setUpdate(true);
            } else {
                setUpdateError("An error occurred while updating the rental.");
            }
        } catch (error) {
            setUpdateError("An error occurred while updating the rental.");
        }
        setUpdateLoading(false);
        timeout(5000);
        setUpdateError("");
    };

    return (
        <Box>
            <Heading as="h3" size="md" mb="4">
                Wypożyczenia czekające na wysyłkę
            </Heading>
            <RentalList
                rentals={pendingRentals}
                loading={pendingLoading}
                error={pendingError}
                adminButtons={{
                    loading: updateLoading,
                    error: updateError,
                    onclick: handleUpdate,
                }}
            />
        </Box>
    );
};
