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

interface RentalElementProps {
    rental: Rental;
    adminButtons?: {
        loading: boolean;
        error: string;
        onclick: (rental: Rental) => Promise<void>;
    };
}

export const RentalElement: React.FC<RentalElementProps> = ({
    rental,
    adminButtons,
}) => {
    const { isOpen, onToggle } = useDisclosure();

    return (
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
                                ? rental.borrowDate.toString().substring(0, 10)
                                : "pending shipment"}
                        </Text>
                        <Text>
                            TIME :{" "}
                            {rental.borrowDate
                                ? rental.borrowDate.toString().substring(11, 19)
                                : "pending shipment"}
                        </Text>
                    </HStack>
                    <HStack>
                        <Text mr="5">DueDate : </Text>
                        <Text mr="5">
                            DAY :{" "}
                            {rental.dueDate
                                ? rental?.dueDate.toString().substring(0, 10)
                                : "pending shipment"}
                        </Text>
                        <Text>
                            TIME :{" "}
                            {rental.dueDate
                                ? rental?.dueDate.toString().substring(11, 19)
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
                        <Button onClick={() => adminButtons.onclick(rental)}>
                            Confirm shipment
                        </Button>
                        {adminButtons?.error}
                    </>
                ))}
        </Box>
    );
};
