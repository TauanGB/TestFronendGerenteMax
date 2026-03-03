"use client";

import { Card, CardContent, Typography } from "@mui/material";
import { SystemOption } from "@/types/types";

type SystemCardProps = {
  system: SystemOption;
  selected: boolean;
  onSelect: (system: SystemOption) => void;
  disabled?: boolean;
};

export default function SystemCard({ system, selected, onSelect, disabled = false }: SystemCardProps) {
  return (
    <Card
      sx={(theme) => ({
        width: "100%",
        height: "100%",
        flex: 1,
        minWidth: "250px",
        maxWidth: "350px",
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "all .2s ease",
        borderColor: selected ? theme.palette.primary.main : theme.palette.divider,
        backgroundColor: selected ? theme.palette.action.selected : theme.palette.background.paper,
        "&:hover": !disabled ? { transform: "translateY(-2px)", boxShadow: 3 } : undefined,
      })}
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