import { SpinnerIcon } from "@chakra-ui/icons";
import {
    Box,
    Button,
    Collapse,
    Flex,
    HStack,
    Spinner,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import { Rental } from "../types/interfaces";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

interface RentalElementProps {
    rental: Rental;
    adminButtons?: {
        loading: boolean;
        error: string;
        onclick: (rental: Rental) => Promise<void>;
        text: string;
    };
}

export const RentalElement: React.FC<RentalElementProps> = ({
    rental,
    adminButtons,
}) => {
    const { isOpen, onToggle } = useDisclosure();
    const [loading, setLoading] = useState(false);
    const apiKey: string = process.env.REACT_APP_API_URL || "";
    const { user } = useContext(AuthContext);

    const handleUpdate = async (properties: {}) => {
        setLoading(true);

        try {
            const response = await fetch(`${apiKey}/rentals/${rental._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": user?.accessToken as string,
                },
                body: JSON.stringify(properties),
            });

            if (!response.ok) {
                throw new Error("Failed to update fields.");
            }

            console.log("Fields updated successfully");
        } catch (error) {
            console.error("Error updating fields:", error);
        }

        setLoading(false);
    };

    // mock function - ideally here we would have a payment system
    // const handlePayFines = await handleUpdate({ fines: 0 });
    // const handleReturn = await handleUpdate({
    //     isPending: true,
    //     dueDate: new Date(),
    // });

    return (
        <>
            <Box
                mt="3"
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
                <Text>{rental.productName}</Text>
                <Collapse in={isOpen}>
                    <Flex justify="space-evenly" align="center" mb="2">
                        <HStack>
                            <Text mr="5">BorrowDate : </Text>
                            <Text mr="5">
                                DAY :{" "}
                                {rental.borrowDate
                                    ? rental.borrowDate
                                          .toString()
                                          .substring(0, 10)
                                    : "pending shipment"}
                            </Text>
                            <Text>
                                TIME :{" "}
                                {rental.borrowDate
                                    ? rental.borrowDate
                                          .toString()
                                          .substring(11, 19)
                                    : "pending shipment"}
                            </Text>
                        </HStack>
                        <HStack>
                            <Text mr="5">DueDate : </Text>
                            <Text mr="5">
                                DAY :{" "}
                                {rental.dueDate
                                    ? rental?.dueDate
                                          .toString()
                                          .substring(0, 10)
                                    : "pending shipment"}
                            </Text>
                            <Text>
                                TIME :{" "}
                                {rental.dueDate
                                    ? rental?.dueDate
                                          .toString()
                                          .substring(11, 19)
                                    : "pending shipment"}
                            </Text>
                        </HStack>
                    </Flex>
                    <Flex justify="space-evenly" align="center">
                        <HStack>
                            <Text mr="10">Fine : {rental.fine}</Text>
                            <Text>Quantity : {rental.quantity}</Text>
                        </HStack>
                    </Flex>
                    {adminButtons && (
                        <Flex justify="space-evenly">
                            <HStack>
                                <Text>Borrower's Id : {rental.clientId}</Text>
                                <Text mr="5">
                                    Rented product Id: {rental.productId}
                                </Text>
                                {/* <Button as={Link} to={`/products/:${rental.productId}`}>GoTo Product</Button> */}
                            </HStack>
                        </Flex>
                    )}
                </Collapse>
                {adminButtons &&
                    (adminButtons.loading ? (
                        <Text>
                            <Spinner size="lg" />
                        </Text>
                    ) : (
                        <>
                            <Button
                                onClick={() => adminButtons.onclick(rental)}
                            >
                                Confirm shipment
                            </Button>
                            {adminButtons?.error}
                        </>
                    ))}
            </Box>
            {!adminButtons && isOpen && (
                <Flex justify="space-evenly" align="center">
                    <HStack>
                        {rental.fine && (
                            <Button
                                colorScheme="red"
                                onClick={() => handleUpdate({ fines: 0 })}
                            >
                                pay fines
                            </Button>
                        )}
                        <Button
                            onClick={() => {
                                if (rental.fine) {
                                    alert("You need to pay fines first");
                                } else {
                                    handleUpdate({
                                        isPending: true,
                                        returnDate: new Date(),
                                    });
                                }
                            }}
                        >
                            return
                        </Button>
                    </HStack>
                </Flex>
            )}
        </>
    );
};
