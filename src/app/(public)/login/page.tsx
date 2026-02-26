import { Paper, FormControl, FormLabel, FormHelperText } from "@mui/material";
import { defaultConfig } from "next/dist/server/config-shared";

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