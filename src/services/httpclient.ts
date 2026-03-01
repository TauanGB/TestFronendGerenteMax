/**
 * Requisito 5.1:
 * implementacao para leitura do token antes de cada requisicao
 * caso exista adiciona e caso nao, envia sem o header
 * 
 * Requisito 5.2:
 * tratamento de erro caso vindo da tela de login, como pedido!
 * limpar o token do localStorage
 * redirecionar para a tela de login
 */


import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "@/store/auth.store";
import router from "next/router";



const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

httpClient.interceptors.request.use(function (config: InternalAxiosRequestConfig) {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers!.Authorization = `Bearer ${token}`;
  }
  return config;
});

httpClient.interceptors.response.use(
  function (response: AxiosResponse) {
    if (response.status === 401 && response.config?.url !== "/api/auth/login") {
      useAuthStore.getState().clearAuth();
      router.push("/login");
    }
    return response;
	
  }, function (error: AxiosError) {

    const url = error.config?.url ?? "";
    const isLoginRoute = url.includes("/login");

    //Tratacao do erro caso vindo da tela de login, como pedido!
    if (isLoginRoute) {
      return Promise.reject(error);
    }

    if (error.message === "Network Error") {
      return Promise.reject(
        new Error("Erro de rede. Verifique sua conexão e tente novamente."),
      );
    }

    return Promise.reject(error);
  },
);

export { httpClient };
