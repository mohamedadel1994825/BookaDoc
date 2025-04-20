import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2', // Bright blue for medical theme
            light: '#4791db',
            dark: '#115293',
        },
        secondary: {
            main: '#3f51b5', // Indigo as secondary color
        },
        error: {
            main: '#e53935', // Bright red for errors/cancellations
        },
        background: {
            default: '#f5f7fa', // Light gray blue background
            paper: '#ffffff',
        },
        text: {
            primary: '#2c3e50', // Dark blue gray for text
            secondary: '#546e7a', // Medium blue gray for secondary text
        },
    },
    typography: {
        fontFamily: 'Inter, system-ui, sans-serif',
        h1: {
            fontWeight: 700,
        },
        h2: {
            fontWeight: 600,
        },
        h3: {
            fontWeight: 600,
        },
        h4: {
            fontWeight: 600,
        },
        h5: {
            fontWeight: 600,
        },
        h6: {
            fontWeight: 600,
        },
        button: {
            fontWeight: 500,
            textTransform: 'none',
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
                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                },
            },
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    borderRadius: 12,
                },
            },
        },
    },
});

export default theme; 