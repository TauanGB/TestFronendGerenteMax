"use client";

import { Card, CardContent, Typography, Button } from "@mui/material";
import { SystemOption } from "@/types/types";

type SystemCardProps = {
  system: SystemOption;
  onSelect: (system: SystemOption) => void;
  loading?: boolean;
};

export function SystemCard({ system, onSelect, loading = false }: SystemCardProps) {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6">{system.desc_Sistema ?? "Sistema sem nome"}</Typography>
        <Typography variant="body2" color="text.secondary">
          {system.cliente?.apelido_Fantasia ?? "Cliente não informado"}
        </Typography>

        <Button
          sx={{ mt: 2 }}
          variant="contained"
          fullWidth
          disabled={loading}
          onClick={() => onSelect(system)}
        >
          Entrar
        </Button>
      </CardContent>
    </Card>
  );
}