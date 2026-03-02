"use client";

import { Card, CardContent, Typography} from "@mui/material";
import { SystemOption } from "@/types/types";

type SystemCardProps = {
  system: SystemOption;
  selected: boolean;
  onSelect: (system: SystemOption) => void;
  disabled?: boolean;
};

export default function SystemCard({ system, selected, onSelect, disabled = false }: SystemCardProps) {
  return (
      <Card variant={selected ? "selected" : "option"}
      sx={{ cursor: "pointer", transition: "all 0.3s ease-in-out" }}
      onClick={() => !disabled && onSelect(system)}
      >
        <CardContent>
          <Typography variant="h6">{system.desc_Sistema ?? "Sistema sem nome"}</Typography>
          <Typography variant="body2" color="text.secondary">
            {system.cliente?.nome_Razao_Social ?? "Cliente não informado"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {system.cliente?.cpF_CNPJ ?? "CPF/CNPJ não informado"}
          </Typography>
        </CardContent>
      </Card>
  );
}