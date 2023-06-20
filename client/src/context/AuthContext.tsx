import { createContext } from "react";
import { User } from "../types/interfaces";

/* interface AuthContextInterface {
    user: User | null;
    setUser: (user: User | null) => void;
}
 */
interface AuthContextInterface {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const AuthContext = createContext<AuthContextInterface>({
    user: null,
    setUser: () => {},
});
