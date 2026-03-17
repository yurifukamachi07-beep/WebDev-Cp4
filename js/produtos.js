async function carregarProdutos(containerId, caminhoJson) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="text-center py-4 w-100">
      <div class="spinner-border text-success" role="status"></div>
      <p class="mt-2 text-muted">Carregando produtos...</p>
    </div>`;

  try {
    const resposta = await fetch(caminhoJson);

    if (!resposta.ok) {
      throw new Error(`Erro ao carregar produtos: ${resposta.status}`);
    }

    const produtos = await resposta.json();
    renderizarProdutos(produtos, container);
    return produtos;

  } catch (erro) {
    console.error(erro);
    container.innerHTML = `
      <div class="alert alert-warning w-100">
        <i class="fa-solid fa-triangle-exclamation me-2"></i>
        Não foi possível carregar os produtos. Tente novamente.
      </div>`;
  }
}

function renderizarProdutos(produtos, container) {
  if (produtos.length === 0) {
    container.innerHTML = `
      <div class="text-center py-4 w-100">
        <i class="fa-solid fa-box-open fa-2x text-muted mb-2"></i>
        <p class="text-muted">Nenhum produto encontrado.</p>
      </div>`;
    return;
  }

  container.innerHTML = produtos.map(produto => `
    <div class="product-card" 
         data-id="${produto.id}"
         data-categoria="${produto.categoria}"
         data-preco="${produto.preco}">
      <img src="${produto.imagem}" alt="${produto.nome}">
      <div class="product-info">
        <span class="badge-eco">${formatarCategoria(produto.categoria)}</span>
        <h5 class="product-title">${produto.nome}</h5>
        <p class="product-text">${produto.descricao}</p>
        <p class="price">R$ ${produto.preco.toFixed(2).replace('.', ',')}</p>
        <button 
          class="btn btn-eco w-100 btn-adicionar"
          data-produto='${JSON.stringify(produto).replace(/'/g, "&#39;")}'>
          <i class="fa-solid fa-cart-plus me-2"></i>Adicionar ao Carrinho
        </button>
      </div>
    </div>
  `).join('');

  container.querySelectorAll('.btn-adicionar').forEach(btn => {
    btn.addEventListener('click', () => {
      const produto = JSON.parse(btn.dataset.produto);
      adicionarAoCarrinho(produto); // função do carrinho.js
    });
  });
}

function formatarCategoria(categoria) {
  const mapa = {
    camisetas: 'Camisetas',
    moletons: 'Moletons',
    acessorios: 'Acessórios'
  };
  return mapa[categoria] || categoria;
}