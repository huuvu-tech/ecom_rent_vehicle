import React, { useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
} from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { Deal, Product } from '../types';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { DealDetailModal } from './DealDetailModal';
import { DEFAULT_PRODUCT_IMAGE } from '../constants/images';

interface DealCardProps {
  deal: Deal;
}

export const DealCard: React.FC<DealCardProps> = ({ deal }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const convertDealToProduct = (deal: Deal): Product => {
    return {
      id: deal.id,
      name: deal.name,
      description: deal.description,
      price: deal.price,
      rentalPrice: deal.rentalPrice,
      images: [deal.image],
      category: deal.category,
      stock: deal.stock,
      rating: deal.rating,
      reviews: deal.reviews,
      isAvailable: deal.isAvailable,
      isRentable: deal.isRentable,
    };
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddToCart = () => {
    const product = convertDealToProduct(deal);
    addToCart(product);
  };

  return (
    <>
      <Card
        sx={{
          minHeight: 400,
          height: 'auto',
          display: 'flex',
          flexDirection: 'column',
          transition: 'transform 0.2s',
          position: 'relative',
          '&:hover': {
            transform: 'scale(1.02)',
            boxShadow: 6,
            zIndex: 1,
          },
          cursor: 'pointer',
        }}
        onClick={handleOpenModal}
      >
        <CardMedia
          component="img"
          height="200"
          image={deal.image || DEFAULT_PRODUCT_IMAGE}
          alt={deal.name}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = DEFAULT_PRODUCT_IMAGE;
          }}
          sx={{ objectFit: 'cover' }}
        />
        <CardContent
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            p: 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              mb: 1,
            }}
          >
            <Typography
              gutterBottom
              variant="h6"
              component="h2"
              sx={{
                fontWeight: 'bold',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 1,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {deal.name}
            </Typography>
            <Chip
              label={deal.stock > 0 ? 'Available' : 'Unavailable'}
              color={deal.stock > 0 ? 'success' : 'error'}
              size="small"
            />
          </Box>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 2,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {deal.description}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
              ${deal.price}
            </Typography>
            {deal.isRentable && (
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                or ${deal.rentalPrice}/day
              </Typography>
            )}
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mt: 'auto',
            }}
          >
            <Box>
              <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                ${deal.price}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                + taxes & fees
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<ShoppingCart />}
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart();
                }}
                fullWidth
              >
                Add to Cart
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>

      <DealDetailModal deal={deal} open={isModalOpen} onClose={handleCloseModal} />
    </>
  );
}; 