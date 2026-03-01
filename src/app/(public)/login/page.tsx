"use client";
/**
 * Exigencia 6.0:
 * Tela de Login
 * "Exibir erros de validação inline" 
 */

import {
  FormControl as MuiFormControl,
  FormLabel as MuiFormLabel,
  TextField as MuiTextField,
  Box as MuiBox,
  FormControlLabel as MuiFormControlLabel,
  Checkbox as MuiCheckbox,
  CircularProgress as MuiCircularProgress,
} from "@mui/material";

import { Stack, Card, Typography, Button } from "./style";

import { z } from "zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import React from "react";

const loginSchema = z.object({
  email: z.string().min(1, "E-mail é obrigatório.").email("E-mail inválido."),
  password: z
    .string()
    .min(1, "Senha é obrigatória.")
    .min(6, "Senha deve ter no mínimo 6 caracteres."),
  remember: z.boolean().optional().default(false),
});

// Anotacoes de estudo, neste momento exato esta sendo declarado o tipo do formulario e suas regras de validacao
// para que o useForm possa inferir o tipo do formulario
// e assim evitar erros de tipo

type LoginFormData = z.input<typeof loginSchema>;

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const onSubmit: SubmitHandler<LoginFormData> = async (data: LoginFormData) => {
    try {
      console.log(data);
      console.log("Aqui e o onSubmit");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Stack>
      <Card variant="outlined">
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        <MuiBox
          component="form"
          onSubmit={handleSubmit(onSubmit)}
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
              error={!!errors.email}
              helperText={errors.email?.message}
              id="email"
              type="email"
              {...register("email")}
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
              error={!!errors.password}
              helperText={errors.password?.message}
              {...register("password")}
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
            control={<MuiCheckbox color="primary" />}
            label="Manter Acesso"
            {...register("remember")}
          />
          <Button type="submit" fullWidth variant="outlined" disabled={isSubmitting}>
            {isSubmitting ? <MuiCircularProgress size={20} color="primary" /> : "Logar"}
          </Button>
        </MuiBox>
      </Card>
    </Stack>
  );
}
