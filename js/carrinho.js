let carrinho = JSON.parse(localStorage.getItem('ecogeek_carrinho')) || [];

function salvarCarrinho() {
  localStorage.setItem('ecogeek_carrinho', JSON.stringify(carrinho));
}

function adicionarAoCarrinho(produto) {
  const itemExistente = carrinho.find(item => item.id === produto.id);

  if (itemExistente) {
    itemExistente.quantidade += 1;
  } else {
    carrinho.push({ ...produto, quantidade: 1 });
  }

  salvarCarrinho();
  atualizarContadorCarrinho();
  renderizarSidebar();
  mostrarToast(`"${produto.nome}" adicionado ao carrinho!`);
}

function removerDoCarrinho(id) {
  carrinho = carrinho.filter(item => item.id !== id);
  salvarCarrinho();
  atualizarContadorCarrinho();
  renderizarSidebar();
}

function atualizarContadorCarrinho() {
  const total = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
  const badges = document.querySelectorAll('.cart-badge');
  badges.forEach(badge => {
    badge.textContent = total;
    badge.style.display = total > 0 ? 'inline-block' : 'none';
  });
}

function renderizarSidebar() {
  const lista = document.getElementById('sidebar-lista');
  const totalEl = document.getElementById('sidebar-total');
  if (!lista) return;

  if (carrinho.length === 0) {
    lista.innerHTML = `
      <div class="carrinho-vazio">
        <i class="fa-solid fa-basket-shopping fa-2x mb-2 text-muted"></i>
        <p class="text-muted">Seu carrinho está vazio.</p>
      </div>`;
    totalEl.textContent = 'R$ 0,00';
    return;
  }

  lista.innerHTML = carrinho.map(item => `
    <div class="sidebar-item">
      <img src="${item.imagem}" alt="${item.nome}" class="sidebar-item-img">
      <div class="sidebar-item-info">
        <p class="sidebar-item-nome">${item.nome}</p>
        <p class="sidebar-item-preco">R$ ${(item.preco * item.quantidade).toFixed(2).replace('.', ',')}</p>
        <div class="sidebar-item-qty">
          <button class="qty-btn" onclick="alterarQuantidade(${item.id}, -1)">−</button>
          <span>${item.quantidade}</span>
          <button class="qty-btn" onclick="alterarQuantidade(${item.id}, 1)">+</button>
        </div>
      </div>
      <button class="sidebar-remover" onclick="removerDoCarrinho(${item.id})" title="Remover">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>
  `).join('');

  const total = carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
  totalEl.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

function alterarQuantidade(id, delta) {
  const item = carrinho.find(i => i.id === id);
  if (!item) return;
  item.quantidade += delta;
  if (item.quantidade <= 0) {
    removerDoCarrinho(id);
    return;
  }
  salvarCarrinho();
  renderizarSidebar();
}

function toggleSidebar() {
  const sidebar = document.getElementById('carrinho-sidebar');
  const overlay = document.getElementById('carrinho-overlay');
  if (!sidebar) return;
  sidebar.classList.toggle('aberta');
  overlay.classList.toggle('visivel');
}

function mostrarToast(mensagem) {
  return new Promise(resolve => {
    const container = document.getElementById('toast-container');
    if (!container) { resolve(); return; }

    const toast = document.createElement('div');
    toast.className = 'eco-toast';
    toast.innerHTML = `<i class="fa-solid fa-circle-check me-2"></i>${mensagem}`;
    container.appendChild(toast);

    // Força reflow para ativar transição CSS
    requestAnimationFrame(() => toast.classList.add('visivel'));

    setTimeout(() => {
      toast.classList.remove('visivel');
      toast.addEventListener('transitionend', () => {
        toast.remove();
        resolve();
      });
    }, 2500);
  });
}

function injetarSidebar() {
  const html = `
    <!-- Overlay escuro atrás da sidebar -->
    <div id="carrinho-overlay" onclick="toggleSidebar()"></div>

    <!-- Sidebar do carrinho -->
    <aside id="carrinho-sidebar">
      <div class="sidebar-header">
        <h5><i class="fa-solid fa-cart-shopping me-2"></i>Meu Carrinho</h5>
        <button class="sidebar-fechar" onclick="toggleSidebar()">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
      <div id="sidebar-lista" class="sidebar-lista"></div>
      <div class="sidebar-footer">
        <div class="sidebar-total-row">
          <span>Total:</span>
          <strong id="sidebar-total">R$ 0,00</strong>
        </div>
        <button class="btn btn-eco w-100 mt-3" onclick="mostrarToast('Compra finalizada com sucesso! 🌿').then(() => limparCarrinho())">
          <i class="fa-solid fa-lock me-2"></i>Finalizar Compra
        </button>
        <button class="btn btn-outline-eco w-100 mt-2" onclick="toggleSidebar()">
          Continuar Comprando
        </button>
      </div>
    </aside>

    <!-- Container de toasts -->
    <div id="toast-container"></div>
  `;

  document.body.insertAdjacentHTML('beforeend', html);


  document.querySelectorAll('.cart-icon').forEach(icon => {
    icon.addEventListener('click', e => {
      e.preventDefault();
      toggleSidebar();
    });

    // Injeta badge de contador
    const badge = document.createElement('span');
    badge.className = 'cart-badge';
    badge.style.display = 'none';
    icon.style.position = 'relative';
    icon.appendChild(badge);
  });
}


function limparCarrinho() {
  carrinho = [];
  salvarCarrinho();
  atualizarContadorCarrinho();
  renderizarSidebar();
  toggleSidebar();
}


document.addEventListener('DOMContentLoaded', () => {
  injetarSidebar();
  atualizarContadorCarrinho();
  renderizarSidebar();
});
