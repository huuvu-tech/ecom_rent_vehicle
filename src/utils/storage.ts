const ACCESS_TOKEN_KEY = 'access_token';
const ID_TOKEN_KEY = 'id_token';
const CART_STORAGE_KEY = 'cart_items';

interface CartItem {
  product: any; // We'll update this with proper type later
  quantity: number;
  rentalDays?: number;
}

export const storage = {
  setAccessToken: (token: string) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  },

  getAccessToken: (): string | null => {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  },

  removeAccessToken: () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  },

  setIdToken: (token: string) => {
    localStorage.setItem(ID_TOKEN_KEY, token);
  },

  getIdToken: (): string | null => {
    return localStorage.getItem(ID_TOKEN_KEY);
  },

  removeIdToken: () => {
    localStorage.removeItem(ID_TOKEN_KEY);
  },

  clearTokens: () => {
    storage.removeAccessToken();
    storage.removeIdToken();
  },

  setCart: (items: CartItem[]) => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  },

  getCart: (): CartItem[] => {
    const cart = localStorage.getItem(CART_STORAGE_KEY);
    return cart ? JSON.parse(cart) : [];
  },

  clearCart: () => {
    localStorage.removeItem(CART_STORAGE_KEY);
  },
}; 