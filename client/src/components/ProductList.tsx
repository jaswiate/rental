import { ChevronRightIcon } from "@chakra-ui/icons";
import {
    Box,
    Button,
    Collapse,
    HStack,
    List,
    ListItem,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

interface Product {
    _id: number;
    name: string;
    description: string;
    quantity: number;
    imageUrl: string;
}

const productsPerPage = 10;

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
                <p>Loading products...</p>
            ) : (
                <>
                    <List spacing={3} marginTop="5">
                        {displayedProducts.map((product) => (
                            <ListItem key={product._id}>
                                <ProductElement product={product} />
                            </ListItem>
                        ))}
                    </List>
                    {displayedProducts.length >= productsPerPage && (
                        <div>
                            <button
                                onClick={previousPage}
                                disabled={currentPage === 1}
                            >
                                Poprzednia strona
                            </button>
                            <span>
                                {currentPage}/{totalPages}
                            </span>
                            <button
                                onClick={nextPage}
                                disabled={currentPage === totalPages}
                            >
                                Następna strona
                            </button>
                        </div>
                    )}
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

    return (
        <Box
            borderBottom="1px"
            borderColor="gray.200"
            borderRadius="base"
            padding="1"
            _hover={{
                border: "1px",
                borderColor: "gray.200",
                cursor: "pointer",
            }}
            onClick={onToggle}
        >
            <HStack>
                <Text fontSize="lg">{product.name}</Text>
            </HStack>
            <Collapse in={isOpen}>
                <Box color="gray.500">
                    {" "}
                    <p>{product.description}</p>
                    <p>Quantity: {product.quantity}</p>
                    <img src={product.imageUrl} alt={product.name} />
                    {user ? (
                        <Button
                            colorScheme="blue"
                            size="sm"
                            as={Link}
                            to={`/new-rental/${product._id}`}
                        >
                            Rent
                        </Button>
                    ) : (
                        <Button
                            colorScheme="blue"
                            size="sm"
                            onClick={() => {
                                alert("You need to be signed in to rent!");
                                navigate("/signin");
                            }}
                        >
                            Rent
                        </Button>
                    )}
                </Box>
            </Collapse>
        </Box>
    );
};
