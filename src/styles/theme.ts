import { createTheme } from '@mui/material'
import { blue, green } from '@mui/material/colors';

export const theme = createTheme({
	palette: {
		primary: {
			main: blue[700],
			dark: blue[800],
			light: blue[500],
			contrastText: '#000000',
		},
		secondary: {
			main: green[300],
			dark: green[500],
			light: green[100],
			contrastText: '#000000',
		},
		background: {		
			default: '#050208',
			paper: '#d2ddff',
		},
	},
});