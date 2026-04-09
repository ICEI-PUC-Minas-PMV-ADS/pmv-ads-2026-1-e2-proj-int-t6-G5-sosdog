// ==========================================
// GERENCIADOR DO MODAL DE REPORTAR CASOS
// ==========================================
class ReportManager {
    constructor() {
        // ID DO BOTÃO QUE ABRE O MODAL (PRECISA ESTAR NO SEU INDEX.HTML)
        this.btnReportar = document.getElementById("btnReportarAnimal");
        this.init();
    }

    init() {
        if (this.btnReportar) {
            this.setupBotaoReportar();
        }
    }

    // CONFIGURA O CLIQUE NO BOTÃO PARA INJETAR/ABRIR O MODAL
    setupBotaoReportar() {
        this.btnReportar.addEventListener("click", async (e) => {
            e.preventDefault();
            let modal = document.getElementById("modalReportarAnimal");

            // SE O MODAL AINDA NÃO EXISTE NO HTML, FAZ O FETCH E INJETA
            if (!modal) {
                modal = await this.injetarModalNaTela();
            }

            // SE TUDO DEU CERTO, MOSTRA O MODAL
            if (modal) {
                modal.style.display = "flex";
            }
        });
    }

    // BUSCA O HTML EXTERNO E COLOCA DENTRO DO BODY
    async injetarModalNaTela() {
        try {
            // CAMINHO RELATIVO AO INDEX.HTML
            const response = await fetch("./pages/reportarCasosModal.html");
            if (!response.ok) throw new Error("ERRO AO CARREGAR O MODAL DE REPORTAR");
            
            const html = await response.text();
            
            // CRIA UMA DIV TEMPORÁRIA PARA CONVERTER O TEXTO EM ELEMENTO DOM
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = html;
            
            // ADICIONA O MODAL AO FINAL DO BODY
            document.body.appendChild(tempDiv.firstElementChild);
            
            // INICIA AS FUNÇÕES DOS BOTÕES INTERNOS DO MODAL
            this.iniciarEventosDoModal();
            
            return document.getElementById("modalReportarAnimal");
        } catch (error) {
            console.error("FALHA AO INJETAR O MODAL:", error);
            return null;
        }
    }

    // CONFIGURA OS EVENTOS DE FECHAR E ENVIAR O FORMULÁRIO DENTRO DO MODAL
    iniciarEventosDoModal() {
        const modal = document.getElementById("modalReportarAnimal");
        const btnFechar = document.getElementById("closeReportModal");
        const formReportar = document.getElementById("formReportarAnimal");

        // FECHA AO CLICAR NO "X"
        if (btnFechar) {
            btnFechar.addEventListener("click", () => {
                modal.style.display = "none";
            });
        }

        // FECHA AO CLICAR FORA DA CAIXA BRANCA (NO FUNDO ESCURO)
        window.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.style.display = "none";
            }
        });

        // LIDA COM O CLIQUE NO BOTÃO "REGISTRAR MARCAÇÃO" E SALVA NO LOCALSTORAGE
        if (formReportar) {
            // ATENÇÃO: Adicionei o 'async' aqui para podermos esperar a conversão da foto
            formReportar.addEventListener("submit", async (e) => {
                e.preventDefault();
                
                // 1. CAPTURA OS VALORES DOS CAMPOS DO FORMULÁRIO
                const rua = document.getElementById("reportRua").value;
                const tipoSelecionado = document.querySelector('input[name="reportTipo"]:checked').value;
                const porte = document.getElementById("reportPorte").value;
                const saude = document.getElementById("reportSaude").value;
                const comentario = document.getElementById("reportComentario").value;
                
                // CAPTURA A LISTA DE CUIDADOS
                const cuidadosElements = document.querySelectorAll('input[name="reportCuidados"]:checked');
                const cuidados = Array.from(cuidadosElements).map(cb => cb.value);

                // ==========================================
                // 2. CONVERSÃO DA FOTO PARA BASE64 (TEXTO)
                // ==========================================
                const fotoInput = document.getElementById("reportFoto");
                let fotoSalva = ""; // Variável que vai guardar o texto da imagem

                if (fotoInput.files.length > 0) {
                    const arquivo = fotoInput.files[0];
                    // Transforma a imagem em Base64 usando FileReader
                    fotoSalva = await new Promise((resolve, reject) => {
                        const reader = new FileReader();
                        reader.readAsDataURL(arquivo);
                        reader.onload = () => resolve(reader.result);
                        reader.onerror = error => reject(error);
                    });
                } else {
                    // Caminho de uma imagem padrão caso ele não mande nada
                    fotoSalva = "./assets/sem-foto.png"; 
                }

                // 3. MONTA O OBJETO DA MARCAÇÃO
                const novaMarcacao = {
                    id: Date.now(),
                    rua: rua,
                    tipo: tipoSelecionado,
                    porte: porte,
                    saude: saude,
                    cuidados: cuidados,
                    comentario: comentario,
                    fotoBase64: fotoSalva, // AGORA SALVA A STRING BASE64 AQUI
                    dataRegistro: new Date().toLocaleDateString('pt-BR')
                };

                // 3. BUSCA O QUE JÁ TEM SALVO NO LOCALSTORAGE (OU CRIA UM ARRAY VAZIO)
                const casosSalvos = JSON.parse(localStorage.getItem("sos_marcacoes")) || [];

                // 4. ADICIONA A NOVA MARCAÇÃO NA LISTA E SALVA DE VOLTA
                casosSalvos.push(novaMarcacao);
                localStorage.setItem("sos_marcacoes", JSON.stringify(casosSalvos));
                
                // 5. FEEDBACK AO USUÁRIO E LIMPEZA
                alert("MARCAÇÃO REGISTRADA E SALVA COM SUCESSO!");
                modal.style.display = "none";
                formReportar.reset();
            });
        }
    }
}

// INICIALIZA A CLASSE QUANDO O HTML CARREGAR
document.addEventListener("DOMContentLoaded", () => {
    window.reportApp = new ReportManager();
});