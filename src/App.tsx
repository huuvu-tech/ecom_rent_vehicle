// src/App.tsx
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Home } from './pages/Home';
import Login from './pages/Login';
import Cart from './pages/Cart';
import { store } from './store';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import { ProductDetail } from './pages/ProductDetail';
import { ROUTES } from './config/routes';

function App() {
  return (
    <Provider store={store}>
      <HelmetProvider>
        <ThemeProvider>
          <CssBaseline />
          <BrowserRouter>
            <AuthProvider>
              <CartProvider>
                <Header />
                <Routes>
                  <Route path={ROUTES.HOME} element={<Home />} />
                  <Route path={ROUTES.LOGIN} element={<Login />} />
                  <Route path={ROUTES.CART} element={<Cart />} />
                  <Route path={ROUTES.PRODUCT_DETAIL} element={<ProductDetail />} />
                </Routes>
              </CartProvider>
            </AuthProvider>
          </BrowserRouter>
        </ThemeProvider>
      </HelmetProvider>
    </Provider>
  );
}

export default App;