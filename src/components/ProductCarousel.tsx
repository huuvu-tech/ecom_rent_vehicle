import React from 'react';
import { Box, IconButton, useTheme, useMediaQuery } from '@mui/material';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { ProductCardSkeleton } from './ProductCardSkeleton';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

interface ProductCarouselProps {
  products: Product[];
  loading: boolean;
}

export const ProductCarousel: React.FC<ProductCarouselProps> = ({ products, loading }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isAnimating, setIsAnimating] = React.useState(false);
  const itemsPerView = isMobile ? 1 : 3;

  const safeProducts = products || [];
  const itemWidth = 100 / itemsPerView;

  const extendedProducts = React.useMemo(() => {
    if (loading) {
      return Array(itemsPerView).fill(null);
    }

    if (safeProducts.length <= itemsPerView) {
      return safeProducts;
    }

    return [...safeProducts];
  }, [safeProducts, loading, itemsPerView]);

  const handleNext = () => {
    if (isAnimating || extendedProducts.length <= itemsPerView) return;
    setIsAnimating(true);
    setActiveIndex((prevIndex) => (prevIndex + 1) % extendedProducts.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handlePrevious = () => {
    if (isAnimating || extendedProducts.length <= itemsPerView) return;
    setIsAnimating(true);
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? extendedProducts.length - 1 : prevIndex - 1
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  React.useEffect(() => {
    if (extendedProducts.length <= itemsPerView) return;

    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [activeIndex, extendedProducts.length, itemsPerView]);

  const renderNavigationDots = () => {
    if (extendedProducts.length <= itemsPerView) return null;

    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 1,
          mt: 2,
          position: 'absolute',
          bottom: -30,
          left: 0,
          right: 0,
        }}
      >
        {Array.from({ length: extendedProducts.length }).map((_, index) => (
          <Box
            key={index}
            onClick={() => {
              if (isAnimating) return;
              setIsAnimating(true);
              setActiveIndex(index);
              setTimeout(() => setIsAnimating(false), 500);
            }}
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              bgcolor: activeIndex === index ? 'primary.main' : 'grey.300',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
              '&:hover': {
                bgcolor: 'primary.light',
              },
            }}
          />
        ))}
      </Box>
    );
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        px: isMobile ? 1 : 2,
        pb: isMobile ? 4 : 0,
      }}
    >
      <Box
        sx={{
          overflow: 'hidden',
          width: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            width: `${(extendedProducts.length * 100) / itemsPerView}%`,
            transform: `translateX(-${(activeIndex * 100) / extendedProducts.length}%)`,
            transition: isAnimating ? 'transform 0.5s ease-in-out' : 'none',
          }}
        >
          {extendedProducts.map((product, index) => (
            <Box
              key={`product-${product?.id || index}`}
              sx={{
                width: `${100 / extendedProducts.length}%`,
                px: 1,
                flexShrink: 0,
              }}
            >
              {loading ? <ProductCardSkeleton /> : product && <ProductCard product={product} />}
            </Box>
          ))}
        </Box>
      </Box>

      {!loading && extendedProducts.length > itemsPerView && (
        <>
          {!isMobile ? (
            <>
              <IconButton
                onClick={handlePrevious}
                disabled={isAnimating}
                sx={{
                  position: 'absolute',
                  left: 0,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  bgcolor: 'background.paper',
                  boxShadow: 1,
                  '&:hover': { bgcolor: 'background.paper' },
                  '&:disabled': { opacity: 0.5 },
                  zIndex: 1,
                  transition: 'opacity 0.4s ease-in-out',
                }}
              >
                <ChevronLeft />
              </IconButton>
              <IconButton
                onClick={handleNext}
                disabled={isAnimating}
                sx={{
                  position: 'absolute',
                  right: 0,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  bgcolor: 'background.paper',
                  boxShadow: 1,
                  '&:hover': { bgcolor: 'background.paper' },
                  '&:disabled': { opacity: 0.5 },
                  zIndex: 1,
                  transition: 'opacity 0.4s ease-in-out',
                }}
              >
                <ChevronRight />
              </IconButton>
            </>
          ) : (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: 1,
                mt: 2,
              }}
            >
              <IconButton
                onClick={handlePrevious}
                disabled={isAnimating}
                size="small"
                sx={{
                  bgcolor: 'background.paper',
                  boxShadow: 1,
                  '&:hover': { bgcolor: 'background.paper' },
                  '&:disabled': { opacity: 0.5 },
                  transition: 'opacity 0.4s ease-in-out',
                }}
              >
                <ChevronLeft />
              </IconButton>
              <IconButton
                onClick={handleNext}
                disabled={isAnimating}
                size="small"
                sx={{
                  bgcolor: 'background.paper',
                  boxShadow: 1,
                  '&:hover': { bgcolor: 'background.paper' },
                  '&:disabled': { opacity: 0.5 },
                  transition: 'opacity 0.4s ease-in-out',
                }}
              >
                <ChevronRight />
              </IconButton>
            </Box>
          )}
          {isMobile && renderNavigationDots()}
        </>
      )}
    </Box>
  );
};
