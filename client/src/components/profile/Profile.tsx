import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Button } from "@chakra-ui/react";
import { Navigate } from "react-router-dom";
import RentalList from "./RentalList";

export const Profile: React.FC = () => {
    const { user, setUser } = useContext(AuthContext);

    return user ? (
        <>
            <p>Welcome, {user.username}!</p>
            <Button colorScheme="red" onClick={() => setUser(null)} mt={4}>
                Sign out
            </Button>
            <RentalList />
        </>
    ) : (
        <Navigate to="/signin" />
    );
};
