import React, { useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  IconButton,
  TextField,
  Chip,
} from '@mui/material';
import { ShoppingCart, Favorite } from '@mui/icons-material';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { ProductDetailModal } from './ProductDetailModal';
import { DEFAULT_PRODUCT_IMAGE } from '../constants/images';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rentalDays, setRentalDays] = useState(1);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddToCart = () => {
    if (product.isRentable) {
      addToCart(product, 1, rentalDays);
    } else {
      addToCart(product);
    }
  };

  const handleRent = () => {
    addToCart(product, 1, rentalDays);
    navigate('/cart');
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
          image={product.images?.[0] || DEFAULT_PRODUCT_IMAGE}
          alt={product.name}
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
              {product.name}
            </Typography>
            <Chip
              label={product.stock > 0 ? 'Available' : 'Unavailable'}
              color={product.stock > 0 ? 'success' : 'error'}
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
            {product.description}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
              ${product.price}
            </Typography>
            {product.isRentable && (
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                or ${product.rentalPrice}/day
              </Typography>
            )}
          </Box>

          {product.isRentable && (
            <Box sx={{ mb: 2 }}>
              <TextField
                type="number"
                size="small"
                label="Rental Days"
                value={rentalDays}
                onChange={(e) => setRentalDays(Math.max(1, parseInt(e.target.value)))}
                inputProps={{ min: 1 }}
                fullWidth
                onClick={(e) => e.stopPropagation()}
              />
            </Box>
          )}

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
                ${product.price}
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
              {product.isRentable && (
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRent();
                  }}
                  fullWidth
                >
                  Rent Now
                </Button>
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>

      <ProductDetailModal product={product} open={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};
