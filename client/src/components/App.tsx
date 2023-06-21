import { Container } from "@chakra-ui/react";
import { Navbar } from "./Navbar";
import { ProductList } from "./ProductList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Profile } from "./profile/Profile";
import { AuthContextProvider } from "./AuthContextProvider";
import { Signin } from "./profile/Signin";
import { Signup } from "./profile/Signup";
import { RequireAdmin, RequireAuth } from "./RouteProtection";
import { AdminPanel } from "./admin/AdminPanel";
import { RentalForm } from "./RentalForm";
import "./App.css";

function App() {
    // const { colorMode, toggleColorMode } = useColorMode();
    const bgColor = useColorModeValue("rgb(249, 255, 255)", "rgb(10, 20, 35)");
    return (
        <AuthContextProvider>
            <BrowserRouter>
                <html>
                    <Container maxW="72vw" borderLeft="2px" borderRight="2px" borderColor="blue.100" borderRadius={30} bg={bgColor} pb="5">
                        <Navbar />
                        <Container maxW="68vw">
                            <Routes>
                                <Route index element={<ProductList />}></Route>
                                <Route path="/profile" element={<Profile />} />
                                <Route path="/signin" element={<Signin />} />
                                <Route path="/signup" element={<Signup />} />
                                <Route
                                    path="/admin"
                                    element={
                                        <RequireAuth>
                                            <RequireAdmin>
                                                <AdminPanel />
                                            </RequireAdmin>
                                        </RequireAuth>
                                    }
                                />
                                <Route
                                    path="/new-rental/:productId"
                                    element={
                                        <RequireAuth>
                                            <RentalForm />
                                        </RequireAuth>
                                    }
                                />
                            </Routes>
                        </Container>
                    </Container>
                </html>
            </BrowserRouter>
        </AuthContextProvider>
    );
}

export default App;
