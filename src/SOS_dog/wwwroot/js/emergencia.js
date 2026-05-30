
document.addEventListener("DOMContentLoaded", function () {
    // 1. Captura os elementos estruturais e o container da nossa página
    const bodyElement = document.body;
    const mainElement = document.querySelector("main");
    const containerEmergencia = document.getElementById("sosdog-emergencia");

    // 2. Se a div de emergência estiver presente na tela, ajustamos o layout
    if (containerEmergencia) {

        // Libera o body global para aceitar rolagem vertical
        if (bodyElement) {
            bodyElement.style.setProperty("overflow-y", "auto", "important");
            bodyElement.style.setProperty("overflow-x", "hidden", "important");
            bodyElement.style.setProperty("height", "auto", "important");
        }

        // Destranca o container <main> do ASP.NET Core para expandir com os cards
        if (mainElement) {
            mainElement.style.setProperty("overflow", "visible", "important");
            mainElement.style.setProperty("height", "auto", "important");
            mainElement.style.setProperty("min-height", "calc(100vh - 120px)", "important");
            mainElement.style.setProperty("display", "block", "important");
        }

        console.log("SOS Dog: Rolagem e dimensões liberadas para a página de Emergência.");

        // 3. Opcional: Log de clique nos botões de ligação para monitoramento no Console
        const botoesLigar = document.querySelectorAll(".btn-ligar");
        botoesLigar.forEach(botao => {
            botao.addEventListener("click", function () {
                const numero = this.textContent.trim();
                console.log(`Chamada iniciada para o número de emergência: ${numero}`);
            });
        });
    }
});