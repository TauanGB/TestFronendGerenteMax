"use client";

import * as React from "react";
import { Snackbar as MuiSnackbar, Alert as MuiAlert } from "@mui/material";

type AppSnackbarProps = {
  open: boolean;
  onClose: () => void;
  message: string;
  severity?: "success" | "info" | "warning" | "error";
  autoHideDuration?: number;
};

export default function AppSnackbar({
  open,
  onClose,
  message,
  severity = "error",
  autoHideDuration = 4000,
}: AppSnackbarProps) {
  return (
    <MuiSnackbar
      open={open}
      onClose={onClose}
      autoHideDuration={autoHideDuration}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <MuiAlert onClose={onClose} severity={severity} variant="filled" sx={{ width: "100%" }}>
        {message}
      </MuiAlert>
    </MuiSnackbar>
  );
}