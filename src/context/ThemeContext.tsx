import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import { themes, ThemeName, saveTheme, getStoredTheme } from '../theme/colors';

interface ThemeContextType {
  currentTheme: ThemeName;
  setTheme: (theme: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeName>(getStoredTheme());

  const setTheme = (theme: ThemeName) => {
    setCurrentTheme(theme);
    saveTheme(theme);
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: themes[currentTheme].colors.primary.main,
        light: themes[currentTheme].colors.primary.light,
        dark: themes[currentTheme].colors.primary.dark,
        contrastText: themes[currentTheme].colors.primary.contrastText,
      },
      secondary: {
        main: themes[currentTheme].colors.secondary.main,
        light: themes[currentTheme].colors.secondary.light,
        dark: themes[currentTheme].colors.secondary.dark,
        contrastText: themes[currentTheme].colors.secondary.contrastText,
      },
      success: {
        main: themes[currentTheme].colors.success.main,
        light: themes[currentTheme].colors.success.light,
        dark: themes[currentTheme].colors.success.dark,
        contrastText: themes[currentTheme].colors.success.contrastText,
      },
      error: {
        main: themes[currentTheme].colors.error.main,
        light: themes[currentTheme].colors.error.light,
        dark: themes[currentTheme].colors.error.dark,
        contrastText: themes[currentTheme].colors.error.contrastText,
      },
      warning: {
        main: themes[currentTheme].colors.warning.main,
        light: themes[currentTheme].colors.warning.light,
        dark: themes[currentTheme].colors.warning.dark,
        contrastText: themes[currentTheme].colors.warning.contrastText,
      },
      info: {
        main: themes[currentTheme].colors.info.main,
        light: themes[currentTheme].colors.info.light,
        dark: themes[currentTheme].colors.info.dark,
        contrastText: themes[currentTheme].colors.info.contrastText,
      },
      background: {
        default: themes[currentTheme].colors.background.default,
        paper: themes[currentTheme].colors.background.paper,
      },
      text: {
        primary: themes[currentTheme].colors.text.primary,
        secondary: themes[currentTheme].colors.text.secondary,
        disabled: themes[currentTheme].colors.text.disabled,
      },
      action: {
        active: themes[currentTheme].colors.action.active,
        hover: themes[currentTheme].colors.action.hover,
        selected: themes[currentTheme].colors.action.selected,
        disabled: themes[currentTheme].colors.action.disabled,
        disabledBackground: themes[currentTheme].colors.action.disabledBackground,
        focus: themes[currentTheme].colors.action.focus,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: 8,
          },
          contained: {
            boxShadow: 'none',
            '&:hover': {
              boxShadow: 'none',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 12,
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          },
        },
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontSize: '2.5rem',
        fontWeight: 600,
      },
      h2: {
        fontSize: '2rem',
        fontWeight: 600,
      },
      h3: {
        fontSize: '1.75rem',
        fontWeight: 600,
      },
      h4: {
        fontSize: '1.5rem',
        fontWeight: 600,
      },
      h5: {
        fontSize: '1.25rem',
        fontWeight: 600,
      },
      h6: {
        fontSize: '1rem',
        fontWeight: 600,
      },
      body1: {
        fontSize: '1rem',
      },
      body2: {
        fontSize: '0.875rem',
      },
    },
  });

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme }}>
      <MuiThemeProvider theme={theme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 