// Variável global para rastrear qual ocorrência está aberta no painel lateral
let ocorrenciaSelecionadaId = null;

// UNIFICAMOS A FUNÇÃO DE AÇÃO (Água/Comida)
async function executarAcao(tipoAcao, btnElement) {
    if (!ocorrenciaSelecionadaId) {
        alert('Selecione um animal no mapa ou na lista primeiro!');
        return;
    }

    // Pegamos o token de segurança gerado pelo @Html.AntiForgeryToken()
    const tokenInput = document.querySelector('input[name="__RequestVerificationToken"]');
    const token = tokenInput ? tokenInput.value : '';

    const formData = new FormData();
    formData.append('id', ocorrenciaSelecionadaId);
    formData.append('tipoAcao', tipoAcao);
    if (token) formData.append('__RequestVerificationToken', token);

    try {
        const response = await fetch('/Ocorrencias/RegistrarAcao', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();

        if (result.success) {
            // Atualiza o nome do usuário na sidebar
            const elUser = document.getElementById('sidebar-user-id');
            if (elUser) elUser.innerText = result.nomeUsuario;

            // Lógica isolada para ÁGUA
            if (tipoAcao === 'agua') {
                const elAgua = document.getElementById('sidebar-last-agua');
                if (elAgua) elAgua.innerText = result.dataStr;

                if (btnElement) {
                    btnElement.classList.add('btn-animacao-agua');
                    setTimeout(() => btnElement.classList.remove('btn-animacao-agua'), 2000);
                }
            }
            // Lógica isolada para COMIDA
            else if (tipoAcao === 'comida') {
                const elComida = document.getElementById('sidebar-last-comida');
                if (elComida) elComida.innerText = result.dataStr;

                if (btnElement) {
                    btnElement.classList.add('btn-animacao-comida');
                    setTimeout(() => btnElement.classList.remove('btn-animacao-comida'), 2000);
                }
            }

            // Atualiza os atributos no Card original (na lista esquerda)
            const cardOriginal = document.querySelector(`.case-card[data-id='${ocorrenciaSelecionadaId}']`);
            if (cardOriginal) {
                if (tipoAcao === 'agua') {
                    cardOriginal.setAttribute('data-agua', result.dataStr);
                } else {
                    cardOriginal.setAttribute('data-comida', result.dataStr);
                }
                cardOriginal.setAttribute('data-ultimo-user', result.nomeUsuario);
            }
        } else {
            alert(result.message || 'Erro ao registrar ação. Tem certeza que está logado?');
        }
    } catch (error) {
        console.error("Erro ao registrar ação:", error);
        alert('Não foi possível registrar a ação.');
    }
}

document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // 1. ENVIO DE COMENTÁRIOS (FORM AJAX)
    // ==========================================
    const formComentario = document.getElementById('form-comentario-sidebar');
    if (formComentario) {
        formComentario.addEventListener('submit', async function (e) {
            e.preventDefault();

            if (!ocorrenciaSelecionadaId) {
                alert('Selecione uma ocorrência antes de comentar.');
                return;
            }

            const inputTexto = this.querySelector('.comment-input');
            const btnSubmit = this.querySelector('button[type="submit"]');
            const formData = new FormData(this);

            // Garante que o ID da ocorrência está no FormData
            formData.set('idOcorrencia', ocorrenciaSelecionadaId);

            try {
                if (btnSubmit) btnSubmit.disabled = true;

                const response = await fetch(this.action, {
                    method: this.method,
                    body: formData,
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest' // Identifica para o C# que é AJAX
                    }
                });

                if (response.ok) {
                    inputTexto.value = ''; // Limpa o campo instantaneamente
                    carregarComentarios(ocorrenciaSelecionadaId); // Recarrega a lista
                } else if (response.status === 401) {
                    alert("Você precisa estar logado para comentar.");
                } else {
                    // Aqui é onde o alert aparecia indevidamente
                    console.error("Erro no servidor:", response.status);
                }
            } catch (error) {
                console.error('Erro ao enviar comentário:', error);
            } finally {
                if (btnSubmit) btnSubmit.disabled = false;
            }
        });
    }

    // ==========================================
    // 2. LÓGICA DO MAPA - MODAL DE OCORRÊNCIAS
    // ==========================================
    const modalOcorrenciaElement = document.getElementById('modalOcorrencia');
    let mapPicker;
    let marker;

    if (modalOcorrenciaElement) {
        modalOcorrenciaElement.addEventListener('shown.bs.modal', function () {
            if (!mapPicker) {
                mapPicker = L.map('mapPicker').setView([-19.9167, -43.9333], 12);
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 19,
                    attribution: '© OpenStreetMap'
                }).addTo(mapPicker);

                mapPicker.on('click', function (e) {
                    const lat = e.latlng.lat;
                    const lng = e.latlng.lng;
                    if (marker) {
                        marker.setLatLng(e.latlng);
                    } else {
                        marker = L.marker(e.latlng).addTo(mapPicker);
                    }
                    document.getElementById('lat').value = lat;
                    document.getElementById('lng').value = lng;
                });
            }
            setTimeout(() => { mapPicker.invalidateSize(); }, 100);
        });
    }

    // ==========================================
    // 3. LÓGICA DE DETALHES (CLIQUE NOS CARDS)
    // ==========================================
    const cards = document.querySelectorAll('.case-card');
    const painelDetalhes = document.getElementById('painel-detalhes');
    const btnEditar = document.getElementById('btn-editar-ocorrencia');

    cards.forEach(card => {
        card.addEventListener('click', function () {
            if (painelDetalhes) painelDetalhes.style.display = 'flex';

            ocorrenciaSelecionadaId = this.dataset.id;

            // ATUALIZA O INPUT HIDDEN PARA O SISTEMA DE COMENTÁRIOS
            const hiddenId = document.getElementById('comentario-id-ocorrencia');
            if (hiddenId) hiddenId.value = ocorrenciaSelecionadaId;

            carregarComentarios(ocorrenciaSelecionadaId);

            const horaAgua = this.getAttribute('data-agua') || "--:--";
            const horaComida = this.getAttribute('data-comida') || "--:--";
            const ultimoUser = this.getAttribute('data-ultimo-user') || "Nenhum";

            const elAgua = document.getElementById('sidebar-last-agua');
            if (elAgua) elAgua.innerText = horaAgua;

            const elComida = document.getElementById('sidebar-last-comida');
            if (elComida) elComida.innerText = horaComida;

            const elSidebarUser = document.getElementById('sidebar-user-id');
            if (elSidebarUser) elSidebarUser.innerText = ultimoUser;

            const idCodigo = this.dataset.codigo || `ID #${this.dataset.id}`;
            const sexo = this.dataset.sexo || 'Não informado';
            const cor = this.dataset.cor || 'Não informada';
            const porte = this.dataset.porte || 'Não informado';
            const sociabilidade = this.dataset.estadoSaude || 'Não informada';
            const idade = this.dataset.idade || 'Não informada';

            // NOVA LÓGICA DE IMAGEM PARA A SIDEBAR
            const fotoString = this.dataset.foto; // Pega exatamente a string do banco de dados (URL ou Base64)
            const sidebarFoto = document.getElementById('sidebar-foto');
            const avisoSemFoto = document.querySelector('.aviso-sem-foto');

            if (sidebarFoto && avisoSemFoto) {
                if (fotoString && fotoString.trim() !== '') {
                    // Se o animal TIVER foto: joga o src, mostra a imagem e esconde o aviso
                    sidebarFoto.src = fotoString;
                    sidebarFoto.style.display = 'block';
                    avisoSemFoto.style.display = 'none';
                } else {
                    // Se o animal NÃO TIVER foto: limpa o src, esconde a imagem e mostra o aviso
                    sidebarFoto.src = '';
                    sidebarFoto.style.display = 'none';
                    avisoSemFoto.style.display = 'flex';
                }
            }

            const sidebarTituloId = document.getElementById('sidebar-titulo-id');
            if (sidebarTituloId) sidebarTituloId.innerText = idCodigo;

            const sidebarSexo = document.getElementById('sidebar-sexo');
            if (sidebarSexo) sidebarSexo.innerText = sexo;

            const sidebarCor = document.getElementById('sidebar-cor');
            if (sidebarCor) sidebarCor.innerText = cor;

            const sidebarPorte = document.getElementById('sidebar-porte');
            if (sidebarPorte) sidebarPorte.innerText = porte;

            const sidebarSociabilidade = document.getElementById('sidebar-sociabilidade');
            if (sidebarSociabilidade) sidebarSociabilidade.innerText = sociabilidade;

            const sidebarIdade = document.getElementById('sidebar-idade');
            if (sidebarIdade) sidebarIdade.innerText = idade;

            const dashboardContainer = document.querySelector('.dashboard-container');
            const formDeletar = document.getElementById('form-deletar-sidebar');

            if (dashboardContainer && formDeletar) {
                const currentUserId = dashboardContainer.dataset.userId;
                const donoOcorrenciaId = this.dataset.usuario;

                if (currentUserId && currentUserId === donoOcorrenciaId) {
                    formDeletar.style.display = 'block';
                    formDeletar.action = `/Ocorrencias/Delete/${ocorrenciaSelecionadaId}`;
                } else {
                    formDeletar.style.display = 'none';
                }
            }

            cards.forEach(c => c.classList.remove('border', 'border-success', 'bg-light', 'active-card'));
            this.classList.add('border', 'border-success', 'bg-light', 'active-card');
        });
    });

    // ==========================================
    // 4. LÓGICA DO BOTÃO EDITAR
    // ==========================================
    if (btnEditar) {
        btnEditar.addEventListener('click', function () {
            if (this.classList.contains('auth-required')) return;

            if (ocorrenciaSelecionadaId) {
                fetch(`/Ocorrencias/Edit/${ocorrenciaSelecionadaId}`)
                    .then(response => {
                        if (response.status === 401) {
                            const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
                            loginModal.show();
                            throw new Error("Login necessário.");
                        }
                        if (!response.ok) throw new Error("Erro ao carregar os dados.");
                        return response.text();
                    })
                    .then(html => {
                        document.getElementById('editModalContainer').innerHTML = html;
                        const modalEditElement = document.getElementById('modalEditarOcorrencia');
                        const modalEdit = new bootstrap.Modal(modalEditElement);
                        modalEdit.show();
                    })
                    .catch(error => {
                        console.error(error);
                        alert("Não foi possível carregar a edição.");
                    });
            } else {
                alert("Por favor, selecione uma ocorrência primeiro.");
            }
        });
    }
});

// ==========================================
// FUNÇÃO GLOBAL DE CARREGAR COMENTÁRIOS
// ==========================================
function carregarComentarios(idOcorrencia) {
    fetch(`/Comentarios/ListarPorOcorrencia?ocorrenciaId=${idOcorrencia}`)
        .then(response => response.json())
        .then(comentarios => {
            const container = document.getElementById('comentarios-container');
            container.innerHTML = ''; // Limpa os comentários antigos

            comentarios.forEach(c => {
                container.innerHTML += `
                    <div class="comentario-item mb-3">
                        <div class="d-flex align-items-center mb-1">
                            <img src="${c.usuarioFoto}" class="rounded-circle me-2" width="30" height="30">
                            <strong>${c.usuarioNome}</strong>
                            <small class="text-muted ms-auto">${c.data}</small>
                        </div>
                        <p class="mb-0 text-break">${c.texto}</p>
                    </div>
                `;
            });
        });
}