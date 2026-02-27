import { StyledEngineProvider } from "@mui/material/styles";
import ThemeRegistry from "@/providers/ThemeRegistry"; 
import "@/styles/globals.css";


export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="pt-br">
			<body>
				<StyledEngineProvider injectFirst>
					<ThemeRegistry>
						{children}
					</ThemeRegistry>
				</StyledEngineProvider>
			</body>
		</html>
	);
}