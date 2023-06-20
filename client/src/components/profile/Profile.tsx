import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Button } from "@chakra-ui/react";
import { Navigate } from "react-router-dom";
import RentalList from "../RentalList";
import { Rental } from "../../types/interfaces";

export const Profile: React.FC = () => {
    const { user, setUser } = useContext(AuthContext);
    const [rentals, setRentals] = useState<Rental[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
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
