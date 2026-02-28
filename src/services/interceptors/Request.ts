import { useAuthStore } from "@/store/auth.store";
import { AxiosRequestConfig } from "axios";

export const requestInterceptor = (config: AxiosRequestConfig) => {
	// Exigencia 5.1:
	// ler o token antes de cada requisicao
	// se existir adicionalo no header Authorization
	// Caso nao exista, envia a requisicao sem o header (Podem ser somente para endpoints publicos como login)
	const token = useAuthStore.getState().token;
	if (token) {
		config.headers!.Authorization = `Bearer ${token}`;
	}
	return config;
}