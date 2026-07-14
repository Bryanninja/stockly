# 📦 Stockly

**Stockly** é um sistema moderno de gerenciamento de estoque projetado para ser rápido, escalável e com uma interface de usuário premium. Construído com as tecnologias mais recentes do ecossistema React, ele demonstra a aplicação de arquiteturas avançadas, como **Next.js App Router** e **Server Actions**, eliminando a necessidade de uma API REST tradicional.

---

## ✨ Funcionalidades

- **Gerenciamento Completo (CRUD):** Criação, listagem, edição e exclusão de produtos em tempo real.
- **Cache Inteligente:** Utilização de `unstable_cache` e `revalidateTag` do Next.js para atualizações cirúrgicas de interface sem recarregamento pesado da página.
- **Validação Rigorosa:** Formulários validados tanto no Client-side quanto no Server-side utilizando **Zod**, garantindo a integridade do banco de dados.
- **Interface Acessível e Premium:** Componentes construídos com **Shadcn UI** e **Tailwind CSS**, seguindo padrões rigorosos de acessibilidade (W3C/Radix UI).
- **Feedback Visual (Toasts):** Alertas em tempo real utilizando Sonner para ações de sucesso ou falha.

---

## 🛠️ Tecnologias Utilizadas

**Front-end & Back-end (Fullstack Framework)**
- [Next.js (App Router)](https://nextjs.org/) - Framework React com Server Components e Server Actions.
- [TypeScript](https://www.typescriptlang.org/) - Tipagem estática para maior segurança e previsibilidade.
- [Tailwind CSS](https://tailwindcss.com/) - Estilização utilitária rápida e responsiva.
- [Shadcn UI](https://ui.shadcn.com/) - Componentes de interface acessíveis e altamente customizáveis.
- [React Hook Form](https://react-hook-form.com/) - Gerenciamento de estado de formulários com alta performance.

**Banco de Dados & ORM**
- [Prisma ORM](https://www.prisma.io/) - ORM moderno para interação com o banco de dados.
- [Zod](https://zod.dev/) - Validação de esquemas de dados.

---

## 🚀 Como rodar o projeto localmente

Siga os passos abaixo para rodar o Stockly na sua máquina:

### 1. Pré-requisitos
- [Node.js](https://nodejs.org/en/) (versão 18 ou superior)
- Um banco de dados relacional configurado (ex: PostgreSQL) ou apenas SQLite para testes locais.

### 2. Clonando o repositório
```bash
git clone https://github.com/Bryanninja/stockly.git
cd stockly
```

### 3. Instalando as dependências
```bash
npm install
# ou
yarn install
```

### 4. Configurando as Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto e adicione a URL do seu banco de dados:
```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/stockly?schema=public"
```
*(Caso esteja usando o SQLite padrão do Prisma, a URL já virá pré-configurada no formato `file:./dev.db` na documentação do Prisma)*

### 5. Configurando o Banco de Dados
Rode o comando abaixo para gerar as tabelas no seu banco de dados via Prisma:
```bash
npx prisma db push
# ou
npx prisma migrate dev
```

### 6. Rodando a aplicação
```bash
npm run dev
```
O projeto estará disponível no seu navegador em: `http://localhost:3000`

---

## 👨‍💻 Autor

**Bryan (Desenvolvedor Front-end & UI/UX Designer)**
- [LinkedIn](https://linkedin.com/in/alexbryannt)
- [GitHub](https://github.com/Bryanninja)

---

*Projeto desenvolvido com foco em performance, código limpo e arquiteturas modernas do ecossistema React/Next.js.*
