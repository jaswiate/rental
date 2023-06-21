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

export interface Product {
    _id: string;
    name: string;
    description: string;
    quantity: number;
    imageUrl: string;
}
