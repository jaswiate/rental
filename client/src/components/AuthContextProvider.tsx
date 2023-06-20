import { ReactNode, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { User } from "../types/interfaces";

type ListProps = {
    children: ReactNode;
};

export const AuthContextProvider: React.FC<ListProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};
