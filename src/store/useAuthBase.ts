/**
 * @file useAuthBase.ts
 * @description Store global de autenticação (Zustand)
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

import { AuthCredentials, SystemOption } from "@/types/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthBaseState {
  credentials: AuthCredentials | null;
  systems: SystemOption[];
  token: string | null;

  setCredentials: (c: AuthCredentials | null) => void;
  setSystems: (s: SystemOption[]) => void;
  setToken: (t: string | null) => void;
  clearAuthFlow: () => void;
}

export const useAuthBase = create<AuthBaseState>()(
  persist(
    (set) => ({
      credentials: null,
      systems: [],
      token: null,

      setCredentials: (c) => set({ credentials: c }),
      setSystems: (s) => set({ systems: s }),
      setToken: (t) => set({ token: t }),
      clearAuthFlow: () =>
        set({ credentials: null, systems: [], token: null }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ token: state.token }),
    }
  )
);