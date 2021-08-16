
import { createTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

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
