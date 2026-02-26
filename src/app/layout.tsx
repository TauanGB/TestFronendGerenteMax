import { StyledEngineProvider } from "@mui/material/styles";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body>
        <StyledEngineProvider injectFirst>
          {children}
        </StyledEngineProvider>
      </body>
    </html>
  );
}