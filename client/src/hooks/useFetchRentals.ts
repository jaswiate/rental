import { useContext, useEffect, useState } from "react";
import { Rental } from "../types/interfaces";
import { AuthContext } from "../context/AuthContext";

export const useFetchRentals = (relativeRoute: string) => {
    const { user, setUser } = useContext(AuthContext);
    const [rentals, setRentals] = useState<Rental[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const apiKey: string = process.env.REACT_APP_API_URL || "";

    useEffect(() => {
        const fetchRentals = async () => {
            try {
                const response = await fetch(apiKey + relativeRoute, {
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
                }
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        fetchRentals();
    }, [user, apiKey, relativeRoute]);

    return { rentals, loading, error };
};
