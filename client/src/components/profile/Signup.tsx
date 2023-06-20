import React, { useState } from "react";
import {
    Box,
    Heading,
    Input,
    Button,
    FormControl,
    FormLabel,
    Link as StyledLink,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

export const Signup: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const apiKey: string = process.env.REACT_APP_API_URL || "";
    const navigate = useNavigate();

    const handleSignup = async () => {
        try {
            const response = await fetch(apiKey + "/user/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                navigate("/profile");
            } else {
                const errorData = await response.json();
                setError(errorData.message);
            }
        } catch (error) {
            console.error("An error occurred while signing up:", error);
        }
    };

    return (
        <Box maxWidth="400px" mx="auto" mt={8} p={4}>
            <Heading mb={4}>Sign Up</Heading>
            {error && (
                <Box color="red.500" mb={4}>
                    {error}
                </Box>
            )}
            <FormControl mb={4} isRequired>
                <FormLabel htmlFor="username">Username:</FormLabel>
                <Input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </FormControl>
            <FormControl mb={4} isRequired>
                <FormLabel htmlFor="password">Password:</FormLabel>
                <Input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </FormControl>
            <Button colorScheme="green" onClick={handleSignup}>
                Sign Up
            </Button>
            already have an account?{" "}
            <StyledLink as={Link} to="/signin" color="blue">
                sign in
            </StyledLink>
        </Box>
    );
};
