// Dado retornado da API:
// export interface SystemOption {
//  id: string;
//  nome?: string;
//  descricao?: string;
//  desc_Sistema?: string;
//  id_Cliente?: string;
//  connection_Key?: string;
//  cliente?: SystemCliente;
//  data_Criacao?: string;
//  desativadoSN?: boolean;
//}
//export interface SystemCliente {
//  nome_Razao_Social?: string;
//  apelido_Fantasia?: string;
//  cpF_CNPJ?: string;
//  Anexo?: { url: string; principalSN?: boolean }[];
//  id?: string;
//}
import { httpClient } from "./httpclient";
import { AuthCredentials, SystemOption, SignInResponse, SignInPayload  } from "@/types/types";

export const authService = {
    async discoverSystems(payload: AuthCredentials): Promise<SystemOption[]> {
      const { data } = await httpClient.post<SystemOption[]>("/v1/Auth/Sistema", payload);
      return data;
    },
  
    async signIn(payload: SignInPayload): Promise<SignInResponse> {
      const { data } = await httpClient.post<SignInResponse>("/v1/auth/login", payload);
      return data;
    },
  };