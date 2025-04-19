import { Deal } from '../types';

export const mockDeals: Deal[] = [
    {
        id: '1',
        name: 'Weekend Getaway Package',
        description: 'Perfect for a weekend trip with family or friends. Includes a luxury car and mobile home rental.',
        price: 1200,
        rentalPrice: 200,
        image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&auto=format&fit=crop&q=60',
        category: 'package',
        stock: 5,
        rating: 4.8,
        reviews: 12,
        isAvailable: true,
        isRentable: true,
        duration: '3 days',
        includedItems: [
            'Luxury SUV rental',
            'Mobile home rental',
            'Free insurance',
            '24/7 roadside assistance'
        ]
    },
    {
        id: '2',
        name: 'Family Adventure Package',
        description: 'Everything you need for a family adventure. Includes a spacious SUV and a comfortable mobile home.',
        price: 1500,
        rentalPrice: 250,
        image: 'https://images.unsplash.com/photo-1565214972514-8c0cf12b055f?w=800&auto=format&fit=crop&q=60',
        category: 'package',
        stock: 3,
        rating: 4.9,
        reviews: 8,
        isAvailable: true,
        isRentable: true,
        duration: '5 days',
        includedItems: [
            'Spacious SUV rental',
            'Family mobile home rental',
            'Free insurance',
            '24/7 roadside assistance',
            'Free GPS navigation'
        ]
    },
    {
        id: '3',
        name: 'Luxury Experience Package',
        description: 'Experience the ultimate in luxury with our premium car and mobile home package.',
        price: 2000,
        rentalPrice: 300,
        image: 'https://images.unsplash.com/photo-1562181839-486fa3d217de?w=800&auto=format&fit=crop&q=60',
        category: 'package',
        stock: 2,
        rating: 5.0,
        reviews: 5,
        isAvailable: true,
        isRentable: true,
        duration: '7 days',
        includedItems: [
            'Premium luxury car rental',
            'Luxury mobile home rental',
            'Free insurance',
            '24/7 roadside assistance',
            'Free GPS navigation',
            'Complimentary cleaning service'
        ]
    }
]; 