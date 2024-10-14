# Fitness Pro API

Este é o back-end da aplicação Fitness Pro! 🔥

Faça o [setup](#execute-o-back-end-em-seu-computador) em seu computador, depois vá para a seção [documentação da api](#documentação-da-api) para explorar os `endpoints`.

## Execute o back-end em seu computador

1. **Verifique a instalação do Git:**
   - Abra o terminal (ou Prompt de Comando no Windows).
   - Digite `git --version` e pressione Enter.
   - Se aparecer a versão do Git (ex.: `git version 2.30.0`), significa que ele está instalado. Se não, siga as instruções de instalação para o seu sistema operacional disponíveis em [git-scm.com](https://git-scm.com/).

2. **Verifique a instalação do Node.js:**
   - Abra o terminal (ou prompt de comando no Windows).
   - Digite `node -v` e pressione Enter.
   - Se você vir a versão do Node.js (ex.: `v20.17.0`), significa que ele está instalado. Se não, siga as instruções de instalação para o seu sistema operacional disponíveis em [nodejs.org](https://nodejs.org/).

3. **Clone o repositório do Fitness Pro API:**
   - No terminal, navegue até a pasta onde deseja clonar o repositório usando o comando `cd caminho/para/pasta`.
   - Clone o repositório digitando o comando `git clone https://github.com/fe-pro/fitness-pro-api.git` e pressione Enter.
   - Entre na pasta do projeto com `cd fitness-pro-api`.

4. **Instale as dependências:**
   - No terminal, execute o comando `npm install` e aguarde até que todas as dependências sejam instaladas. Isso pode levar alguns minutos dependendo da velocidade da sua conexão com a internet.

5. **Configure o banco de dados:**
   - Após a instalação, execute o comando `npm run setup-db`, isso vai criar o banco de dados do projeto.

6. **Inicie o back-end em modo de desenvolvimento:**
   - Após a instalação das dependências e a configuração do banco de dados, execute o comando `npm run start:dev` no terminal.
   - Se tudo estiver correto, o servidor exibirá: "🚀 HTTP Server Running!".

<br />

## Documentação da API

### URL Base
`http://127.0.0.1:3333`

### Usuários

<details>
 <summary><code>POST</code> <code><b>/</b></code> <code>(Cria um novo usuário)</code></summary>

  #### Cria um novo usuário

  ##### Requisição:

  >  **URL**: `/users`  
  >  **Método**: `POST`  
  >  **Autenticação**: Não  
  >  **Descrição**: Cria um novo usuário com base nos dados enviados.
  >
  >  **Cabeçalhos**:
  >  ```
  >  Content-Type: application/json
  >  ```
  >
  >  **Corpo da Requisição**:
  >
  >  ```json
  >  {
  >    "name": "John Doe",
  >    "email": "johndoe@example.com",
  >    "password": "securepassword123"
  >  }
  >  ```

  ##### Resposta:

  >  **Status Code**: 201 Created

  ##### Possíveis erros:

  >  | Código http           |  Motivo                                                 |
  >  |-----------------------|---------------------------------------------------------|
  >  | `400 Bad Request`     | O campo 'name' é obrigatório e deve ser texto.          |
  >  | `400 Bad Request`     | O campo 'email' deve ser um email válido.               |
  >  | `400 Bad Request`     | O campo 'password' deve ter no mínimo 6 caracteres.     |
  >  | `409 Conflict`        | E-mail já existe.                                       |

  <br />

</details>

<details>
 <summary><code>POST</code> <code><b>/</b></code> <code>(Gera um novo token de usuário)</code></summary>

  #### Gera um novo token de usuário

  ##### Requisição:

  >  **URL**: `/sessions`   
  >  **Método**: `POST`  
  >  **Autenticação**: Não  
  >  **Descrição**: Gera um novo token com base nas credenciais enviadas.  
  >
  >  **Cabeçalhos**:
  >  ```
  >  Content-Type: application/json
  >  ```
  >
  >  **Corpo da Requisição**:
  >
  >  ```json
  >  {
  >    "email": "johndoe@example.com",
  >    "password": "securepassword123"
  >  }
  >  ```

  ##### Resposta:

  >  **Status Code**: 200 Ok
  >
  >  ```json
  >  {
  >    "token": "{userToken}"
  >  }
  >  ```

  ##### Possíveis erros:

  >  | Código http           | Motivo                                              |
  >  |-----------------------|-----------------------------------------------------|
  >  | `400 Bad Request`     | O campo 'email' deve ser um email válido.           |
  >  | `400 Bad Request`     | O campo 'password' deve ter no mínimo 6 caracteres. |
  >  | `400 Bad Request`     | Credenciais inválidas.                              |

  <br />
  
</details>

### Treinos

<details>
 <summary><code>POST</code> <code><b>/</b></code> <code>(Cria um novo treino)</code></summary>

  #### Cria um novo treino

  ##### Requisição:

  >  **URL**: `/workout`  
  >  **Método**: `POST`  
  >  **Autenticação**: Sim  
  >  **Descrição**: Cria um novo treino com base no título enviado.  
  >
  >  **Cabeçalhos**:
  >  ```
  >    Authorization: Bearer {userToken}
  >    Content-Type: application/json
  >  ```
  >
  >  **Corpo da Requisição**:
  >  ```json
  >  {
  >    "title": "Peito e triceps"
  >  }
  >  ```

  ##### Resposta:

  >  **Status Code**: 201 Created
  >
  >  ```json
  >  {
  >      "workout": {
  >          "id": "b9e80067-0acd-41b8-8a54-d02c11ecb9a5",
  >          "title": "Peito e triceps",
  >          "userId": "8440ba9f-6397-4c48-b343-8f9f9bf3a46b"
  >      }
  >  }
  >  ```

  ##### Possíveis erros:

  > | Código http           | Motivo                                        |
  > |-----------------------|-----------------------------------------------|
  > | `400 Bad Request`     | O campo 'title' é obrigatório.                |
  > | `401 Unauthorized`    | Não autorizado.                               |

  <br />

</details>

<details>
 <summary><code>GET</code> <code><b>/</b></code> <code>(Retorna todos os treinos)</code></summary>
  
  #### Retorna todos os treinos

  ##### Requisição:

  > **URL**: `/workout/list`  
  > **Método**: `GET`  
  > **Autenticação**: Sim  
  > **Descrição**: Retorna todos os treinos disponíveis.  
  >
  > **Cabeçalhos**:
  > ```
  >   Authorization: Bearer {userToken}
  >   Cache-Control: no-cache
  > ```

  ##### Resposta:

  >  **Status Code**: 200 Ok
  >
  >  ```json
  >  {
  >      "workouts": [
  >          {
  >              "id": "b9e80067-0acd-41b8-8a54-d02c11ecb9a5",
  >              "title": "Peito e triceps"
  >          },
  >          {
  >              "id": "3b2eec30-bae9-497c-97ce-d1564b47a5b8",
  >              "title": "Costas e biceps"
  >          },
  >          {
  >              "id": "036ad0dc-ffb7-439e-bb7e-20778524f6af",
  >              "title": "Perna e ombro"
  >          }
  >      ]
  >  }
  >  ```

  ##### Possíveis erros:

  >  | Código http             |  Motivo                                                 |
  >  |-------------------------|---------------------------------------------------------|
  >  | `401 Unauthorized`      | Não autorizado.                                         |

  <br />

</details>

<details>
 <summary><code>PATCH</code> <code><b>/</b></code> <code>(Atualiza o nome do treino)</code></summary>
  
  #### Atualiza o nome do treino

  ##### Requisição:

  >  **URL**: `/workout/{workout-id}`  
  >  **Método**: `PATCH`  
  >  **Autenticação**: Sim  
  >  **Descrição**: Atualiza o nome do treino a partir de seu `id`.
  >
  >  **Cabeçalhos**:
  >  ```
  >    Authorization: Bearer {userToken}
  >    Content-Type: application/json
  >  ```
  >
  >  **Corpo da Requisição**:
  >  ```json
  >  {
  >    "title": "Peito, triceps e cardio"
  >  }
  >  ```

  ##### Resposta:

  >  **Status Code**: 200 Ok
  >
  >  ```json
  >  {
  >      "updatedWorkout": {
  >          "id": "b9e80067-0acd-41b8-8a54-d02c11ecb9a5",
  >          "title": "Peito, triceps e cardio",
  >          "userId": "8440ba9f-6397-4c48-b343-8f9f9bf3a46b"
  >      }
  >  }
  >  ```

  ##### Possíveis erros:

  >  | Código http           | Motivo                                        |
  >  |-----------------------|-----------------------------------------------|
  >  | `400 Bad Request`     | O campo 'workoutId' deve ser um UUID válido.  |
  >  | `400 Bad Request`     | O campo 'title' é obrigatório.                |
  >  | `401 Unauthorized`    | Não autorizado.                               |
  >  | `404 Not Found`       | Recurso não encontrado.                       |

  <br />

</details>


<details>
 <summary><code>DELETE</code> <code><b>/</b></code> <code>(Exclui um treino)</code></summary>
  
  #### Exclui um treino

  ##### Requisição:

  >  **URL**: `/workout/{workout-id}`  
  >  **Método**: `DELETE`  
  >  **Autenticação**: Sim  
  >  **Descrição**: Exclui um treino a partir de seu `id`.
  >
  >  **Cabeçalhos**:
  >  ```
  >    Authorization: Bearer {userToken}
  >  ```

  ##### Resposta:

  >  **Status Code**: 200 Ok

  ##### Possíveis erros:

  > | Código http           | Motivo                                        |
  > |-----------------------|-----------------------------------------------|
  > | `400 Bad Request`     | O campo 'id' deve ser um UUID válido.         |
  > | `401 Unauthorized`    | Não autorizado.                               |
  > | `404 Not Found`       | Recurso não encontrado.                       |

  <br />

</details>

### Exercícios

<details>
 <summary><code>POST</code> <code><b>/</b></code> <code>(Cria um novo exercício)</code></summary>
  
  #### Cria um novo exercício

  ##### Requisição:

  >  **URL**: `/exercise`  
  >  **Método**: `POST`  
  >  **Autenticação**: Sim  
  >  **Descrição**: Cria um novo exercício para um treino específico a partir de seu `id`.
  >
  >  **Cabeçalhos**:
  >  ```
  >    Authorization: Bearer {userToken}
  >    Content-Type: application/json
  >  ```
  >
  >  **Corpo da Requisição**:
  >  ```json
  >  {
  >      "title": "Supino inclinado",
  >      "sets": 4,
  >      "reps": 10,
  >      "workoutId": "{workout-id}"
  >  }
  >  ```

  ##### Resposta:

  > **Status Code**: 201 Created

  ##### Possíveis erros:

  >  | Código http           | Motivo                                        |
  >  |-----------------------|-----------------------------------------------|
  >  | `400 Bad Request`     | O campo 'title' é obrigatório.                |
  >  | `400 Bad Request`     | O campo 'sets' deve ser um número.            |
  >  | `400 Bad Request`     | O campo 'reps' deve ser um número.            |
  >  | `400 Bad Request`     | O campo 'workoutId' deve ser um UUID válido.  |
  >  | `401 Unauthorized`    | Não autorizado.                               |

  <br />

</details>

<details>
 <summary><code>GET</code> <code><b>/</b></code> <code>(Retorna todos os exercícios de um treino)</code></summary>
  
  #### Retorna todos os exercícios de um treino

  ##### Requisição:
  
  >  **URL**: `/exercise/{workout-id}/list`  
  >  **Método**: `GET`  
  >  **Autenticação**: Sim  
  >  **Descrição**: Retorna todos os exercícios de um treino específico a partir de seu `id`.
  >
  >  **Cabeçalhos**:
  >  ```
  >    Authorization: Bearer {userToken}
  >    Cache-Control: no-cache
  >  ```
  
  ##### Resposta:

  >  **Status Code**: 200 Ok
  >
  >  ```json
  >  {
  >    "workoutTitle": "Peito e triceps",
  >    "exercises": [
  >      {
  >        "id": "1dbf3bc4-9203-4cbc-b9ee-34306ea36e13",
  >        "title": "Supino Reto",
  >        "sets": 4,
  >        "reps": 10,
  >        "workoutId": "3b2eec30-bae9-497c-97ce-d1564b47a5b8"
  >      },
  >      {
  >        "id": "75f39f32-5c7e-4312-bdc9-c0ed68496e19",
  >        "title": "Supino inclinado",
  >        "sets": 4,
  >        "reps": 10,
  >        "workoutId": "3b2eec30-bae9-497c-97ce-d1564b47a5b8"
  >      },
  >      {
  >        "id": "341a06d0-7afb-45ae-9b4a-62e95d4f1caf",
  >        "title": "Tríceps coice",
  >        "sets": 4,
  >        "reps": 10,
  >        "workoutId": "3b2eec30-bae9-497c-97ce-d1564b47a5b8"
  >      }
  >    ]
  >  }
  >  ```

  ##### Possíveis erros:

  >  | Código http           | Motivo                                        |
  >  |-----------------------|-----------------------------------------------|
  >  | `400 Bad Request`     | O campo 'workoutId' deve ser um UUID válido.  |
  >  | `401 Unauthorized`    | Não autorizado.                               |
  >  | `404 Not Found`       | Recurso não encontrado.                       |

  <br />

</details>

<details>
 <summary><code>PUT</code> <code><b>/</b></code> <code>(Atualiza um exercício)</code></summary>
  
  #### Atualiza um exercício

  ##### Requisição:

  >  **URL**: `/exercise/{exercise-id}`  
  >  **Método**: `PUT`  
  >  **Autenticação**: Sim  
  >  **Descrição**: Atualiza um exercício específico a partir de seu `id`.
  >
  >  **Cabeçalhos**:
  >  ```
  >    Authorization: Bearer {userToken}
  >    Content-Type: application/json
  >  ```
  >
  >  **Corpo da Requisição**:
  >  ```json
  >  {
  >    "title": "Supino reto",
  >    "sets": 4,
  >    "reps": 10
  >  }
  >  ```

  ##### Resposta:

  >  **Status Code**: 200 Ok
  >
  >  ```json
  >  {
  >    "exercise": {
  >      "exercise": {
  >        "id": "1dbf3bc4-9203-4cbc-b9ee-34306ea36e13",
  >        "title": "Supino reto",
  >        "sets": 4,
  >        "reps": 10,
  >        "workoutId": "3b2eec30-bae9-497c-97ce-d1564b47a5b8"
  >      }
  >    }
  >  }
  >  ```

  ##### Possíveis erros:

  >  | Código http           | Motivo                                        |
  >  |-----------------------|-----------------------------------------------|
  >  | `400 Bad Request`     | O campo 'exerciseId' deve ser um UUID válido. |
  >  | `400 Bad Request`     | O campo 'title' é obrigatório.                |
  >  | `400 Bad Request`     | O campo 'sets' deve ser um número.            |
  >  | `400 Bad Request`     | O campo 'reps' deve ser um número.            |
  >  | `401 Unauthorized`    | Não autorizado.                               |
  >  | `404 Not Found`       | Recurso não encontrado.                       |

  <br />

</details>

<details>
 <summary><code>DELETE</code> <code><b>/</b></code> <code>(Deleta um exercício)</code></summary>
  
  #### Deleta um exercício

  ##### Requisição:

  >  **URL**: `/exercise/{exercise-id}`  
  >  **Método**: `DELETE`  
  >  **Autenticação**: Sim  
  >  **Descrição**: Exclui um exercício a partir de seu `id`.
  >
  >  **Cabeçalhos**:
  >  ```
  >  Authorization: Bearer {userToken}
  >  ```

  ##### Resposta:

  >  **Status Code**: 200 Ok

  ##### Possíveis erros:

  >  | Código http           | Motivo                                        |
  >  |-----------------------|-----------------------------------------------|
  >  | `400 Bad Request`     | O campo 'id' deve ser um UUID válido.         |
  >  | `401 Unauthorized`    | Não autorizado.                               |
  >  | `404 Not Found`       | Recurso não encontrado.                       |

</details>
