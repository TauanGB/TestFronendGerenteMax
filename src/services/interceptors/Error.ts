import { AxiosError } from 'axios';

export const errorInterceptor = (error: AxiosError) => {
	const url = error.config?.url ?? "";
  	const isLoginRoute = url.includes("/login");


	//Tratacao do erro caso vindo da tela de login,, como pedido!
	if (isLoginRoute) {
		return Promise.reject(error);
	}


	if (error.message === 'Network Error') {
		return Promise.reject(new Error('Erro de rede. Verifique sua conexão e tente novamente.'));
	}

	return Promise.reject(error);
}
		

