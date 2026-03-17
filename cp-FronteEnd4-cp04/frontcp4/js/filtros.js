// ============================================================
//  filtros.js — Filtragem Dinâmica de Produtos
//  Funcionalidades:
//    - Filtra por categoria e faixa de preço
//    - Atualiza a exibição sem recarregar a página
//    - Mostra contador de resultados
// ============================================================

// ── 1. Aplica os filtros selecionados ──
function aplicarFiltros() {
  const selectCategoria = document.getElementById('tipo');
  const selectPreco = document.getElementById('preco');
  const cards = document.querySelectorAll('#grid-produtos .product-card');

  const categoriaSelecionada = selectCategoria ? selectCategoria.value : 'Todos os tipos';
  const precoSelecionado = selectPreco ? selectPreco.value : 'Todos os preços';

  let visiveis = 0;

  cards.forEach(card => {
    const categoriaCard = card.dataset.categoria;
    const precoCard = parseFloat(card.dataset.preco);

    // ── Verifica filtro de categoria ──
    const passaCategoria = verificarCategoria(categoriaCard, categoriaSelecionada);

    // ── Verifica filtro de preço ──
    const passaPreco = verificarPreco(precoCard, precoSelecionado);

    if (passaCategoria && passaPreco) {
      card.style.display = 'flex';
      // Animação suave ao aparecer
      card.style.animation = 'none';
      requestAnimationFrame(() => {
        card.style.animation = 'fadeIn 0.3s ease';
      });
      visiveis++;
    } else {
      card.style.display = 'none';
    }
  });

  // Atualiza o contador de resultados
  atualizarContadorResultados(visiveis);
}

// ── 2. Verifica se o card passa no filtro de categoria ──
function verificarCategoria(categoriaCard, filtro) {
  if (filtro === 'Todos os tipos') return true;

  const mapa = {
    'Moletons':    'moletons',
    'Camisetas':   'camisetas',
    'Acessórios':  'acessorios'
  };

  return categoriaCard === mapa[filtro];
}

// ── 3. Verifica se o card passa no filtro de preço ──
function verificarPreco(preco, filtro) {
  switch (filtro) {
    case 'Até R$ 50':        return preco <= 50;
    case 'R$ 51 a R$ 100':   return preco > 50 && preco <= 100;
    case 'R$ 101 a R$ 150':  return preco > 100 && preco <= 150;
    case 'Acima de R$ 150':  return preco > 150;
    default:                 return true; // "Todos os preços"
  }
}

// ── 4. Atualiza o texto de resultados encontrados ──
function atualizarContadorResultados(quantidade) {
  const contador = document.getElementById('resultado-contador');
  if (!contador) return;
  contador.textContent = `${quantidade} produto${quantidade !== 1 ? 's' : ''} encontrado${quantidade !== 1 ? 's' : ''}`;
}

// ── 5. Limpa todos os filtros ──
function limparFiltros() {
  const selectCategoria = document.getElementById('tipo');
  const selectPreco = document.getElementById('preco');

  if (selectCategoria) selectCategoria.value = 'Todos os tipos';
  if (selectPreco) selectPreco.value = 'Todos os preços';

  aplicarFiltros();
}

// ── 6. Inicialização: conecta os botões de filtro ──
document.addEventListener('DOMContentLoaded', () => {
  const btnAplicar = document.getElementById('btn-aplicar-filtros');
  const btnLimpar = document.getElementById('btn-limpar-filtros');

  if (btnAplicar) btnAplicar.addEventListener('click', aplicarFiltros);
  if (btnLimpar) btnLimpar.addEventListener('click', limparFiltros);

  // Filtro automático ao mudar os selects (sem precisar clicar no botão)
  document.getElementById('tipo')?.addEventListener('change', aplicarFiltros);
  document.getElementById('preco')?.addEventListener('change', aplicarFiltros);
});
