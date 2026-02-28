import { createTheme } from '@mui/material'
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import CheckBoxOutlineBlankRoundedIcon from '@mui/icons-material/CheckBoxOutlineBlankRounded';
// note: avoid importing toggleButtonGroupClasses - it can trigger HMR issues

import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import { alpha } from '@mui/material/styles';
import { gray, brand } from '@/styles/colors';

export const theme = createTheme({
	palette: {
		primary: {
			main: '#9c99bc',
			contrastText: '#000000',
		},
		secondary: {
			main: '#00ffd4',
			contrastText: '#000000',
		},
		background: {
			default: '#00569D',
			paper: '#FFFFFF',
		},
	},
	components: {
		MuiButtonBase: {
			defaultProps: {
				disableTouchRipple: true,
				disableRipple: true,
			},
			styleOverrides: {
				root: ({ theme }) => ({
					boxSizing: 'border-box',
					transition: 'all 100ms ease-in',
					'&:focus-visible': {
						outline: `3px solid ${alpha(theme.palette.primary.main, 0.5)}`,
						outlineOffset: '2px',
					},
				}),
			},
		},
		MuiButton: {
			styleOverrides: {
				root: ({ theme }) => ({
					boxShadow: 'none',
					borderRadius: (theme.vars || theme).shape.borderRadius,
					textTransform: 'none',
					variants: [
						{
							props: {
								size: 'small',
							},
							style: {
								height: '2.25rem',
								padding: '8px 12px',
							},
						},
						{
							props: {
								size: 'medium',
							},
							style: {
								height: '2.5rem', // 40px
							},
						},
						{
							props: {
								color: 'primary',
								variant: 'contained',
							},
							style: {
								color: 'white',
								backgroundColor: gray[900],
								backgroundImage: `linear-gradient(to bottom, ${gray[700]}, ${gray[800]})`,
								boxShadow: `inset 0 1px 0 ${gray[600]}, inset 0 -1px 0 1px hsl(220, 0%, 0%)`,
								border: `1px solid ${gray[700]}`,
								'&:hover': {
									backgroundImage: 'none',
									backgroundColor: gray[700],
									boxShadow: 'none',
								},
								'&:active': {
									backgroundColor: gray[800],
								},
							},
						},
						{
							props: {
								variant: 'outlined',
							},
							style: {
								color: (theme.vars || theme).palette.text.primary,
								border: '1px solid',
								borderColor: gray[200],
								backgroundColor: alpha(gray[50], 0.3),
								'&:hover': {
									backgroundColor: gray[100],
									borderColor: gray[300],
								},
								'&:active': {
									backgroundColor: gray[200],
								},
							},
						},
						{
							props: {
								color: 'secondary',
								variant: 'outlined',
							},
							style: {
								color: brand[700],
								border: '1px solid',
								borderColor: brand[200],
								backgroundColor: brand[50],
								'&:hover': {
									backgroundColor: brand[100],
									borderColor: brand[400],
								},
								'&:active': {
									backgroundColor: alpha(brand[200], 0.7),
								},
							},
						},
						{
							props: {
								variant: 'text',
							},
							style: {
								color: gray[600],
								'&:hover': {
									backgroundColor: gray[100],
								},
								'&:active': {
									backgroundColor: gray[200],
								},
							},
						},
						{
							props: {
								color: 'secondary',
								variant: 'text',
							},
							style: {
								color: brand[700],
								'&:hover': {
									backgroundColor: alpha(brand[100], 0.5),
								},
								'&:active': {
									backgroundColor: alpha(brand[200], 0.7),
								},
							},
						},
					],
				}),
			},
		},

		MuiToggleButton: {
			styleOverrides: {
				root: ({
					padding: '12px 16px',
					textTransform: 'none',
					borderRadius: '10px',
					fontWeight: 500,
				}),
			},
		},
		MuiCheckbox: {
			defaultProps: {
				disableRipple: true,
				icon:
					<CheckBoxOutlineBlankRoundedIcon sx={{ color: 'hsla(210, 0%, 0%, 0.0)' }} />,
				checkedIcon: <CheckRoundedIcon sx={{ height: 14, width: 14 }} />,
				indeterminateIcon: <RemoveRoundedIcon sx={{ height: 14, width: 14 }} />,
			},
			styleOverrides: {
				root: ({
					margin: 10,
					height: 16,
					width: 16,
					borderRadius: 5,
					border: '1px solid ',
					borderColor: alpha(gray[300], 0.8),
					boxShadow: '0 0 0 1.5px hsla(210, 0%, 0%, 0.04) inset',
					backgroundColor: alpha(gray[100], 0.4),
					transition: 'border-color, background-color, 120ms ease-in',
					'&:hover': {
						borderColor: brand[300],
					},
					'&.Mui-focusVisible': {
						outline: `3px solid ${alpha(brand[500], 0.5)}`,
						outlineOffset: '2px',
						borderColor: brand[400],
					},
					'&.Mui-checked': {
						color: 'white',
						backgroundColor: brand[500],
						borderColor: brand[500],
						boxShadow: `none`,
						'&:hover': {
							backgroundColor: brand[600],
						},
					},
				}),
			},
		},
		MuiOutlinedInput: {
			styleOverrides: {
				input: {
					padding: 0,
				},
				root: ({ theme }) => ({
					padding: '8px 12px',
					color: (theme.vars || theme).palette.text.primary,
					borderRadius: (theme.vars || theme).shape.borderRadius,
					border: `1px solid ${(theme.vars || theme).palette.divider}`,
					backgroundColor: (theme.vars || theme).palette.background.paper,
					transition: 'border 120ms ease-in',
					'&:hover': {
						borderColor: 'hsl(220, 20%, 42%)',
					},
					[`&.${outlinedInputClasses.focused}`]: {
						outline: `3px solid ${alpha('hsl(210, 98%, 42%)', 0.5)}`,
						borderColor: 'hsl(210, 98%, 42%)',
					},
				}),
				notchedOutline: {
					border: 'none',
				},
			},

		}
	}
});


