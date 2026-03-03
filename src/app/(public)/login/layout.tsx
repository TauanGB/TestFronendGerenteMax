'use client';

import { Box } from "./style";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<Box>
			{children}
		</Box>
	);
}