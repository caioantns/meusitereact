# 🏋️ iTrainer - React App

Este é o projeto React convertido do site iTrainer original (HTML, CSS, JavaScript).

## 🚀 Como Executar

### Pré-requisitos
- Node.js (versão 14 ou superior)
- npm ou yarn

### Instalação e Execução

1. **Navegue para o diretório do projeto:**
   ```bash
   cd meu-site-react
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm start
   ```

4. **Acesse o projeto:**
   Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 📁 Estrutura do Projeto

```
meu-site-react/
├── public/                 # Arquivos públicos
│   └── index.html         # HTML principal
├── src/                   # Código fonte React
│   ├── components/        # Componentes React
│   │   ├── Header.js      # Cabeçalho da aplicação
│   │   ├── Header.css     # Estilos do cabeçalho
│   │   ├── Footer.js      # Rodapé da aplicação
│   │   ├── Footer.css     # Estilos do rodapé
│   │   ├── Home.js        # Página inicial
│   │   ├── Home.css       # Estilos da página inicial
│   │   ├── Login.js       # Página de login
│   │   └── Login.css      # Estilos da página de login
│   ├── App.js             # Componente principal
│   ├── App.css            # Estilos globais
│   └── index.js           # Ponto de entrada
├── package.json           # Dependências e scripts
└── README.md             # Este arquivo
```

## 🎯 Funcionalidades Implementadas

### ✅ Páginas Convertidas
- **Página Inicial (Home)** - Com hero section, serviços, sobre, depoimentos e CTA
- **Página de Login** - Sistema de login com abas para cliente e profissional
- **Header** - Navegação responsiva com menu mobile
- **Footer** - Rodapé com links e informações de contato

### ✅ Funcionalidades
- **Navegação Responsiva** - Menu mobile funcional
- **Sistema de Login** - Abas para cliente e profissional
- **Animações AOS** - Animações de scroll
- **Chat de Suporte** - Modal de chat funcional
- **Slider de Depoimentos** - Auto-play e navegação manual
- **Gerenciamento de Estado** - Usando React hooks
- **Roteamento** - React Router para navegação

### 🔐 Dados de Teste para Login
- **Cliente:** 
  - Email: `aluno@teste.com`
  - Senha: `12345`
- **Profissional:**
  - Email: `admin@teste.com`
  - Senha: `12345`

## 🛠️ Tecnologias Utilizadas

- **React 19** - Biblioteca principal
- **React Router DOM** - Roteamento
- **AOS (Animate On Scroll)** - Animações
- **Font Awesome** - Ícones
- **CSS3** - Estilos e animações

## 📱 Responsividade

O projeto é totalmente responsivo e funciona em:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (até 767px)

## 🎨 Design System

### Cores Principais
- **Primária:** `#667eea` (Azul)
- **Secundária:** `#764ba2` (Roxo)
- **Texto:** `#333` (Cinza escuro)
- **Texto Secundário:** `#666` (Cinza médio)

### Gradientes
- **Principal:** `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`

## 🔧 Scripts Disponíveis

- `npm start` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria a versão de produção
- `npm test` - Executa os testes
- `npm run eject` - Ejetar configurações (irreversível)

## 📋 Próximos Passos

### Páginas a Implementar
- [ ] Página de Profissionais
- [ ] Página de Contato
- [ ] Página Sobre
- [ ] Perfil do Cliente
- [ ] Painel do Profissional

### Funcionalidades a Adicionar
- [ ] Sistema de cadastro
- [ ] Filtros de busca
- [ ] Sistema de avaliações
- [ ] Agendamento de treinos
- [ ] Chat em tempo real

## 🐛 Solução de Problemas

### Erro "Missing script: start"
Certifique-se de estar no diretório correto:
```bash
cd meu-site-react
npm start
```

### Erro de dependências
Reinstale as dependências:
```bash
npm install
```

### Porta 3000 ocupada
O React tentará automaticamente a próxima porta disponível.

## 📞 Suporte

Para dúvidas ou problemas, consulte:
- Documentação do React: https://reactjs.org/
- Documentação do React Router: https://reactrouter.com/

---

**Desenvolvido com ❤️ para o projeto iTrainer**
