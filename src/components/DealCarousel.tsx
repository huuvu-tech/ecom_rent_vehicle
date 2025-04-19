import React from 'react';
import { Box, IconButton, useTheme, useMediaQuery } from '@mui/material';
import { Deal } from '../types';
import { DealCard } from './DealCard';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

interface DealCarouselProps {
  deals: Deal[];
  loading: boolean;
}

export const DealCarousel: React.FC<DealCarouselProps> = ({ deals, loading }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isAnimating, setIsAnimating] = React.useState(false);
  const itemsPerView = isMobile ? 1 : 3;

  const safeDeals = deals || [];
  const itemWidth = 100 / itemsPerView;

  const extendedDeals = React.useMemo(() => {
    if (loading) {
      return Array(itemsPerView).fill(null);
    }

    if (safeDeals.length <= itemsPerView) {
      return safeDeals;
    }

    return [...safeDeals];
  }, [safeDeals, loading, itemsPerView]);

  const handleNext = () => {
    if (isAnimating || extendedDeals.length <= itemsPerView) return;
    setIsAnimating(true);
    setActiveIndex((prevIndex) => (prevIndex + 1) % extendedDeals.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handlePrevious = () => {
    if (isAnimating || extendedDeals.length <= itemsPerView) return;
    setIsAnimating(true);
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? extendedDeals.length - 1 : prevIndex - 1
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  React.useEffect(() => {
    if (extendedDeals.length <= itemsPerView) return;

    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [activeIndex, extendedDeals.length, itemsPerView]);

  const renderNavigationDots = () => {
    if (extendedDeals.length <= itemsPerView) return null;

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
        {Array.from({ length: extendedDeals.length }).map((_, index) => (
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
            width: `${(extendedDeals.length * 100) / itemsPerView}%`,
            transform: `translateX(-${(activeIndex * 100) / extendedDeals.length}%)`,
            transition: isAnimating ? 'transform 0.5s ease-in-out' : 'none',
          }}
        >
          {extendedDeals.map((deal, index) => (
            <Box
              key={`deal-${deal?.id || index}`}
              sx={{
                width: `${100 / extendedDeals.length}%`,
                px: 1,
                flexShrink: 0,
              }}
            >
              {loading ? <DealCard deal={deal} /> : deal && <DealCard deal={deal} />}
            </Box>
          ))}
        </Box>
      </Box>

      {!loading && extendedDeals.length > itemsPerView && (
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