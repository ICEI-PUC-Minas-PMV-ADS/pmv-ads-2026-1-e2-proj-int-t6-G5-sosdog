// ==========================================
// FILTRO FLUTUANTE NO MAPA — filtro-mapa.js
// ==========================================

function toggleFiltroDropdown() {
    const painel = document.getElementById('filtro-mapa-painel');
    const chevron = document.getElementById('filtro-chevron');
    const btn = document.getElementById('btn-filtro-toggle');

    const aberto = painel.classList.toggle('filtro-mapa-painel--aberto');
    chevron.style.transform = aberto ? 'rotate(180deg)' : 'rotate(0deg)';
    btn.classList.toggle('btn-filtro-toggle--ativo', aberto);
}

// Fecha ao clicar fora
document.addEventListener('click', function (e) {
    const btn = document.getElementById('btn-filtro-toggle');
    const painel = document.getElementById('filtro-mapa-painel');
    if (!btn?.contains(e.target) && !painel?.contains(e.target)) {
        painel?.classList.remove('filtro-mapa-painel--aberto');
        if (document.getElementById('filtro-chevron')) {
            document.getElementById('filtro-chevron').style.transform = 'rotate(0deg)';
        }
        btn?.classList.remove('btn-filtro-toggle--ativo');
    }
});

// Atualiza badge com nº de filtros ativos
function atualizarBadge() {
    const ids = ['filtro-tipo', 'filtro-estadosaude', 'filtro-porte', 'filtro-sexo', 'filtro-faixaetaria'];
    const ativos = ids.filter(id => document.getElementById(id)?.value !== '').length;
    const badge = document.getElementById('filtro-badge');
    if (badge) {
        badge.textContent = ativos;
        badge.style.display = ativos > 0 ? 'inline-flex' : 'none';
    }
}
