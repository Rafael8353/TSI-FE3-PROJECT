# ⛩️ FindMyAnime

Aplicação web desenvolvida para a disciplina de Programação Web, com foco na aplicação de conceitos de Orientação a Objetos (POO) em JavaScript e consumo de APIs externas.

## 👥 Integrantes

* **Rafael da Silveira Gonçales e Leonardo Ennes**


---

## 📝 Descrição da Aplicação

O **FindMyAnime** é um catálogo interativo que permite aos usuários pesquisar e visualizar informações detalhadas sobre animes.

**Funcionalidades:**
* **Busca:** Pesquisa de animes por nome em tempo real.
* **Home:** Exibição dos animes mais populares (Top Airing) ao iniciar.
* **Detalhes:** Página exclusiva com sinopse, nota, classificação, ano de lançamento e trailer.
* **Personagens:** Listagem dinâmica dos personagens principais com foto e nome.
* **Design:** Interface responsiva com tema visual inspirado na estética japonesa (Vermelho/Branco/Nanquim).

---

## 🌐 API Utilizada

**API:** [Jikan API v4](https://jikan.moe/) (Unofficial MyAnimeList API)

**Justificativa da escolha:**
1.  **Riqueza de Dados:** A API fornece dados completos e relacionais (Anime -> Personagens -> Trailer) em endpoints RESTful bem estruturados.
2.  **Acesso Aberto:** É uma API pública e gratuita que não requer autenticação via chave (API Key), facilitando a implementação acadêmica e testes rápidos.
3.  **Documentação:** Possui excelente documentação e alta disponibilidade.

---

## 🚀 Instruções de Uso

⚠️ **Importante:** Como este projeto utiliza **Módulos JavaScript (ES6 Modules)** (`import`/`export`), ele **não funciona** se o arquivo `index.html` for aberto diretamente pelo gerenciador de arquivos (erro de CORS).

**Passo a passo para rodar:**

1.  Baixe ou clone o repositório do projeto.
2.  Abra a pasta do projeto no **VS Code**.
3.  Instale a extensão **Live Server** (se ainda não tiver).
4.  Abra o arquivo `src/index.html`.
5.  Clique no botão **"Go Live"** no canto inferior direito do VS Code.
6.  O navegador abrirá automaticamente em `http://127.0.0.1:5500`.

---

## 📚 Conceitos de POO Implementados

Abaixo está o mapeamento de onde cada requisito técnico foi implementado no código, conforme solicitado na avaliação:

### 1. Objetos Literais
* **Arquivo:** `scripts/models.js`
    * **Objeto:** `AppConfig` (Armazena configurações globais como URL da API e imagens padrão).
* **Arquivo:** `scripts/details.js`
    * **Objeto:** `els` (Mapeia os elementos do DOM para manipulação organizada).

### 2. Funções Construtoras
* **Arquivo:** `scripts/models.js`
    * **Função:** `function Anime(data)` (Modela a entidade Anime, limpando e padronizando os dados brutos da API).
    * **Função:** `function Character(data)` (Modela a entidade Personagem).

### 3. Orientação Prototípica
* **Arquivo:** `scripts/models.js`
    * **Método:** `Anime.prototype.formatInfo`
    * **Descrição:** Estende o protótipo da função construtora Anime para adicionar um método que formata o Ano e o Tipo do anime, economizando memória.

### 4. Comunicação Assíncrona e Promises
* **Promise Customizada:**
    * **Arquivo:** `scripts/models.js` -> Função `delay(ms)`.
    * **Uso:** Utilizada no `details.js` para controlar o fluxo de requisições e evitar sobrecarga na API (Rate Limiting).
* **Fetch API & Async/Await:**
    * **Arquivo:** `scripts/api.js`
    * **Classe:** `AnimeService`. Todos os métodos (`getAnimeDetails`, `searchAnimes`, etc.) utilizam `async/await` com tratamento de erro via `try/catch`.

### 5. Arquitetura e Organização
O projeto segue o padrão de separação de responsabilidades:
* `models.js`: Definições de dados e regras de negócio (POO).
* `api.js`: Camada de serviço e comunicação externa.
* `main.js` / `details.js`: Controladores da interface (Manipulação do DOM).

---
Desenvolvido em 2025.