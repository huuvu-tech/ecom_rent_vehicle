// src/types/index.ts
export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    rentalPrice: number;
    images: string[];
    category: string;
    stock: number;
    rating: number;
    reviews: number;
    isAvailable: boolean;
    isRentable: boolean;
}

export interface Category {
    id: string;
    name: string;
    description?: string;
    image?: string;
}

export interface CartItem extends Product {
    quantity: number;
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
}

export interface Deal {
    id: string;
    name: string;
    description: string;
    type: 'combo' | 'extra';
    discount: number;
    products: string[]; // Array of product IDs
    extraItems?: {
        name: string;
        description: string;
        price: number;
    }[];
    validUntil?: string;
    isActive: boolean;
    price: number;
    rentalPrice: number;
    image: string;
    category: string;
    stock: number;
    rating: number;
    reviews: number;
    isAvailable: boolean;
    isRentable: boolean;
    duration: string;
    includedItems: string[];
}