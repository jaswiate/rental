import React, { useContext, useState } from "react";
import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    NumberInput,
    NumberInputField,
    Stack,
} from "@chakra-ui/react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";

interface newRental {
    clientId: string;
    productId: string;
    quantity: number;
    isPending: boolean;
}

// currently this form adds a rental, but ideally it would add a request of rental with address
// alternatively we should add an address to a rental
export const RentalForm: React.FC = () => {
    const { user } = useContext(AuthContext);

    const { productId } = useParams();

    // this form should be visible only to logged in users, hence the "!" after user
    const [newRental, setNewRental] = useState<newRental>({
        clientId: user!.id,
        productId: productId || "",
        quantity: 1,
        isPending: true,
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const apiKey: string = process.env.REACT_APP_API_URL || "";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            console.log(productId);
            if (!productId) throw new Error("productId is empty!");
            const response = await fetch(apiKey + "/rentals", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": user?.accessToken as string,
                },
                body: JSON.stringify(newRental),
            });

            if (response.ok) {
                navigate("/");
            } else {
                const errorData = await response.json();
                setError(errorData.error);
            }
        } catch (error) {
            console.error("Failed to add rental", error);
        }
    };

    return (
        <Box maxWidth="sm" margin="auto">
            <form onSubmit={handleSubmit}>
                <Stack spacing={4}>
                    <FormControl isRequired>
                        <FormLabel>Quantity</FormLabel>
                        <NumberInput
                            name="quantity"
                            value={newRental.quantity}
                            onChange={(value) =>
                                setNewRental({
                                    ...newRental,
                                    quantity: parseInt(value),
                                })
                            }
                            min={1}
                        >
                            <NumberInputField />
                        </NumberInput>
                    </FormControl>
                    {error && (
                        <Box color="red.500" mb={4}>
                            {error}
                        </Box>
                    )}
                    <Button type="submit" colorScheme="blue">
                        Add Rental
                    </Button>
                </Stack>
            </form>
        </Box>
    );
};
