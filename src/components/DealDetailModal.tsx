import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Box,
  Typography,
  Button,
  Grid,
  Rating,
  Divider,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { Deal, Product } from '../types';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { DEFAULT_PRODUCT_IMAGE } from '../constants/images';

interface DealDetailModalProps {
  deal: Deal;
  open: boolean;
  onClose: () => void;
}

export const DealDetailModal: React.FC<DealDetailModalProps> = ({
  deal,
  open,
  onClose,
}) => {
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

  const handleAddToCart = () => {
    const product = convertDealToProduct(deal);
    addToCart(product);
    onClose();
  };

  const handleRent = () => {
    const product = convertDealToProduct(deal);
    addToCart(product);
    onClose();
    navigate('/cart');
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          maxHeight: '90vh',
        },
      }}
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5">{deal.name}</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' }, 
          gap: 3,
          height: '100%',
        }}>
          <Box sx={{ 
            flex: { xs: 1, md: 1.5 },
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
          }}>
            <Box
              component="img"
              src={deal.image || DEFAULT_PRODUCT_IMAGE}
              alt={deal.name}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = DEFAULT_PRODUCT_IMAGE;
              }}
              sx={{
                width: '100%',
                height: { xs: 'auto', md: '60vh' },
                borderRadius: 2,
                objectFit: 'contain',
                mb: 2,
                bgcolor: 'grey.100',
              }}
            />
          </Box>
          <Box sx={{ 
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
            <Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="h6" color="primary" gutterBottom>
                  ${deal.price}
                  {deal.isRentable && (
                    <Typography component="span" variant="body2" color="text.secondary">
                      {' '}
                      or ${deal.rentalPrice}/day to rent
                    </Typography>
                  )}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Rating value={deal.rating} readOnly precision={0.5} />
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                    ({deal.reviews} reviews)
                  </Typography>
                </Box>
                <Typography variant="body2" color={deal.stock > 0 ? 'success.main' : 'error.main'}>
                  {deal.stock > 0 ? 'In Stock' : 'Out of Stock'}
                </Typography>
              </Box>

              <Typography variant="body1" paragraph>
                {deal.description}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Deal Details
                </Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Category
                    </Typography>
                    <Typography variant="body1">
                      {deal.category}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Stock Available
                    </Typography>
                    <Typography variant="body1">
                      {deal.stock} units
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Rental Status
                    </Typography>
                    <Typography variant="body1">
                      {deal.isRentable ? 'Available for Rent' : 'Not Available for Rent'}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Deal Duration
                    </Typography>
                    <Typography variant="body1">
                      {deal.duration}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Included Items
                </Typography>
                <Box component="ul" sx={{ pl: 2, mb: 0 }}>
                  {deal.includedItems.map((item, index) => (
                    <Typography key={index} component="li" variant="body1">
                      {item}
                    </Typography>
                  ))}
                </Box>
              </Box>

              {deal.isRentable && (
                <Box sx={{ mb: 3, p: 2, bgcolor: 'primary.light', borderRadius: 2 }}>
                  <Typography variant="h6" gutterBottom color="primary">
                    Rent This Deal
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Typography variant="h6" color="primary">
                        ${deal.rentalPrice}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                        per day
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      * Includes insurance and maintenance
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      * Minimum rental period: 1 day
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      * Maximum rental period: 30 days
                    </Typography>
                  </Box>
                </Box>
              )}

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddToCart}
                  fullWidth
                  disabled={deal.stock <= 0}
                >
                  Add to Cart
                </Button>
                {deal.isRentable && (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleRent}
                    fullWidth
                    disabled={deal.stock <= 0}
                  >
                    Rent Now
                  </Button>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}; 