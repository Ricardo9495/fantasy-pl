
import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors'

// Create a theme instance.
const theme = createTheme({
    palette: {
        primary: {
            main: '#37003C',
            light: '#ff2882'
        },
        secondary: {
            main: '#fff',
        },
        error: {
            main: red.A400,
        },
        background: {
            default: '#fff',
        },
    },
});

export default theme;
