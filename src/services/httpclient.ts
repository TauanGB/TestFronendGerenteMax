import axios from 'axios';

import { errorInterceptor, responseInterceptor } from './interceptors';

const httpClient = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

httpClient.interceptors.response.use(
	response => responseInterceptor(response),
	error =>  errorInterceptor(error),

);

export { httpClient}