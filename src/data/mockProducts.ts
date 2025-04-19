import { Product } from '../types';

export const mockProducts: Product[] = [
  // Xe hơi
  {
    id: '1',
    name: 'Toyota Camry 2025',
    description: 'Sedan sang trọng với tính năng an toàn tiên tiến và nội thất thoải mái',
    price: 28700,
    rentalPrice: 150,
    images: ['https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&auto=format&fit=crop&q=60'],
    category: 'car',
    stock: 5,
    rating: 4.5,
    reviews: 12,
    isAvailable: true,
    isRentable: true
  },
  {
    id: '2',
    name: 'Honda CR-V 2025',
    description: 'SUV rộng rãi, lý tưởng cho gia đình và du lịch ngoài trời',
    price: 30100,
    rentalPrice: 180,
    images: ['https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&auto=format&fit=crop&q=60'],
    category: 'car',
    stock: 3,
    rating: 4.7,
    reviews: 8,
    isAvailable: true,
    isRentable: true
  },
  {
    id: '3',
    name: 'Tesla Model 3 2025',
    description: 'Sedan điện với hệ thống lái tự động và nội thất cao cấp',
    price: 44130,
    rentalPrice: 200,
    images: ['https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&auto=format&fit=crop&q=60'],
    category: 'car',
    stock: 2,
    rating: 4.9,
    reviews: 15,
    isAvailable: true,
    isRentable: true
  },
  {
    id: '4',
    name: 'BMW X5 2025',
    description: 'SUV sang trọng với hiệu suất mạnh mẽ và tính năng cao cấp',
    price: 66695,
    rentalPrice: 250,
    images: ['https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&auto=format&fit=crop&q=60'],
    category: 'car',
    stock: 1,
    rating: 4.8,
    reviews: 6,
    isAvailable: true,
    isRentable: true
  },

  // Xe bán tải
  {
    id: '5',
    name: 'Ford F-150 2025',
    description: 'Xe bán tải cỡ lớn với động cơ mạnh và khả năng kéo tốt',
    price: 38810,
    rentalPrice: 200,
    images: ['https://images.unsplash.com/photo-1503467913725-8484b65b0715?w=800&auto=format&fit=crop&q=60'],
    category: 'truck',
    stock: 4,
    rating: 4.6,
    reviews: 10,
    isAvailable: true,
    isRentable: true
  },
  {
    id: '6',
    name: 'Chevrolet Silverado 1500 2025',
    description: 'Xe bán tải cỡ lớn với hiệu suất bền bỉ và nội thất thoải mái',
    price: 37645,
    rentalPrice: 190,
    images: ['https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=60'],
    category: 'truck',
    stock: 3,
    rating: 4.5,
    reviews: 9,
    isAvailable: true,
    isRentable: true
  },
  {
    id: '7',
    name: 'Ram 1500 2025',
    description: 'Xe bán tải cỡ lớn với nội thất sang trọng và khả năng vận hành mượt mà',
    price: 41075,
    rentalPrice: 220,
    images: ['https://images.unsplash.com/photo-1519643381402-8cd0e605f339?w=800&auto=format&fit=crop&q=60'],
    category: 'truck',
    stock: 2,
    rating: 4.7,
    reviews: 7,
    isAvailable: true,
    isRentable: true
  },
  {
    id: '8',
    name: 'Toyota Tacoma 2025',
    description: 'Xe bán tải cỡ trung với khả năng off-road và độ tin cậy cao',
    price: 31500,
    rentalPrice: 170,
    images: ['https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=800&auto=format&fit=crop&q=60'],
    category: 'truck',
    stock: 5,
    rating: 4.8,
    reviews: 11,
    isAvailable: true,
    isRentable: true
  },

  // Xe bán tải gắn nhà di động nhỏ
  {
    id: '9',
    name: 'Ford F-150 2025 with Lance 850 Camper',
    description: 'Xe bán tải với nhà di động nhỏ, lý tưởng cho cuộc sống di động',
    price: 73810,
    rentalPrice: 300,
    images: [
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1503467913725-8484b65b0715?w=800&auto=format&fit=crop&q=60'
    ],
    category: 'truck-camper',
    stock: 2,
    rating: 4.6,
    reviews: 5,
    isAvailable: true,
    isRentable: true
  },
  {
    id: '10',
    name: 'Chevrolet Silverado 1500 2025 with Four Wheel Campers',
    description: 'Xe bán tải với nhà di động pop-up, hoàn hảo cho các chuyến cắm trại',
    price: 62645,
    rentalPrice: 280,
    images: [
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=60'
    ],
    category: 'truck-camper',
    stock: 1,
    rating: 4.7,
    reviews: 4,
    isAvailable: true,
    isRentable: true
  },
  {
    id: '11',
    name: 'Ram 1500 2025 with Northstar Camper',
    description: 'Xe bán tải với nhà di động nhỏ, cung cấp không gian sống thoải mái',
    price: 76075,
    rentalPrice: 320,
    images: [
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1519643381402-8cd0e605f339?w=800&auto=format&fit=crop&q=60'
    ],
    category: 'truck-camper',
    stock: 3,
    rating: 4.8,
    reviews: 6,
    isAvailable: true,
    isRentable: true
  },
  {
    id: '12',
    name: 'Toyota Tacoma 2025 with Capri Camper',
    description: 'Xe bán tải cỡ trung với nhà di động nhỏ, phù hợp cho các chuyến phiêu lưu',
    price: 66500,
    rentalPrice: 290,
    images: [
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=800&auto=format&fit=crop&q=60'
    ],
    category: 'truck-camper',
    stock: 2,
    rating: 4.9,
    reviews: 3,
    isAvailable: true,
    isRentable: true
  },

  // Nhà di động
  {
    id: '13',
    name: 'Winnebago Vista 35B 2025',
    description: 'Motorhome hạng A sang trọng với đầy đủ tiện nghi và không gian sống rộng rãi',
    price: 250000,
    rentalPrice: 400,
    images: [
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1565214972514-8c0cf12b055f?w=800&auto=format&fit=crop&q=60'
    ],
    category: 'mobile-home',
    stock: 2,
    rating: 4.8,
    reviews: 5,
    isAvailable: true,
    isRentable: true
  },
  {
    id: '14',
    name: 'Airstream Classic 30RB 2025',
    description: 'Xe kéo du lịch cao cấp với thiết kế hiện đại và tính năng cao cấp',
    price: 150000,
    rentalPrice: 350,
    images: [
      'https://images.unsplash.com/photo-1562181839-486fa3d217de?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1565214972514-8c0cf12b055f?w=800&auto=format&fit=crop&q=60'
    ],
    category: 'mobile-home',
    stock: 1,
    rating: 4.9,
    reviews: 3,
    isAvailable: true,
    isRentable: true
  },
  {
    id: '15',
    name: 'Thor Motor Coach Four Winds 31E 2025',
    description: 'Motorhome hạng C rộng rãi với giường tầng và bố trí thân thiện gia đình',
    price: 180000,
    rentalPrice: 380,
    images: [
      'https://images.unsplash.com/photo-1565214972514-8c0cf12b055f?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&auto=format&fit=crop&q=60'
    ],
    category: 'mobile-home',
    stock: 4,
    rating: 4.6,
    reviews: 10,
    isAvailable: true,
    isRentable: true
  },
  {
    id: '16',
    name: 'Forest River Rockwood Ultra Lite 2608BS 2025',
    description: 'Xe kéo nhẹ với bếp phía trước và lối vào đôi',
    price: 130000,
    rentalPrice: 300,
    images: [
      'https://images.unsplash.com/photo-1562181839-486fa3d217de?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&auto=format&fit=crop&q=60'
    ],
    category: 'mobile-home',
    stock: 3,
    rating: 4.7,
    reviews: 7,
    isAvailable: true,
    isRentable: true
  }
];