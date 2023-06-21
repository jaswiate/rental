import { ChevronRightIcon } from "@chakra-ui/icons";
import {
    Box,
    Button,
    Collapse,
    HStack,
    List,
    ListItem,
    Text,
    useDisclosure, Grid, GridItem, Center, VStack, useToast, Spinner,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Product } from "../types/interfaces";
import { RequireAuth } from "./RouteProtection";

const productsPerPage = 9;

export const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const apiKey: string = process.env.REACT_APP_API_URL || "";
    useEffect(() => {
        fetchProducts();
    }, [currentPage]);

    async function fetchProducts() {
        try {
            console.log(apiKey + products);
            const response = await fetch(apiKey + "/products");
            const data: Product[] = await response.json();
            setProducts(data);
        } catch (error) {
            console.error(
                "An error occurred while fetching the products:",
                error
            );
        }
    }

    const totalPages = Math.ceil(products.length / productsPerPage);

    function goToPage(page: number) {
        setCurrentPage(page);
    }

    function previousPage() {
        setCurrentPage((prevPage) => prevPage - 1);
    }

    function nextPage() {
        setCurrentPage((prevPage) => prevPage + 1);
    }

    const startIndex = (currentPage - 1) * productsPerPage;
    const displayedProducts = products.slice(
        startIndex,
        startIndex + productsPerPage
    );
    return (
        <div>
            {displayedProducts.length === 0 ? (
                <HStack justifyContent="center" p="10">
                    <Spinner size='xl' thickness="4px" color="blue.100" speed="1.1s"></Spinner>
                </HStack>
            ) : (
                <>
                    <Grid templateColumns='repeat(3, 1fr)' gap={5} margin="5">
                        {displayedProducts.map((product) => (
                            <GridItem key={product._id}>
                                <ProductElement product={product} />
                            </GridItem>
                        ))}
                    </Grid>             
                    <HStack m="5" mt="10" justifyContent="center">
                        <Button
                            onClick={previousPage}
                            disabled={currentPage === 1}
                        >
                            Poprzednia strona
                        </Button>
                        <span>
                            {currentPage}/{totalPages}
                        </span>
                        <Button
                            onClick={nextPage}
                            disabled={currentPage === totalPages}
                        >
                            Następna strona
                        </Button>
                    </HStack>
                </>
            )}
        </div>
    );
};

interface ProductElementProps {
    product: Product;
}

const ProductElement: React.FC<ProductElementProps> = ({ product }) => {
    const { isOpen, onToggle } = useDisclosure();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const toast = useToast()

    return (
        <Box
            borderBottom="2px"
            borderRadius="50"
            padding="3"
            // _hover={{
            //     border: "2px",
            //     cursor: "pointer",
            //     borderRadius: "50",
            // }}
            onClick={onToggle}
        >
            <HStack justifyContent="center">
                <Box boxShadow="5px -5px 7px 1px"
                     _hover={{
                        
                        cursor: "pointer",
                     }}
                ><img src={product.imageUrl} alt={product.name} width="220"/></Box>
            </HStack>
            <Collapse in={isOpen}>
                <Box color="white.100">
                    <VStack>
                        <Text fontSize="lg">{product.name}</Text>
                        <p>{product.description}</p>
                        <p>Quantity: {product.quantity}</p>
                        {user ? (
                            <Button
                                colorScheme="blue"
                                size="sm"
                                onClick={() => {
                                    toast({
                                        title: 'Okay!',
                                        description: 'Please enter the quantity',
                                        status: 'success',
                                        duration: 5000,
                                        isClosable: true,
                                    })
                                    navigate(`/new-rental/:${product._id}`);
                                }}
                            >
                                Rent
                            </Button>
                        ) : (
                            <Button
                                colorScheme="blue"
                                size="sm"
                                onClick={() => {
                                    toast({
                                        title: 'Error',
                                        description: 'You need to be signed in to rent!',
                                        status: 'error',
                                        duration: 5000,
                                        isClosable: true,
                                    })
                                    navigate("/signin");
                                }}
                            >
                            Rent
                            </Button>
                        )}
                    </VStack>
                </Box>
            </Collapse>
        </Box>
    );
};
