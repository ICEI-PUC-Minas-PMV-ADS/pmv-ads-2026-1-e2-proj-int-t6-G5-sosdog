// wwwroot/js/usuario.js

document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // LÓGICA DE REABERTURA DO MODAL DE LOGIN
    // ==========================================
    const loginModalElement = document.getElementById('loginModal');

    if (loginModalElement) {
        // Verifica se o Razor injetou "true" no atributo data-has-error
        const hasError = loginModalElement.getAttribute('data-has-error');

        if (hasError === "true") {
            // Instancia e exibe o modal usando o Bootstrap via JS
            const loginModal = new bootstrap.Modal(loginModalElement);
            loginModal.show();
        }
    }
    // ==========================================
    // LÓGICA DE REABERTURA DO MODAL DE CADASTRO
    // ==========================================
    const cadastroModalElement = document.getElementById('cadastroModal');
    if (cadastroModalElement) {
        const hasError = cadastroModalElement.getAttribute('data-has-error');
        if (hasError === "true") {
            const cadastroModal = new bootstrap.Modal(cadastroModalElement);
            cadastroModal.show();
        }
    }
});
// ==========================================
// LÓGICA DE ABERTURA DO MODAL DE TOKEN
// ==========================================
const tokenModalElement = document.getElementById('modalToken');

if (tokenModalElement) {
    const abrirToken = tokenModalElement.getAttribute('data-abrir-token');

    if (abrirToken === "true") {
        const tokenModal = new bootstrap.Modal(tokenModalElement);
        tokenModal.show();
    }
}

// Adicione isso ao seu arquivo wwwroot/js/usuario.js
document.addEventListener("click", function (e) {
    // Busca se o elemento clicado ou algum pai dele tem a classe 'auth-required'
    const target = e.target.closest('.auth-required');

    if (target) {
        // 1. Para tudo o que o botão ia fazer (redirecionar, abrir outro modal, etc)
        e.preventDefault();
        e.stopPropagation();

        // 2. Abre o Modal de Login
        const loginModalElement = document.getElementById('loginModal');
        if (loginModalElement) {
            const loginModal = new bootstrap.Modal(loginModalElement);
            loginModal.show();
        }
    }
}, true); // O 'true' garante que capturemos o clique antes de outros scripts (Capture phase)