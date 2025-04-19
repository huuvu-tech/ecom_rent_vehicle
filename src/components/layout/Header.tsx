// src/components/layout/Header.tsx
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Badge,
  InputBase,
  Box,
  Menu,
  MenuItem,
  useTheme as useMuiTheme,
  alpha,
  Fab,
  Zoom,
  Select,
  FormControl,
  Tooltip,
  ListItemIcon,
  ListItemText,
  TextField,
  Fade,
  Grow,
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  Divider
} from '@mui/material';
import { 
  ShoppingCart, 
  Person, 
  Search as SearchIcon,
  Menu as MenuIcon,
  Category,
  Home,
  LocalOffer,
  KeyboardArrowUp,
  Palette,
  WhatsApp,
  Message,
  Phone,
  Email,
  ContactSupport,
  Chat,
  Close,
  Send,
  Star
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../config/routes';
import { useTheme as useAppTheme } from '../../context/ThemeContext';
import { themes } from '../../theme/colors';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Product } from '../../types';

export const Header = () => {
  const muiTheme = useMuiTheme();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState<null | HTMLElement>(null);
  const [themeMenuAnchor, setThemeMenuAnchor] = useState<null | HTMLElement>(null);
  const [contactMenuAnchor, setContactMenuAnchor] = useState<null | HTMLElement>(null);
  const [showChat, setShowChat] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const { currentTheme, setTheme } = useAppTheme();
  const [isMenuHovered, setIsMenuHovered] = useState(false);
  const hideTimeoutRef = useRef<NodeJS.Timeout>();
  const searchRef = useRef<HTMLDivElement>(null);

  const { items: products } = useSelector((state: RootState) => state.products);

  // Get top rated products for recommendations
  const topRatedProducts = useMemo(() => {
    return [...products]
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 5);
  }, [products]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 100);
      setShowScrollTop(scrollPosition > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  const handleThemeMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setThemeMenuAnchor(event.currentTarget);
  };

  const handleThemeMenuClose = () => {
    setThemeMenuAnchor(null);
  };

  const handleContactMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setContactMenuAnchor(event.currentTarget);
  };

  const handleContactMenuClose = () => {
    setContactMenuAnchor(null);
  };

  const handleContactMenuHover = (event: React.MouseEvent<HTMLElement>) => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }
    setContactMenuAnchor(event.currentTarget);
    setIsMenuHovered(true);
  };

  const handleContactMenuLeave = () => {
    hideTimeoutRef.current = setTimeout(() => {
      if (!isMenuHovered) {
        setContactMenuAnchor(null);
      }
    }, 200); // 200ms delay before hiding
  };

  const handleMenuHover = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }
    setIsMenuHovered(true);
  };

  const handleMenuLeave = () => {
    setIsMenuHovered(false);
    hideTimeoutRef.current = setTimeout(() => {
      setContactMenuAnchor(null);
    }, 200);
  };

  const handleContactOption = (type: string) => {
    switch (type) {
      case 'whatsapp':
        window.open('https://wa.me/your_phone_number', '_blank');
        break;
      case 'messenger':
        window.open('https://m.me/your_page', '_blank');
        break;
      case 'phone':
        window.location.href = 'tel:+your_phone_number';
        break;
      case 'email':
        window.location.href = 'mailto:your_email@example.com';
        break;
      case 'chat':
        setShowChat(true);
        setContactMenuAnchor(null);
        break;
      default:
        break;
    }
  };

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearchResults(false);
    }
  };

  const handleSearchFocus = () => {
    setShowSearchResults(true);
  };

  const handleSearchBlur = (event: React.FocusEvent) => {
    // Check if the focus is moving to a child element
    if (searchRef.current && !searchRef.current.contains(event.relatedTarget as Node)) {
      setShowSearchResults(false);
    }
  };

  return (
    <>
      <AppBar 
        position="fixed" 
        sx={{ 
          background: muiTheme.palette.primary.main,
          boxShadow: muiTheme.shadows[2],
          width: '100%',
          left: 0,
          right: 0,
          transition: 'all 0.3s ease-in-out',
          height: isScrolled ? '40px' : '64px',
          '&:hover': {
            height: '64px',
            '& .MuiToolbar-root': {
              padding: '8px 0',
            },
            '& .header-content': {
              opacity: 1,
              visibility: 'visible',
            },
            '& .header-logo': {
              fontSize: '1.5rem',
            },
            '& .header-button': {
              fontSize: '1rem',
            }
          }
        }}
      >
        <Box sx={{ 
          maxWidth: '1200px',
          width: '100%',
          margin: '0 auto',
          padding: '0 16px',
          height: '100%'
        }}>
          <Toolbar sx={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: isScrolled ? '0' : '8px 0',
            width: '100%',
            height: '100%',
            minHeight: 'auto !important',
            transition: 'padding 0.3s ease-in-out'
          }}>
            {/* Logo and Brand */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography
                variant="h6"
                component={Link}
                to={ROUTES.HOME}
                className="header-logo"
                sx={{
                  textDecoration: 'none',
                  color: muiTheme.palette.primary.contrastText,
                  fontWeight: 'bold',
                  fontSize: isScrolled ? '1rem' : '1.5rem',
                  letterSpacing: '1px',
                  transition: 'font-size 0.3s ease-in-out',
                  '&:hover': {
                    color: muiTheme.palette.primary.light
                  }
                }}
              >
                VUONG
              </Typography>
            </Box>

            {/* Search Bar with Recommendations */}
            <Box
              component="form"
              onSubmit={handleSearch}
              className="header-content"
              ref={searchRef}
              sx={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                borderRadius: muiTheme.shape.borderRadius,
                width: '40%',
                maxWidth: '500px',
                transition: 'all 0.3s ease-in-out',
                opacity: isScrolled ? 0 : 1,
                visibility: isScrolled ? 'hidden' : 'visible',
                position: 'relative',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.3)',
                },
              }}
            >
              <IconButton type="submit" sx={{ p: '10px', color: muiTheme.palette.primary.contrastText }}>
                <SearchIcon />
              </IconButton>
              <InputBase
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
                sx={{
                  color: muiTheme.palette.primary.contrastText,
                  width: '100%',
                  '& input::placeholder': {
                    color: 'rgba(255, 255, 255, 0.7)',
                  },
                }}
              />
              
              {/* Search Recommendations */}
              <Fade in={showSearchResults}>
                <Paper
                  sx={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    mt: 1,
                    maxHeight: '400px',
                    overflow: 'auto',
                    zIndex: 1000,
                    backgroundColor: muiTheme.palette.background.paper,
                    boxShadow: muiTheme.shadows[4],
                  }}
                >
                  <List>
                    <ListItem>
                      <Typography variant="subtitle1" fontWeight="bold">
                        Top Rated Products
                      </Typography>
                    </ListItem>
                    <Divider />
                    {topRatedProducts.map((product) => (
                      <ListItemButton
                        key={product.id}
                        component={Link}
                        to={`/product/${product.id}`}
                        onClick={() => {
                          setShowSearchResults(false);
                          setSearchQuery('');
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar
                            src={product.images?.[0]}
                            alt={product.name}
                            variant="rounded"
                            sx={{ width: 56, height: 56, mr: 2 }}
                          />
                        </ListItemAvatar>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="subtitle1" noWrap>
                            {product.name}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Star sx={{ color: muiTheme.palette.warning.main, fontSize: '1rem' }} />
                            <Typography variant="body2" color="text.secondary">
                              {product.rating?.toFixed(1)} ({product.reviews || 0} reviews)
                            </Typography>
                          </Box>
                          <Typography variant="body2" color="primary" fontWeight="bold">
                            ${product.price}
                          </Typography>
                        </Box>
                      </ListItemButton>
                    ))}
                  </List>
                </Paper>
              </Fade>
            </Box>

            {/* Navigation and Actions */}
            <Box 
              className="header-content"
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 2,
                opacity: isScrolled ? 0 : 1,
                visibility: isScrolled ? 'hidden' : 'visible',
                transition: 'all 0.3s ease-in-out'
              }}
            >
              {/* Mobile Menu Button */}
              <IconButton
                color="inherit"
                onClick={handleMenuOpen}
                sx={{ display: { xs: 'flex', md: 'none' } }}
              >
                <MenuIcon />
              </IconButton>

              {/* Desktop Navigation */}
              <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
                <Button
                  color="inherit"
                  component={Link}
                  to={ROUTES.HOME}
                  startIcon={<Home />}
                  className="header-button"
                  sx={{ 
                    fontSize: isScrolled ? '0.8rem' : '1rem',
                    transition: 'font-size 0.3s ease-in-out',
                    color: muiTheme.palette.primary.contrastText,
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    }
                  }}
                >
                  Home
                </Button>
                <Button
                  color="inherit"
                  component={Link}
                  to={ROUTES.PRODUCTS}
                  startIcon={<Category />}
                  className="header-button"
                  sx={{ 
                    fontSize: isScrolled ? '0.8rem' : '1rem',
                    transition: 'font-size 0.3s ease-in-out',
                    color: muiTheme.palette.primary.contrastText,
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    }
                  }}
                >
                  Products
                </Button>
                <Button
                  color="inherit"
                  component={Link}
                  to="/deals"
                  startIcon={<LocalOffer />}
                  className="header-button"
                  sx={{ 
                    fontSize: isScrolled ? '0.8rem' : '1rem',
                    transition: 'font-size 0.3s ease-in-out',
                    color: muiTheme.palette.primary.contrastText,
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    }
                  }}
                >
                  Deals
                </Button>

                {/* Theme Selector */}
                <Tooltip title="Chọn giao diện">
                  <IconButton
                    color="inherit"
                    onClick={handleThemeMenuOpen}
                    sx={{ 
                      color: muiTheme.palette.primary.contrastText,
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      }
                    }}
                  >
                    <Palette />
                  </IconButton>
                </Tooltip>

                {/* Theme Menu */}
                <Menu
                  anchorEl={themeMenuAnchor}
                  open={Boolean(themeMenuAnchor)}
                  onClose={handleThemeMenuClose}
                  PaperProps={{
                    sx: {
                      backgroundColor: muiTheme.palette.background.paper,
                      minWidth: '200px',
                    }
                  }}
                >
                  {Object.keys(themes).map((theme) => (
                    <MenuItem 
                      key={theme} 
                      value={theme}
                      selected={currentTheme === theme}
                      onClick={() => {
                        setTheme(theme as keyof typeof themes);
                        handleThemeMenuClose();
                      }}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        '&.Mui-selected': {
                          backgroundColor: muiTheme.palette.primary.main,
                          color: muiTheme.palette.primary.contrastText,
                          '&:hover': {
                            backgroundColor: muiTheme.palette.primary.dark,
                          }
                        }
                      }}
                    >
                      <Box
                        sx={{
                          width: 20,
                          height: 20,
                          borderRadius: '50%',
                          backgroundColor: themes[theme as keyof typeof themes].colors.primary.main,
                          border: '1px solid',
                          borderColor: muiTheme.palette.divider
                        }}
                      />
                      {theme.charAt(0).toUpperCase() + theme.slice(1)}
                    </MenuItem>
                  ))}
                </Menu>
              </Box>

              {/* Cart and User Icons */}
              <IconButton 
                color="inherit" 
                component={Link} 
                to={ROUTES.CART}
                sx={{
                  color: muiTheme.palette.primary.contrastText,
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  }
                }}
              >
                <Badge badgeContent={0} color="error">
                  <ShoppingCart />
                </Badge>
              </IconButton>
              
              <Button 
                color="inherit" 
                component={Link} 
                to={ROUTES.LOGIN}
                startIcon={<Person />}
                className="header-button"
                sx={{ 
                  fontSize: isScrolled ? '0.8rem' : '1rem',
                  transition: 'font-size 0.3s ease-in-out',
                  color: muiTheme.palette.primary.contrastText,
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  }
                }}
              >
                Login
              </Button>
            </Box>
          </Toolbar>
        </Box>
      </AppBar>

      {/* Contact Menu */}
      <Box
        onMouseEnter={handleMenuHover}
        onMouseLeave={handleMenuLeave}
        sx={{
          position: 'fixed',
          bottom: 100,
          right: 24,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          zIndex: 1000,
          pointerEvents: Boolean(contactMenuAnchor) ? 'auto' : 'none',
        }}
      >
        <Fade in={Boolean(contactMenuAnchor)} timeout={300}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              p: 1,
              backgroundColor: muiTheme.palette.background.paper,
              borderRadius: 2,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              opacity: Boolean(contactMenuAnchor) ? 1 : 0,
              pointerEvents: Boolean(contactMenuAnchor) ? 'auto' : 'none',
            }}
          >
            {/* Close Button for Mobile */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
              <IconButton
                size="small"
                onClick={() => setContactMenuAnchor(null)}
                sx={{
                  display: { xs: 'flex', md: 'none' },
                  color: muiTheme.palette.text.secondary,
                  '&:hover': {
                    color: muiTheme.palette.text.primary,
                  }
                }}
              >
                <Close fontSize="small" />
              </IconButton>
            </Box>

            <Grow in={Boolean(contactMenuAnchor)} timeout={300} style={{ transformOrigin: 'bottom right' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'space-between' }}>
                <Typography variant="body2" sx={{ color: muiTheme.palette.text.primary }}>
                  Live Chat
                </Typography>
                <IconButton
                  onClick={() => handleContactOption('chat')}
                  sx={{
                    backgroundColor: muiTheme.palette.primary.main,
                    color: muiTheme.palette.primary.contrastText,
                    '&:hover': {
                      backgroundColor: muiTheme.palette.primary.dark,
                      transform: 'scale(1.1)',
                    },
                    transition: 'all 0.2s ease-in-out',
                  }}
                >
                  <Chat />
                </IconButton>
              </Box>
            </Grow>
            <Grow in={Boolean(contactMenuAnchor)} timeout={400} style={{ transformOrigin: 'bottom right' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'space-between' }}>
                <Typography variant="body2" sx={{ color: muiTheme.palette.text.primary }}>
                  WhatsApp
                </Typography>
                <IconButton
                  onClick={() => handleContactOption('whatsapp')}
                  sx={{
                    backgroundColor: '#25D366',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: '#128C7E',
                      transform: 'scale(1.1)',
                    },
                    transition: 'all 0.2s ease-in-out',
                  }}
                >
                  <WhatsApp />
                </IconButton>
              </Box>
            </Grow>
            <Grow in={Boolean(contactMenuAnchor)} timeout={500} style={{ transformOrigin: 'bottom right' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'space-between' }}>
                <Typography variant="body2" sx={{ color: muiTheme.palette.text.primary }}>
                  Messenger
                </Typography>
                <IconButton
                  onClick={() => handleContactOption('messenger')}
                  sx={{
                    backgroundColor: '#0084FF',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: '#0066CC',
                      transform: 'scale(1.1)',
                    },
                    transition: 'all 0.2s ease-in-out',
                  }}
                >
                  <Message />
                </IconButton>
              </Box>
            </Grow>
            <Grow in={Boolean(contactMenuAnchor)} timeout={600} style={{ transformOrigin: 'bottom right' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'space-between' }}>
                <Typography variant="body2" sx={{ color: muiTheme.palette.text.primary }}>
                  Phone Call
                </Typography>
                <IconButton
                  onClick={() => handleContactOption('phone')}
                  sx={{
                    backgroundColor: muiTheme.palette.success.main,
                    color: muiTheme.palette.success.contrastText,
                    '&:hover': {
                      backgroundColor: muiTheme.palette.success.dark,
                      transform: 'scale(1.1)',
                    },
                    transition: 'all 0.2s ease-in-out',
                  }}
                >
                  <Phone />
                </IconButton>
              </Box>
            </Grow>
            <Grow in={Boolean(contactMenuAnchor)} timeout={700} style={{ transformOrigin: 'bottom right' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'space-between' }}>
                <Typography variant="body2" sx={{ color: muiTheme.palette.text.primary }}>
                  Email
                </Typography>
                <IconButton
                  onClick={() => handleContactOption('email')}
                  sx={{
                    backgroundColor: muiTheme.palette.error.main,
                    color: muiTheme.palette.error.contrastText,
                    '&:hover': {
                      backgroundColor: muiTheme.palette.error.dark,
                      transform: 'scale(1.1)',
                    },
                    transition: 'all 0.2s ease-in-out',
                  }}
                >
                  <Email />
                </IconButton>
              </Box>
            </Grow>
          </Box>
        </Fade>
      </Box>

      {/* Contact Us Button - Always Visible */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 1000,
        }}
      >
        <Tooltip title="Contact Us">
          <Fab
            color="primary"
            size="small"
            onClick={() => setContactMenuAnchor(contactMenuAnchor ? null : document.body)}
            onMouseEnter={handleContactMenuHover}
            onMouseLeave={handleContactMenuLeave}
            sx={{
              backgroundColor: muiTheme.palette.primary.main,
              '&:hover': {
                backgroundColor: muiTheme.palette.primary.dark,
              },
            }}
          >
            <ContactSupport />
          </Fab>
        </Tooltip>
      </Box>

      {/* Scroll to Top Button - Only visible when scrolling */}
      <Zoom in={showScrollTop}>
        <Box
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 80, // Moved to the left to make space for contact button
            zIndex: 1000,
          }}
        >
          <Tooltip title="Scroll to top">
            <Fab
              color="primary"
              size="small"
              onClick={scrollToTop}
              sx={{
                backgroundColor: muiTheme.palette.primary.main,
                '&:hover': {
                  backgroundColor: muiTheme.palette.primary.dark,
                },
              }}
            >
              <KeyboardArrowUp />
            </Fab>
          </Tooltip>
        </Box>
      </Zoom>

      {/* Mobile Menu */}
      <Menu
        anchorEl={mobileMenuAnchor}
        open={Boolean(mobileMenuAnchor)}
        onClose={handleMenuClose}
        sx={{ display: { xs: 'block', md: 'none' } }}
      >
        <MenuItem component={Link} to={ROUTES.HOME} onClick={handleMenuClose}>
          <Home sx={{ mr: 1 }} /> Home
        </MenuItem>
        <MenuItem component={Link} to={ROUTES.PRODUCTS} onClick={handleMenuClose}>
          <Category sx={{ mr: 1 }} /> Products
        </MenuItem>
        <MenuItem component={Link} to="/deals" onClick={handleMenuClose}>
          <LocalOffer sx={{ mr: 1 }} /> Deals
        </MenuItem>
      </Menu>

      {/* Chat Widget */}
      {showChat && (
        <Box
          sx={{
            position: 'fixed',
            bottom: 100,
            right: 24,
            width: 300,
            height: 400,
            backgroundColor: muiTheme.palette.background.paper,
            borderRadius: 2,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 1000,
          }}
        >
          <Box
            sx={{
              p: 2,
              borderBottom: `1px solid ${muiTheme.palette.divider}`,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant="subtitle1" fontWeight="bold">
              Live Chat
            </Typography>
            <IconButton size="small" onClick={() => setShowChat(false)}>
              <Close fontSize="small" />
            </IconButton>
          </Box>
          <Box
            sx={{
              flex: 1,
              p: 2,
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
            }}
          >
            {/* Chat messages will go here */}
          </Box>
          <Box
            sx={{
              p: 2,
              borderTop: `1px solid ${muiTheme.palette.divider}`,
            }}
          >
            <TextField
              fullWidth
              size="small"
              placeholder="Type your message..."
              InputProps={{
                endAdornment: (
                  <IconButton size="small">
                    <Send />
                  </IconButton>
                ),
              }}
            />
          </Box>
        </Box>
      )}
    </>
  );
};