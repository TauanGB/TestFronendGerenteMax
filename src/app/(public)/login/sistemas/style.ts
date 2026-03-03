import { theme } from "@/styles/theme";
import { styled } from "@mui/material";
import { Card as MuiCard, Paper as MuiPaper, Typography as MuiTypography, Grid as MuiGrid } from "@mui/material";

export const Typography = styled(MuiTypography)({
  textAlign: "left",
  width: "100%",
  fontWeight: 600,
  variant: "h4",
});

export const Card = styled(MuiCard)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "350px",
  height: "100%",
});

export const ChooseSystemBox = styled(MuiPaper)({
  display: "flex",
  flexDirection: "column",
  padding: theme.spacing(2),
  gap: theme.spacing(2),
  alignItems: "center",
  width: "80dvw",
  height: "75dvh",
  backgroundColor: theme.palette.background.paper,
});

export const SystemGrid = styled(MuiGrid)({
  width: "100%",
  display: "flex",
  flexWrap: "wrap",
  alignItems: "stretch",
  padding: theme.spacing(2),
});