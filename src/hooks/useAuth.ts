/**
 * @file useAuth.ts
 * @description Hook principal de autenticação
 *
 * Encapsula toda a lógica de autenticação do sistema:
 * - Descoberta de sistemas disponíveis para um email/senha
 * - Login em sistema específico
 * - Gerenciamento de "Manter conectado"
 * - Fetch e atualização de dados do usuário logado
 *
 * @example
 * function LoginPage() {
 *     const { discoverSystems, discoverSystemsLoading } = useAuth();
 *
 *     const handleSubmit = async (data) => {
 *         await discoverSystems({ email: data.email, senha: data.senha });
 *         // Redireciona automaticamente para /login/sistemas
 *     };
 * }
 */

import { useMutation, useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import { useRouter } from "next/navigation";

import { useAuthStore } from "@/store/useAuthStore";
import { AuthCredentials, SignInPayload } from "@/types/types";
import { authService } from "@/services/authService";

// ============================================================================
// TIPOS
// ============================================================================

export function useAuth(): UseAuthReturn {
    const {
        signedIn,
        setSignedIn,
        setIsSystemsStep,
        sessionVersion,
        bumpSessionVersion,
    } = useAuthStore();

    const { setCredentials, setSystems } = useAuthFlowStore();
    const { rememberMe, saveCredentials, clearCredentials } =
        useRememberMeStore();
    const showFeedback = useFeedbackDialogStore((state) => state.showFeedback);
    const router = useRouter();
    const { setUser } = useUserLogadoInfo();

    // ========================================================================
    // MUTATIONS
    // ========================================================================

    /**
     * Mutation: Descobrir sistemas disponíveis
     *
     * Valida credenciais e retorna lista de sistemas que o usuário pode acessar.
     * Em caso de sucesso, redireciona para página de seleção de sistema.
     */
    const discoverSystemsMutation = useMutation({
        mutationFn: async (credentials: AuthCredentials) =>
            AuthService.discoverSystems(credentials),

        onSuccess: ({ data }, variables) => {
            setCredentials(variables);
            setSystems(data);
            setIsSystemsStep(true);
            router.push("/login/sistemas");
        },

        onError: (err: Error) => {
            console.error("Erro ao buscar sistemas do usuário:", err);
            showFeedback({
                type: "error",
                message: "Não foi possível listar os sistemas do usuário.",
            });
        },

        meta: {
            errorMessage: "Erro ao listar sistemas do usuário.",
        },
    });

    /**
     * Mutation: Login em sistema específico
     *
     * Autentica o usuário no sistema selecionado.
     * Gerencia persistência de credenciais conforme configuração "Manter conectado".
     */
    const signInMutation = useMutation({
        mutationFn: async (formData: SignInPayload) =>
            AuthService.signIn(formData),

        onSuccess: async (_data, variables) => {
            // Mantém credenciais na sessão para permitir trocar de sistema
            setCredentials({
                email: variables.email,
                senha: variables.senha,
            });

            // Se "manter conectado" ativo, persiste no localStorage
            if (rememberMe) {
                saveCredentials({
                    email: variables.email,
                    senha: variables.senha,
                    id_Sistema: variables.id_Sistema,
                });
            } else {
                clearCredentials();
            }

            setSignedIn(true);
            setIsSystemsStep(false);
            bumpSessionVersion();
            router.push("/inicio");
        },

        onError: (err: Error) => {
            console.error("Erro de autenticação:", err);
            showFeedback({
                type: "error",
                message: "E-mail ou senha ou sistema inválidos",
            });
        },

        meta: {
            errorMessage: "Erro ao autenticar usuário.",
        },
    });

    // ========================================================================
    // CALLBACKS
    // ========================================================================

    /**
     * Descobre sistemas disponíveis para as credenciais informadas
     */
    const discoverSystems = useCallback(
        async (credentials: AuthCredentials) => {
            await discoverSystemsMutation.mutateAsync(credentials);
        },
        [discoverSystemsMutation],
    );

    /**
     * Faz login em um sistema específico
     */
    const signIn = useCallback(
        async ({ email, senha, id_Sistema }: SignInPayload) => {
            await signInMutation.mutateAsync({ email, senha, id_Sistema });
        },
        [signInMutation],
    );

    /**
     * Busca dados do usuário logado e atualiza store
     */
    const fetchLoggedUser = useCallback(async () => {
        const user = await UserService.getLoggedInUser();
        setUser(user);
        return user;
    }, [setUser]);

    /**
     * Atualiza email do usuário
     */
    const updateUserEmail = useCallback(
        async (payload: Parameters<typeof UserService.updateEmail>[0]) => {
            await UserService.updateEmail(payload);
        },
        [],
    );

    /**
     * Atualiza senha do usuário
     */
    const updateUserPassword = useCallback(
        async (payload: Parameters<typeof UserService.updatePassword>[0]) => {
            await UserService.updatePassword(payload);
        },
        [],
    );

    // ========================================================================
    // QUERIES
    // ========================================================================

    /**
     * Query: Dados do usuário logado
     *
     * Só executa quando signedIn é true.
     * Invalida automaticamente quando sessionVersion muda (após logout/login).
     */
    const loggedInUser = useQuery({
        queryKey: ["loggedInUser", sessionVersion],
        enabled: signedIn,
        queryFn: fetchLoggedUser,
    });

    // ========================================================================
    // RETURN
    // ========================================================================

    return {
        discoverSystems,
        signIn,
        loggedInUser,
        discoverSystemsLoading: discoverSystemsMutation.isPending,
        signInLoading: signInMutation.isPending,
        signedIn,
        fetchLoggedUser,
        updateUserEmail,
        updateUserPassword,
    };
}
