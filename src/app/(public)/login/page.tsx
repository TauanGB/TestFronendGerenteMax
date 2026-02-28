"use client";

import {
  FormControl as MuiFormControl,
  FormLabel as MuiFormLabel,
  TextField as MuiTextField,
  Box as MuiBox,
  FormControlLabel as MuiFormControlLabel,
  Checkbox as MuiCheckbox,
} from "@mui/material";

import Image from "next/image";

import { Stack, Card, Typography, Button } from "./style";

import { Logo } from "@/assets/G-logo.png";

import React from "react";

export default function Login() {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (emailError || passwordError) {
      event.preventDefault();
      return;
    }
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  const validateInputs = () => {
    const email = document.getElementById("email") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    return isValid;
  };

  return (
    <Stack>
      <Card variant="outlined">
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        <MuiBox
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 2,
          }}
        >
          <MuiFormControl>
            <MuiFormLabel htmlFor="email">Email</MuiFormLabel>
            <MuiTextField
              error={emailError}
              helperText={emailErrorMessage}
              id="email"
              type="email"
              name="email"
              placeholder="seu@email.com"
              autoComplete="email"
              autoFocus
              required
              fullWidth
              variant="outlined"
            />
          </MuiFormControl>
          <MuiFormControl>
            <MuiFormLabel htmlFor="password">Password</MuiFormLabel>
            <MuiTextField
              error={passwordError}
              helperText={passwordErrorMessage}
              name="password"
              placeholder="•••••••••"
              type="password"
              id="password"
              autoComplete="current-password"
              autoFocus
              required
              fullWidth
              variant="outlined"
            />
          </MuiFormControl>
          <MuiFormControlLabel
            control={<MuiCheckbox value="remember" color="primary" />}
            label="Manter Acesso"
          />
          <Button type="submit" fullWidth variant="outlined">
            Logar
          </Button>
        </MuiBox>
      </Card>
    </Stack>
  );
}
