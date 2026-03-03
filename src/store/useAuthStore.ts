/**
 * @file useAuthStore.ts
 * @description Store global de autenticação (Zustand)
 *
 * Gerencia o estado de autenticação do usuário:
 * - Se está logado (`signedIn`)
 * - Se está no passo de seleção de sistema (`isSystemsStep`)
 * - Se o auth foi inicializado (`authReady`)
 * - Versão da sessão para invalidar cache (`sessionVersion`)
 *
 * @example
 * const { signedIn, signOut } = useAuthStore();
 *
 * if (!signedIn) {
 *     router.push('/login');
 * }
 */

"use client";

import { AuthCredentials, SystemOption } from "@/types/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// ==========================================================================
// TIPOS
// ==========================================================================

interface AuthState {
  // === Sessão (memória) - usados só durante o fluxo login → sistemas → signIn
  credentials: AuthCredentials | null;
  systems: SystemOption[];

  // === Autenticado (persistido) - após signIn
  token: string | null;

  // === Ações
  setCredentials: (c: AuthCredentials | null) => void;
  setSystems: (s: SystemOption[]) => void;
  setToken: (t: string | null) => void;
  clearAuthFlow: () => void;   // limpa credentials + systems
  signOut: () => void;         // limpa tudo + token
}

// ==========================================================================
// STORE
// ==========================================================================

export const useAuthStore = create<AuthFlowStateInterface>()(
  persist(
    (set) => ({
      credentials: null,
      systems: [],

      setCredentials: (credentials) => set({ credentials }),
      setSystems: (systems) => set({ systems }),
      clearAuthFlow: () => set({ systems: [], credentials: null }),


    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ credentials: state.credentials, systems: state.systems }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);