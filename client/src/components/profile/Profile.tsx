import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Button } from "@chakra-ui/react";
import { Navigate } from "react-router-dom";

export const Profile: React.FC = () => {
    const { user, setUser } = useContext(AuthContext);
    // useEffect(() => console.log(user));

    return user ? (
        <>
            <p>Welcome, {user.username}!</p>
            <Button colorScheme="red" onClick={() => setUser(null)} mt={4}>
                Sign out
            </Button>
        </>
    ) : (
        <Navigate to="/signin" />
    );
};
