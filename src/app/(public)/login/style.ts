import { styled } from '@mui/material'
import { Stack as MuiStack,
	Card as MuiCard,
	Typography as MuiTypography,
	Button as MuiButton,

} from '@mui/material'

export const Button = styled(MuiButton)(({ theme }) => ({
	fontWeight: 600,
	color: theme.palette.primary.contrastText,
	textAlign: 'left',
}))

export const Typography = styled(MuiTypography)(({ theme }) => ({
	fontSize: '2.5rem',
	fontWeight: 600,
	color: theme.palette.primary.contrastText,
	textAlign: 'left',
	marginBottom: theme.spacing(2),
}))

export const Stack = styled(MuiStack)({
	height: '100vh',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	backgroundImage: 'radial-gradient(at 50% 50%, hsla(0, 0%, 0%, 0.00), hsla(225, 31%, 5%, 0.37))',
	padding: '1.5rem',
	fontFamily: 'Inter, sans-serif',
    fontWeight: 400,
    fontSize: '0.875rem',
    lineHeight: 1.5,
})

export const Card = styled(MuiCard)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	alignSelf: 'center',
	width: '100%',
	padding: theme.spacing(2),
	gap: theme.spacing(1.5),
	margin: 'auto',
	[theme.breakpoints.up('sm')]: {
		maxWidth: '350px',
	},
	boxShadow:
		'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
}))