/**
 * Script para fechamento automático de alertas do Bootstrap
 * Proporciona uma experiência de usuário (UX) mais limpa removendo mensagens temporárias.
 */
document.addEventListener('DOMContentLoaded', function () {
    // Seleciona todos os alertas que possuem a classe de fechamento automático
    const alerts = document.querySelectorAll('.auto-close-alert');

    alerts.forEach(function (alert) {
        // Define o tempo de espera de 5000 milissegundos (5 segundos)
        setTimeout(function () {
            // Boa prática sênior: verifica se o Bootstrap está carregado antes de usar a API dele
            if (typeof bootstrap !== 'undefined' && bootstrap.Alert) {
                const bsAlert = new bootstrap.Alert(alert);
                bsAlert.close();
            } else {
                // Fallback: se o Bootstrap falhar por rede, remove o elemento nativamente
                alert.remove();
            }
        }, 5000);
    });
});