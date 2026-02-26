import { Paper, FormControl, FormLabel, FormHelperText } from "@mui/material";

export default function Login() {
	return (
		<Paper>
			<h1>Login Page</h1>
			<FormControl>
				<FormLabel>Login</FormLabel>
				<FormHelperText>Adicione suas credenciais para acessar o sistema</FormHelperText>
				

			</FormControl>
		</Paper>
	);
}