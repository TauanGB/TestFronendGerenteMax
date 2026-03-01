import { httpClient } from "./httpclient";

export const authService = {
  login: async (email: string, password: string) => {
    const response = await httpClient.post("/v1/Auth/Sistema", [{ email, password }]);
    return response.data;
  },
};