export interface User {
    id: string;
    username: string;
    role: "user" | "admin";
    accessToken: string;
}

export interface Rental {
    _id: string;
    clientId: string;
    productId: string;
    quantity?: number;
    isPending?: boolean;
    borrowDate?: Date;
    dueDate?: Date;
    fine?: number;
    ifProlonged?: boolean;
}
