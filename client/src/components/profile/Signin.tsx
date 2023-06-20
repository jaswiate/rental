import React, { useContext, useState } from "react";
import {
    Box,
    Heading,
    Input,
    Button,
    FormControl,
    FormLabel,
    Link as StyledLink,
} from "@chakra-ui/react";
import { User } from "../../types/interfaces";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export const Signin: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { user, setUser } = useContext(AuthContext);
    const apiKey: string = process.env.REACT_APP_API_URL || "";
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await fetch(apiKey + "/user/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data: User = await response.json();
                setUser(data);
                navigate("/profile");
                console.log(data);
            } else {
                const errorData = await response.json();
                setError(errorData.message);
            }
        } catch (error) {
            console.error("An error occurred while logging in:", error);
        }
    };

    return (
        <Box maxWidth="400px" mx="auto" mt={8} p={4}>
            <Heading mb={4}>Login</Heading>
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
            <Button colorScheme="blue" onClick={handleLogin}>
                Login
            </Button>
            not a member?{" "}
            <StyledLink as={Link} to="/signup" color="blue">
                sign up
            </StyledLink>
        </Box>
    );
};
