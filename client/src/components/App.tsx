import { Container } from "@chakra-ui/react";
import { Navbar } from "./Navbar";
import { ProductList } from "./ProductList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Profile } from "./profile/Profile";
import { AuthContextProvider } from "./AuthContextProvider";
import { Signin } from "./profile/Signin";
import { Signup } from "./profile/Signup";
import { RequireAdmin, RequireAuth } from "./RouteProtection";
import { AdminPanel } from "./AdminPanel";
import { RentalForm } from "./RentalForm";

function App() {
    return (
        <AuthContextProvider>
            <BrowserRouter>
                <Container maxW="container.lg">
                    <Navbar />
                    <Container maxW="container.lg">
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
            </BrowserRouter>
        </AuthContextProvider>
    );
}

export default App;
