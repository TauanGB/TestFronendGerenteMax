# 📘 API Reference

Documentação resumida dos endpoints utilizados no sistema.

---

# 🔐 1. Autenticação

## 1.1 Descobrir Sistemas

- **Método:** `POST`
- **URL:** `/v1/Auth/Sistema`

### Body
```json
{
  "email": "string",
  "senha": "string"
}
Resposta
SystemOption[]
1.2 Login

Método: POST

URL: /v1/auth/login

Body
{
  "email": "string",
  "senha": "string",
  "id_Sistema": "string"
}
Resposta
{
  "token": "string"
}
👤 2. Usuários
2.1 Listar Usuários (Tabela)

Método: GET

URL: /v1/Account/Usuario/Listar_Parcial

Params: Paginação (ver seção 11)

Resposta

UsuarioTableRow[]

Headers de paginação

2.2 Buscar Usuário por ID

Método: GET

URL: /v1/account/usuario/listar

Query:

?id=<uuid>
Resposta
Usuario[]

⚠️ Retorna array. Utilize o primeiro item.

2.3 Criar Usuário

Método: POST

URL: /v1/account/usuario/criar

Body
CreateUser[]
Resposta
Usuario[]
2.4 Atualizar Usuário (Parcial)

Método: PATCH

URL: /v1/account/usuario/atualizar_parcial

Body
UpdateUser[]
Resposta
Usuario[]
2.5 Alterar Email

Método: PUT

URL: /v1/account/usuario/atualizar/email

Body

Ver seção 8.3

Resposta

void

Status 200 = sucesso

2.6 Alterar Senha

Método: PUT

URL: /v1/account/usuario/atualizar/senha

Body

Ver seção 8.4

Resposta

void

Status 200 = sucesso

2.7 Usuário Logado

Método: GET

URL: /v1/Account/Usuario/Listar/Logado

Resposta
LoggedInUser
📋 3. Dados Auxiliares (Selects)
3.1 Listar Níveis de Usuário

Método: GET

URL: /v1/Account/usuario_nivel/listar

Params: Paginação padrão

Resposta

UsuarioNivel[]

Headers de paginação

3.2 Listar Pessoas

Método: GET

URL: /v1/Core/Pessoa/Listar_Parcial

Params: Paginação padrão

Resposta

Pessoa[]

Headers de paginação