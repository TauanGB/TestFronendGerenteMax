import { styled } from "@mui/material";
import { Card as MuiCard, Typography as MuiTypography, Stack as MuiStack } from "@mui/material";

export const Card = styled(MuiCard)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100%",
});
