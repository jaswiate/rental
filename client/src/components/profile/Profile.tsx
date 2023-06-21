import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Button } from "@chakra-ui/react";
import { Navigate } from "react-router-dom";
import { RentalList } from "../RentalList";
import { Rental } from "../../types/interfaces";
import { useFetchRentals } from "../../hooks/useFetchRentals";

export const Profile: React.FC = () => {
    const { user, setUser } = useContext(AuthContext);
    const { rentals, loading, error } = useFetchRentals(
        `/user/rentals/${user?.id}`
    );

    return user ? (
        <>
            <p>Welcome, {user.username}!</p>
            <Button colorScheme="red" onClick={() => setUser(null)} mt={4}>
                Sign out
            </Button>
            <RentalList rentals={rentals} loading={loading} error={error} />
        </>
    ) : (
        <Navigate to="/signin" />
    );
};
