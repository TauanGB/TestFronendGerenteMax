export interface AuthCredentials {
  email: string;
  senha: string;
}

export interface SignInPayload extends AuthCredentials {
  id_Sistema: string;
}

export interface SystemOption {
  id: string;
  nome?: string;
  descricao?: string;
  desc_Sistema?: string;
  id_Cliente?: string;
  connection_Key?: string;
  cliente?: SystemCliente;
  data_Criacao?: string;
  desativadoSN?: boolean;
}

export interface SystemCliente {
  nome_Razao_Social?: string;
  apelido_Fantasia?: string;
  cpF_CNPJ?: string;
  Anexo?: { url: string; principalSN?: boolean }[];
  id?: string;
}

export interface SignInResponse {
  token: string;
}

//Usuário
export interface Usuario {
  id: string;
  nome: string;
  email: string;
  apelido: string;
  desativadoSN: boolean;
  id_Pessoa?: string | null;
  Usuario_Nivel: UsuarioNivel;
  Anexo: { url: string; principalSN: boolean }[];
  data_Criacao: string;
  data_Modificacao: string | null;
}

//UsuarioNivel
export interface UsuarioNivel {
  id: string;
  nome: string;
  desc_Usuario_Nivel: string;
  desativadoSN: boolean;
}

//CreateUser
export interface CreateUser {
  id?: null;
  nome: string;
  apelido: string;
  email: string;
  senha: string;
  id_Usuario_Nivel: string;
  id_Pessoa?: string | null;
}

//UpdateUser
export interface UpdateUser {
  id?: string;
  nome: string;
  apelido?: string;
  id_Usuario_Nivel: string;
  desativadoSN?: boolean;
  id_Pessoa?: string | null;
}

//LoggedInUser
export interface LoggedInUser {
  id: string;
  nome: string;
  email: string;
  apelido: string;
  Usuario_Nivel: UsuarioNivel;
  Anexo: { url: string; principalSN: boolean }[];
}
