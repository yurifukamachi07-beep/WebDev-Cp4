# EcoGeek Wear — Check-Point 04

E-commerce de moda geek sustentável com funcionalidades JavaScript implementadas para o CP04.

## Grupo
Yuri Fukamachi 567314
Michel Benchimol 567345

## Tecnologias
- HTML5, CSS3, Bootstrap 5.3
- JavaScript ES6+ (Vanilla JS)
- Font Awesome 6 / Google Fonts (Poppins)

## Funcionalidades implementadas (CP04)

### 1. Carrinho de Compras Dinâmico
- Botões "Adicionar ao Carrinho" funcionais em todas as páginas
- Sidebar deslizante com lista de itens
- Controle de quantidade (+ / −) e remoção de itens
- Contador de itens no ícone do carrinho (badge)

### 2. Filtragem de Produtos
- Filtro por categoria (Camisetas, Moletons, Acessórios)
- Filtro por faixa de preço
- Ordenação por menor/maior preço
- Atualização instantânea sem recarregar a página

### 3. Storage e JSON
- `localStorage` persiste o carrinho entre sessões do navegador
- Produtos carregados dinamicamente de `data/produtos.json` via `fetch()`

### 4. Promises e Async/Await
- `fetch()` com `async/await` para carregar o JSON
- Toast de feedback assíncrono ao adicionar produto
- Fluxo de finalização de compra com Promise

## Estrutura de arquivos
```
frontcp4/
├── index.html
├── pages/
│   ├── categorias.html
│   ├── produto.html
│   └── contato.html
├── css/
│   ├── global.css
│   ├── style.css
│   ├── categoria.css
│   ├── produto.css
│   ├── contato.css
│   └── carrinho.css 
├── js/
│   ├── carrinho.js 
│   ├── produtos.js    
│   └── filtros.js          
├── data/
│   └── produtos.json      
└── img/
```
=
