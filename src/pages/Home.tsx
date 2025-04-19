// src/pages/Home.tsx
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Typography, Box, Paper, Button, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/slices/productSlice';
import { ProductCard } from '../components/ProductCard';
import { ProductCardSkeleton } from '../components/ProductCardSkeleton';
import { ProductCarousel } from '../components/ProductCarousel';
import { RootState } from '../store';
import { AppDispatch } from '../store';
import { ViewModule, ViewCarousel } from '@mui/icons-material';
import { mockDeals } from '../data/mockDeals';
import { DealCard } from '../components/DealCard';
import { DEFAULT_PRODUCT_IMAGE } from '../constants/images';

export const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items: products, loading } = useSelector((state: RootState) => state.products);
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');
  const [mobileHomeViewMode, setMobileHomeViewMode] = useState<'carousel' | 'grid'>('carousel');

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const featuredCars = products.filter(product => product.category === 'car');
  const featuredMobileHomes = products.filter(product => product.category === 'mobile-home');

  const handleViewModeChange = (
    event: React.MouseEvent<HTMLElement>,
    newViewMode: 'carousel' | 'grid',
  ) => {
    if (newViewMode !== null) {
      setViewMode(newViewMode);
    }
  };

  const handleMobileHomeViewModeChange = (
    event: React.MouseEvent<HTMLElement>,
    newViewMode: 'carousel' | 'grid',
  ) => {
    if (newViewMode !== null) {
      setMobileHomeViewMode(newViewMode);
    }
  };

  const renderSkeletons = (count: number) => {
    return Array(count).fill(0).map((_, index) => (
      <Box key={index} sx={{ width: { xs: '100%', sm: '50%', md: '33.33%' }, p: 2 }}>
        <Box sx={{ display: 'flex' }}>
          <ProductCardSkeleton />
        </Box>
      </Box>
    ));
  };

  return (
    <>
      <Helmet>
        <title>Home - Car & Mobile Home Rental</title>
        <meta name="description" content="Rent luxury cars and mobile homes for your next adventure" />
      </Helmet>

      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Video Background */}
        <Box
          component="video"
          autoPlay
          muted
          loop
          playsInline
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
          }}
        >
          <source src="https://static-videos.artlist.io/artlist/488-Footage-3xl-Jan-25-V2.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </Box>

        {/* Gray Overlay */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1,
          }}
        />

        {/* Content */}
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, pl: { xs: 2, sm: 4, md: 6 } }}>
          <Box sx={{ maxWidth: '600px' }}>
            <Typography
              component="h1"
              variant="h2"
              color="white"
              gutterBottom
              sx={{ textAlign: 'left' }}
            >
              Welcome to Our Rental Service
            </Typography>
            <Typography 
              variant="h5" 
              color="white" 
              paragraph
              sx={{ textAlign: 'left' }}
            >
              Discover our premium selection of cars and mobile homes for your next adventure.
              Whether you need a luxury car for a business trip or a spacious mobile home for a family vacation,
              we have the perfect vehicle for you.
            </Typography>
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-start' }}>
              <Button variant="contained" color="primary" size="large">
                Browse All Vehicles
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg">
        {/* Featured Cars Section */}
        <Box sx={{ mt: 12, mb: 8 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography variant="h4" component="h2">
              Featured Cars
            </Typography>
            <ToggleButtonGroup
              value={viewMode}
              exclusive
              onChange={handleViewModeChange}
              aria-label="view mode"
            >
              <ToggleButton value="carousel" aria-label="carousel view">
                <ViewCarousel />
              </ToggleButton>
              <ToggleButton value="grid" aria-label="grid view">
                <ViewModule />
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
          
          {viewMode === 'carousel' ? (
            <ProductCarousel products={featuredCars} loading={loading} />
          ) : (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', mx: -2, position: 'relative' }}>
              {loading ? (
                renderSkeletons(3)
              ) : (
                featuredCars.map((product) => (
                  <Box key={product.id} sx={{ width: { xs: '100%', sm: '50%', md: '33.33%' }, p: 2, position: 'relative' }}>
                    <Box sx={{ display: 'flex', position: 'relative' }}>
                      <ProductCard product={product} />
                    </Box>
                  </Box>
                ))
              )}
            </Box>
          )}
        </Box>

        {/* Featured Mobile Homes Section */}
        <Box sx={{ mb: 8 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography variant="h4" component="h2">
              Featured Mobile Homes
            </Typography>
            <ToggleButtonGroup
              value={mobileHomeViewMode}
              exclusive
              onChange={handleMobileHomeViewModeChange}
              aria-label="mobile home view mode"
            >
              <ToggleButton value="carousel" aria-label="carousel view">
                <ViewCarousel />
              </ToggleButton>
              <ToggleButton value="grid" aria-label="grid view">
                <ViewModule />
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
          
          {mobileHomeViewMode === 'carousel' ? (
            <ProductCarousel products={featuredMobileHomes} loading={loading} />
          ) : (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', mx: -2, position: 'relative' }}>
              {loading ? (
                renderSkeletons(3)
              ) : featuredMobileHomes.length > 0 ? (
                featuredMobileHomes.map((product) => (
                  <Box key={product.id} sx={{ width: { xs: '100%', sm: '50%', md: '33.33%' }, p: 2, position: 'relative' }}>
                    <Box sx={{ display: 'flex', position: 'relative' }}>
                      <ProductCard product={product} />
                    </Box>
                  </Box>
                ))
              ) : (
                <Box sx={{ width: '100%', textAlign: 'center', py: 4 }}>
                  <Typography variant="h6" color="text.secondary">
                    No mobile homes available at the moment
                  </Typography>
                </Box>
              )}
            </Box>
          )}
        </Box>

        {/* Special Deals Section */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 4 }}>
            Special Deals & Packages
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', mx: -2 }}>
            {mockDeals.map((deal) => (
              <Box key={deal.id} sx={{ width: { xs: '100%', sm: '50%', md: '33.33%' }, p: 2 }}>
                <DealCard deal={deal} />
              </Box>
            ))}
          </Box>
        </Box>

        {/* Why Choose Us Section */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 4 }}>
            Why Choose Us
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', mx: -2 }}>
            <Box sx={{ width: { xs: '100%', md: '33.33%' }, p: 2 }}>
              <Box sx={{ display: 'flex' }}>
                <Paper elevation={0} sx={{ p: 3, height: '100%', textAlign: 'center', width: '100%' }}>
                  <Typography variant="h6" gutterBottom>
                    Premium Vehicles
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Our fleet consists of the latest models with top-notch features and regular maintenance.
                  </Typography>
                </Paper>
              </Box>
            </Box>
            <Box sx={{ width: { xs: '100%', md: '33.33%' }, p: 2 }}>
              <Box sx={{ display: 'flex' }}>
                <Paper elevation={0} sx={{ p: 3, height: '100%', textAlign: 'center', width: '100%' }}>
                  <Typography variant="h6" gutterBottom>
                    Flexible Rental Options
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Choose from daily, weekly, or monthly rental plans to suit your needs.
                  </Typography>
                </Paper>
              </Box>
            </Box>
            <Box sx={{ width: { xs: '100%', md: '33.33%' }, p: 2 }}>
              <Box sx={{ display: 'flex' }}>
                <Paper elevation={0} sx={{ p: 3, height: '100%', textAlign: 'center', width: '100%' }}>
                  <Typography variant="h6" gutterBottom>
                    24/7 Support
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Our dedicated support team is available round the clock to assist you.
                  </Typography>
                </Paper>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
};