import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Box,
  Typography,
  Button,
  TextField,
  Grid,
  Rating,
  Divider,
  InputAdornment,
} from '@mui/material';
import { Close as CloseIcon, NavigateBefore, NavigateNext } from '@mui/icons-material';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { DEFAULT_PRODUCT_IMAGE } from '../constants/images';

interface ProductDetailModalProps {
  product: Product;
  open: boolean;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  open,
  onClose,
}) => {
  const [rentalDays, setRentalDays] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (product.isRentable) {
      addToCart(product, 1, rentalDays);
    } else {
      addToCart(product);
    }
    onClose();
  };

  const handleRent = () => {
    addToCart(product, 1, rentalDays);
    onClose();
    navigate('/cart');
  };

  const handlePreviousImage = () => {
    setSelectedImageIndex((prevIndex) => 
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prevIndex) => 
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
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
          <Typography variant="h5">{product.name}</Typography>
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
              src={product.images?.[selectedImageIndex] || DEFAULT_PRODUCT_IMAGE}
              alt={product.name}
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
            {product.images.length > 1 && (
              <>
                <IconButton
                  onClick={handlePreviousImage}
                  sx={{
                    position: 'absolute',
                    left: 8,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    bgcolor: 'background.paper',
                    '&:hover': {
                      bgcolor: 'background.paper',
                    },
                  }}
                >
                  <NavigateBefore />
                </IconButton>
                <IconButton
                  onClick={handleNextImage}
                  sx={{
                    position: 'absolute',
                    right: 8,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    bgcolor: 'background.paper',
                    '&:hover': {
                      bgcolor: 'background.paper',
                    },
                  }}
                >
                  <NavigateNext />
                </IconButton>
                <Box sx={{ 
                  display: 'flex', 
                  gap: 1, 
                  overflowX: 'auto',
                  pb: 1,
                  mt: 'auto',
                  '&::-webkit-scrollbar': {
                    height: '4px',
                  },
                  '&::-webkit-scrollbar-track': {
                    background: '#f1f1f1',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    background: '#888',
                    borderRadius: '4px',
                  },
                }}>
                  {product.images.map((image, index) => (
                    <Box
                      key={index}
                      component="img"
                      src={image || DEFAULT_PRODUCT_IMAGE}
                      alt={`${product.name} - Image ${index + 1}`}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = DEFAULT_PRODUCT_IMAGE;
                      }}
                      onClick={() => setSelectedImageIndex(index)}
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: 1,
                        objectFit: 'cover',
                        cursor: 'pointer',
                        border: selectedImageIndex === index ? '2px solid' : '1px solid',
                        borderColor: selectedImageIndex === index ? 'primary.main' : 'divider',
                        opacity: selectedImageIndex === index ? 1 : 0.7,
                        transition: 'all 0.2s',
                        '&:hover': {
                          opacity: 1,
                        },
                      }}
                    />
                  ))}
                </Box>
              </>
            )}
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
                  ${product.price}
                  {product.isRentable && (
                    <Typography component="span" variant="body2" color="text.secondary">
                      {' '}
                      or ${product.rentalPrice}/day to rent
                    </Typography>
                  )}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Rating value={product.rating} readOnly precision={0.5} />
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                    ({product.reviews} reviews)
                  </Typography>
                </Box>
                <Typography variant="body2" color={product.stock > 0 ? 'success.main' : 'error.main'}>
                  {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                </Typography>
              </Box>

              <Typography variant="body1" paragraph>
                {product.description}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Specifications
                </Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Category
                    </Typography>
                    <Typography variant="body1">
                      {product.category}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Stock Available
                    </Typography>
                    <Typography variant="body1">
                      {product.stock} units
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Rental Status
                    </Typography>
                    <Typography variant="body1">
                      {product.isRentable ? 'Available for Rent' : 'Not Available for Rent'}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Condition
                    </Typography>
                    <Typography variant="body1">
                      New
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Features
                </Typography>
                <Box component="ul" sx={{ pl: 2, mb: 0 }}>
                  <Typography component="li" variant="body1">
                    High-quality materials and construction
                  </Typography>
                  <Typography component="li" variant="body1">
                    Easy to use and maintain
                  </Typography>
                  <Typography component="li" variant="body1">
                    Includes warranty and support
                  </Typography>
                  <Typography component="li" variant="body1">
                    Free delivery on orders over $100
                  </Typography>
                </Box>
              </Box>

              {product.isRentable && (
                <Box sx={{ mb: 3, p: 2, bgcolor: 'primary.dark', borderRadius: 2 }}>
                  <Typography variant="h6" gutterBottom color="white">
                    Rent This Item
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Typography variant="h6" color="white">
                        ${product.rentalPrice}
                      </Typography>
                      <Typography variant="body2" color="rgba(255, 255, 255, 0.7)" sx={{ ml: 1 }}>
                        per day
                      </Typography>
                    </Box>
                    <TextField
                      type="number"
                      size="small"
                      value={rentalDays}
                      onChange={(e) => setRentalDays(parseInt(e.target.value))}
                      inputProps={{ min: 1, max: 30 }}
                      fullWidth
                      placeholder="Number of Days"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Typography variant="body2" sx={{ fontWeight: 600, color: 'rgba(51, 51, 51, 0.7)' }}>
                              days
                            </Typography>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" color="white">Total Rental Cost:</Typography>
                      <Typography variant="body1" fontWeight="bold" color="white">
                        ${(product.rentalPrice * rentalDays).toFixed(2)}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="rgba(255, 255, 255, 0.7)" paragraph>
                      * Includes insurance and maintenance
                    </Typography>
                    <Typography variant="body2" color="rgba(255, 255, 255, 0.7)" paragraph>
                      * Minimum rental period: 1 day
                    </Typography>
                    <Typography variant="body2" color="rgba(255, 255, 255, 0.7)">
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
                  disabled={product.stock <= 0}
                >
                  Add to Cart
                </Button>
                {product.isRentable && (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleRent}
                    fullWidth
                    disabled={product.stock <= 0}
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