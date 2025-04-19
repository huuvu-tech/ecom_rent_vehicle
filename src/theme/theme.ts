import { createTheme } from '@mui/material/styles';
import { themes, getStoredTheme } from './colors';

const currentTheme = themes[getStoredTheme()].colors;

export const theme = createTheme({
  palette: {
    primary: {
      main: currentTheme.primary.main,
      light: currentTheme.primary.light,
      dark: currentTheme.primary.dark,
      contrastText: currentTheme.primary.contrastText,
    },
    secondary: {
      main: currentTheme.secondary.main,
      light: currentTheme.secondary.light,
      dark: currentTheme.secondary.dark,
      contrastText: currentTheme.secondary.contrastText,
    },
    success: {
      main: currentTheme.success.main,
      light: currentTheme.success.light,
      dark: currentTheme.success.dark,
      contrastText: currentTheme.success.contrastText,
    },
    error: {
      main: currentTheme.error.main,
      light: currentTheme.error.light,
      dark: currentTheme.error.dark,
      contrastText: currentTheme.error.contrastText,
    },
    warning: {
      main: currentTheme.warning.main,
      light: currentTheme.warning.light,
      dark: currentTheme.warning.dark,
      contrastText: currentTheme.warning.contrastText,
    },
    info: {
      main: currentTheme.info.main,
      light: currentTheme.info.light,
      dark: currentTheme.info.dark,
      contrastText: currentTheme.info.contrastText,
    },
    background: {
      default: currentTheme.background.default,
      paper: currentTheme.background.paper,
    },
    text: {
      primary: currentTheme.text.primary,
      secondary: currentTheme.text.secondary,
      disabled: currentTheme.text.disabled,
    },
    action: {
      active: currentTheme.action.active,
      hover: currentTheme.action.hover,
      selected: currentTheme.action.selected,
      disabled: currentTheme.action.disabled,
      disabledBackground: currentTheme.action.disabledBackground,
      focus: currentTheme.action.focus,
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
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'white',
            color: 'rgba(51, 51, 51, 0.9)',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
            '&:hover': {
              boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
            },
            '&.Mui-focused': {
              boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
            },
            '& input': {
              fontWeight: 600,
              color: 'rgba(51, 51, 51, 0.9)',
              '&::placeholder': {
                color: 'rgba(51, 51, 51, 0.5)',
              },
            },
          },
          '& .MuiInputLabel-root': {
            color: 'rgba(51, 51, 51, 0.7)',
            '&.Mui-focused': {
              color: 'primary.main',
            },
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(0, 0, 0, 0.23)',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'primary.main',
          },
          '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'primary.main',
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
          borderBottomLeftRadius: 12,
          borderBottomRightRadius: 12,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
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