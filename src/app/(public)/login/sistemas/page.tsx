"use client";

import { SystemOption } from "@/types/types";
import SystemCard from "@/components/SystemCard";
import SearchBar from "@/components/SearchBar";
import {
	Grid as MuiGrid,
	Divider as MuiDivider,
} from "@mui/material";
import { useState } from "react"
import { ChooseSystemBox, Typography } from "./style";


const sistemaExemplo: SystemOption = JSON.parse(`{
	"id_Cliente": "edb6f614-d949-4781-b864-318af0db333c",
	"id_Cliente_Tipo_Menu": "08b2b6bd-33f0-4a5e-be77-64784f1b7c1c",
	"desc_Sistema": "7 Grãos",
	"connection_Key": "db-7graos-connectionString",
	"cliente": {
		"nome_Razao_Social": "7 GRAOS ATACADISTA DE CEREAIS LTDA",
		"apelido_Fantasia": "7 GRAOS",
		"cpF_CNPJ": "28779659000107",
		"Anexo": [],
		"id": "edb6f614-d949-4781-b864-318af0db333c",
		"id_Sequencia": 23,
		"iDi": 0,
		"desativadoSN": false,
		"data_Criacao": "2026-02-07T00:00:00-03:00",
		"id_Usuario_Criacao": "dac4ab20-0f71-47f8-8f42-0564fdcbdc89",
		"iP_Criacao": "127.0.0.1",
		"sincronizado_AppSN": true,
		"sincronizado_LocalSN": false
	},
	"id": "feea98ce-4539-41cd-a23e-3a64336f04e1",
	"id_Sequencia": 24,
	"iDi": 0,
	"desativadoSN": false,
	"data_Criacao": "2026-02-07T00:00:00-03:00",
	"id_Usuario_Criacao": "00000000-0000-0000-0000-000000000000",
	"iP_Criacao": "127.0.0.1",
	"sincronizado_AppSN": true,
	"sincronizado_LocalSN": true
}`);

const systems = [sistemaExemplo]; // nao es	quecer de remover e configurar para que venha somente os sistemas do banco de dados

export default function Sistemas() {
	const [selectedSystem, setSelectedSystem] = useState<SystemOption | null>(null);
	const handleSelectSystem = (system: SystemOption) => {
		if (selectedSystem?.id === system.id) {
			setSelectedSystem(null);
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
			<SearchBar />
			<MuiDivider sx={{ width: "100%", my: 2 }} orientation="horizontal" />
			<MuiGrid spacing={2} component="section">
				{systems.map((system) => (
					<SystemCard key={system.id} system={system} onSelect={handleSelectSystem} selected={selectedSystem?.id === system.id} />
				))}
			</MuiGrid>
		</ChooseSystemBox>
	);
}