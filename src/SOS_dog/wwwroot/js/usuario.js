// wwwroot/js/usuario.js

document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // LÓGICA DE REABERTURA DO MODAL DE LOGIN
    // ==========================================
    const loginModalElement = document.getElementById('loginModal');

    if (loginModalElement) {
        const hasError = loginModalElement.getAttribute('data-has-error');

        if (hasError === "true") {
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

    // ==========================================
    // LÓGICA DE ABERTURA DO MODAL DE NOVA SENHA
    // ==========================================
    const novaSenhaModalElement = document.getElementById('modalNovaSenha');

    if (novaSenhaModalElement) {
        const abrirNovaSenha = novaSenhaModalElement.getAttribute('data-abrir-nova-senha');

        if (abrirNovaSenha === "true") {
            const novaSenhaModal = new bootstrap.Modal(novaSenhaModalElement);
            novaSenhaModal.show();
        }
    }
});

// ==========================================
// BLOQUEIO DE AÇÕES QUE EXIGEM LOGIN
// ==========================================
document.addEventListener("click", function (e) {
    const target = e.target.closest('.auth-required');

    if (target) {
        e.preventDefault();
        e.stopPropagation();

        const loginModalElement = document.getElementById('loginModal');

        if (loginModalElement) {
            const loginModal = new bootstrap.Modal(loginModalElement);
            loginModal.show();
        }
    }
}, true);