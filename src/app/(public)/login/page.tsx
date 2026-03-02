"use client";
/**
 * Exigencia 6.0:
 * Tela de Login
 * "Exibir erros de validação inline"
 * Barra de progresso ao submeter o formulario
 */

import {
  FormControl as MuiFormControl,
  FormLabel as MuiFormLabel,
  TextField as MuiTextField,
  Box as MuiBox,
  FormControlLabel as MuiFormControlLabel,
  Checkbox as MuiCheckbox,
} from "@mui/material";

import { Stack, Card, Typography, Button, CircularProgress } from "./style";

import { z } from "zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authService } from "@/services/authService";
import { AuthCredentials } from "@/types/types";
import AppSnackbar from "@/components/systemCard";
import router from "next/router";
import { useState } from "react";

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
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("Não foi possível encontrar sistemas");

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
      const credentials: AuthCredentials = { email: data.email, senha: data.password };
      const response = await authService.discoverSystems(credentials);
      if (response.length > 0) {
        localStorage.setItem("systems", JSON.stringify(response));
        localStorage.setItem("credentials", JSON.stringify(data));
        router.push("/login/sistemas");
      }
      else {
        setShowSnackbar(true);
        setSnackbarMessage("Não foi possível encontrar sistemas");
      }
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
            {isSubmitting ? <CircularProgress size={25} /> : "Logar"}
          </Button>
        </MuiBox>
      </Card>
      <AppSnackbar
        open={showSnackbar}
        onClose={() => setShowSnackbar(false)}
        message={snackbarMessage}
      />
    </Stack>
  );
}
