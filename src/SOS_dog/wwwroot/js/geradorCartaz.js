/**
 * Abre a rota do cartaz em uma nova aba para visualização e impressão em PDF.
 * @param {number} idOcorrencia - O ID único da ocorrência do animal.
 */
function gerarCartazPdf(idOcorrencia) {
    if (!idOcorrencia) {
        console.error("Erro: ID da ocorrência não fornecido.");
        return;
    }

    // Define a rota do backend que renderiza o layout do cartaz
    const url = `/Ocorrencias/Cartaz/${idOcorrencia}`;

    // Abre em uma nova aba para não interromper a navegação do usuário na Dashboard
    window.open(url, '_blank');
}