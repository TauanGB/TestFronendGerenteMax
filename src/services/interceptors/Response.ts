// Exigencia 5.2:
// No caso da resposta 401 unhautorized
// verificar se o endpoint nao é o de login
// caso nao seja, limpar o token e redirecionar para a tela de login


import { useAuthStore } from "@/store/auth.store";
import { AxiosResponse } from "axios";	
import router from "next/router";

export const responseInterceptor = (response: AxiosResponse) => {
	if (response.status === 401 && response.config?.url !== "/api/auth/login") {
		useAuthStore.getState().clearAuth();
		router.push("/login");
	}
	return response;
};