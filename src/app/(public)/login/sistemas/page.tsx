"use client";

import { SystemOption } from "@/types/types";
import SystemCard from "@/components/SystemCard";
import {
	Divider as MuiDivider,
	Button,
	Box as MuiBox,
} from "@mui/material";
import { useState } from "react"
import { ChooseSystemBox, Typography, SystemGrid } from "./style";
import SearchBar from "@/components/SearchBar";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation"
import sistemaExemploRaw from "@/assets/test.json";

const sistemaExemplo: SystemOption[] = JSON.parse(
	JSON.stringify(sistemaExemploRaw)
) as SystemOption[];

export default function Sistemas() {
	const router = useRouter();
	const [selectedSystem, setSelectedSystem] = useState<SystemOption | null>(null);


	const systems = sistemaExemplo;
	const handleSearch = (search: string) => {
		console.log(search);
	};


	const handleSelectSystem = (system: SystemOption) => {
		if (selectedSystem?.id === system.id) {
			setSelectedSystem(null);
			router.push("/login");
		} else {
			setSelectedSystem(system);
		}
		console.log(system);
	};



	return (
		<ChooseSystemBox>
			<Typography variant="h3" gutterBottom>
				Selecione o sistema para continuar
			</Typography>
			<SearchBar onSearch={handleSearch} />
			<MuiDivider sx={{ width: "100%", my: 2 }} orientation="horizontal" />
			<MuiBox sx={{
				overflowY: "auto",
				flex: 1,
				width: "100%",
				py: 1,
			}}>
				<SystemGrid columns={{ xs: 1, sm: 2, md: 3 }} columnSpacing={2} rowSpacing={2} container 
				sx={{ width: "100%" }}>
					{systems.map((system) => (
						<SystemCard key={system.id} system={system} onSelect={handleSelectSystem} selected={selectedSystem?.id === system.id} />
					))}
				</SystemGrid>
			</MuiBox>
			<Button variant="outlined" color="primary" onClick={() => { }} {...selectedSystem !== null ? {} : { disabled: true }}>
				{selectedSystem !== null ? "Continuar" : "Selecione um sistema"}
			</Button>
		</ChooseSystemBox>
	);
}