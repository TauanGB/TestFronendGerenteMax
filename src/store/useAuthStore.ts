/**
 * @file useAuthStore.ts
 * @description Store global de autenticação (Zustand) para acesso aos dados do usuário
 *
 * Gerencia o estado de autenticação do usuário:
 * - Se está logado (`signedIn`)
 * - Credenciais do usuário (`credentials`)
 * - Sistemas disponíveis (`systems`)
 * - Token de autenticação (`token`)
 *
 * @example
 * const { credentials, systems, token, setCredentials, setSystems, setToken, clearAuthFlow } = useAuthBase();
 */

"use client";

import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useAuthBase } from "./useAuthBase";

export function useAuthStore() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const token = useAuthBase((s) => s.token);
  const clearAuthFlow = useAuthBase((s) => s.clearAuthFlow);

  const signedIn = token !== null;

  const signOut = () => {
    clearAuthFlow();
    queryClient.clear();
    router.push("/login");
  };

  return { signedIn, signOut };
}