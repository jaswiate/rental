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

interface RentalData {
    clientId: string;
    productId: string;
    quantity: number;
    borrowDate: Date;
    dueDate: Date;
}

const RENTAL_DAYS_NUMBER: number = 20;

// currently this form adds a rental, but ideally it would add a request of rental with address
// alternatively we should add an address to a rental
export const RentalForm: React.FC = () => {
    const { user } = useContext(AuthContext);
    const currDate = new Date();
    const dueDate = new Date();
    dueDate.setDate(currDate.getDate() + RENTAL_DAYS_NUMBER);
    const { productId } = useParams();

    // this form should be visible only to logged in users, hence the "!" after user
    const [rentalData, setRentalData] = useState<RentalData>({
        clientId: user!.id,
        productId: productId || "",
        quantity: 1,
        borrowDate: currDate,
        dueDate: dueDate,
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const apiKey: string = process.env.REACT_APP_API_URL || "";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (!productId) throw new Error("productId is empty!");
            const response = await fetch(apiKey + "/rentals", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(rentalData),
            });

            if (response.ok) {
                navigate("/");
            } else {
                const errorData = await response.json();
                setError(errorData.message);
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
                            value={rentalData.quantity}
                            onChange={(value) =>
                                setRentalData({
                                    ...rentalData,
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
