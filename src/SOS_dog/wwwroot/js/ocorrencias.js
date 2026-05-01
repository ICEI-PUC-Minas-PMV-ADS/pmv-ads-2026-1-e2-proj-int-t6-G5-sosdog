// Variável global para rastrear qual ocorrência está aberta no painel lateral
let ocorrenciaSelecionadaId = null;

function executarAcao(tipo, btnElement) {
    if (!ocorrenciaSelecionadaId) {
        alert("Selecione um animal no mapa ou na lista primeiro!");
        return;
    }

    // Envia para o servidor
    fetch(`/Ocorrencias/RegistrarAcao`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `id=${ocorrenciaSelecionadaId}&tipoAcao=${tipo}`
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {

                // Lógica isolada para ÁGUA
                if (data.tipo === 'agua') {
                    const elAgua = document.getElementById('sidebar-last-agua');
                    if (elAgua) elAgua.innerText = data.dataStr;

                    // Feedback visual: O botão "acende" por 2 segundos
                    if (btnElement) {
                        btnElement.classList.add('btn-animacao-agua');
                        setTimeout(() => btnElement.classList.remove('btn-animacao-agua'), 2000);
                    }
                }
                // Lógica isolada para COMIDA
                else if (data.tipo === 'comida') {
                    const elComida = document.getElementById('sidebar-last-comida');
                    if (elComida) elComida.innerText = data.dataStr;

                    // Feedback visual: O botão "acende" por 2 segundos
                    if (btnElement) {
                        btnElement.classList.add('btn-animacao-comida');
                        setTimeout(() => btnElement.classList.remove('btn-animacao-comida'), 2000);
                    }
                }

                // Atualiza o usuário que fez a ação na sidebar
                const elUser = document.getElementById('sidebar-user-id');
                if (elUser) elUser.innerText = data.nomeUsuario;

                // ========================================================
                // NOVO: Atualiza os atributos no Card original (na lista esquerda)
                // ========================================================
                const cardOriginal = document.querySelector(`.case-card[data-id='${ocorrenciaSelecionadaId}']`);
                if (cardOriginal) {
                    if (data.tipo === 'agua') {
                        cardOriginal.setAttribute('data-agua', data.dataStr);
                    } else {
                        cardOriginal.setAttribute('data-comida', data.dataStr);
                    }

                    // IMPORTANTE: Atualiza também o nome do cuidador no card!
                    cardOriginal.setAttribute('data-ultimo-user', data.nomeUsuario);
                }
            }
        })
        .catch(error => {
            console.error("Erro ao registrar ação:", error);
        });
}

document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // 1. LÓGICA DO MAPA - MODAL DE OCORRÊNCIAS
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
    // 2. LÓGICA DE DETALHES (SIDEBAR DIREITA)
    // ==========================================
    const cards = document.querySelectorAll('.case-card');
    const painelDetalhes = document.getElementById('painel-detalhes');
    const btnEditar = document.getElementById('btn-editar-ocorrencia');

    cards.forEach(card => {
        card.addEventListener('click', function () {
            if (painelDetalhes) painelDetalhes.style.display = 'flex';

            // Salva o ID da ocorrência clicada
            ocorrenciaSelecionadaId = this.dataset.id;

            carregarComentarios(ocorrenciaSelecionadaId);

            // 1. Pega os dados públicos que injetamos no HTML via Razor
            const horaAgua = this.getAttribute('data-agua') || "--:--";
            const horaComida = this.getAttribute('data-comida') || "--:--";
            const ultimoUser = this.getAttribute('data-ultimo-user') || "Nenhum";

            // 2. Atualiza os campos de Ações (Água, Comida e Cuidador)
            const elAgua = document.getElementById('sidebar-last-agua');
            if (elAgua) elAgua.innerText = horaAgua;

            const elComida = document.getElementById('sidebar-last-comida');
            if (elComida) elComida.innerText = horaComida;

            const elSidebarUser = document.getElementById('sidebar-user-id');
            if (elSidebarUser) elSidebarUser.innerText = ultimoUser;

            // 3. Pega os dados do Perfil do Animal
            const idCodigo = this.dataset.codigo || `ID #${this.dataset.id}`;
            const sexo = this.dataset.sexo || 'Não informado';
            const cor = this.dataset.cor || 'Não informada';
            const porte = this.dataset.porte || 'Não informado';
            const sociabilidade = this.dataset.sociabilidade || 'Não informada';
            const idade = this.dataset.idade || 'Não informada';

            const imgElement = this.querySelector('img');
            const imgSrc = imgElement ? imgElement.src : '/img/placeholder-dog.png';

            // 4. Injeta os dados do Perfil no HTML
            const sidebarTituloId = document.getElementById('sidebar-titulo-id');
            if (sidebarTituloId) sidebarTituloId.innerText = idCodigo;

            const sidebarFoto = document.getElementById('sidebar-foto');
            if (sidebarFoto) sidebarFoto.src = imgSrc;

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
                // Pega o ID do usuário logado (está na div principal)
                const currentUserId = dashboardContainer.dataset.userId;

                // Pega o ID de quem criou essa ocorrência (está no card clicado)
                const donoOcorrenciaId = this.dataset.usuario;

                // Se o usuário estiver logado e for o dono, mostra a lixeirinha
                if (currentUserId && currentUserId === donoOcorrenciaId) {
                    formDeletar.style.display = 'block';
                    // Atualiza a action do formulário para deletar a ocorrência certa
                    formDeletar.action = `/Ocorrencias/Delete/${ocorrenciaSelecionadaId}`;
                } else {
                    // Se não for o dono, esconde a lixeirinha
                    formDeletar.style.display = 'none';
                }
            }

            // Destaque visual do card
            cards.forEach(c => c.classList.remove('border', 'border-success', 'bg-light'));
            this.classList.add('border', 'border-success', 'bg-light');
        });
    });

    // Evento para o botão de enviar comentário (ícone de avião)
    const btnEnviar = document.getElementById('btn-enviar-comentario');
    if (btnEnviar) {
        btnEnviar.addEventListener('click', enviarComentario);
    }

    // Permitir enviar com "Enter" no teclado dentro do campo de texto
    const inputComentario = document.getElementById('txt-comentario');
    if (inputComentario) {
        inputComentario.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                enviarComentario();
            }
        });
    }

    // ==========================================
    // 3. LÓGICA DO BOTÃO EDITAR
    // ==========================================
    if (btnEditar) {
        btnEditar.addEventListener('click', function () {
            if (this.classList.contains('auth-required')) return;

            if (ocorrenciaSelecionadaId) {

                // 1. Em vez de sair da página, fazemos uma requisição "escondida" (AJAX)
                fetch(`/Ocorrencias/Edit/${ocorrenciaSelecionadaId}`)
                    .then(response => {
                        if (response.status === 401) {
                            const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
                            loginModal.show();
                            throw new Error("Login necessário.");
                        }
                        if (!response.ok) {
                            throw new Error("Erro ao carregar os dados. Você tem permissão?");
                        }
                        // Pega o HTML cru que o Controller devolveu (a PartialView)
                        return response.text();
                    })
                    .then(html => {
                        // 2. Injeta esse HTML dentro daquela div vazia no seu Index.cshtml
                        document.getElementById('editModalContainer').innerHTML = html;

                        // 3. Avisa ao Bootstrap que isso é um modal e manda abrir!
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

    // --- FUNÇÕES DE COMENTÁRIOS ---

    function carregarComentarios(ocorrenciaId) {
        const lista = document.getElementById('lista-comentarios');
        lista.innerHTML = '<p class="text-center mt-3"><i class="fa-solid fa-spinner fa-spin"></i> Carregando...</p>';

        fetch(`/Comentarios/ListarPorOcorrencia?ocorrenciaId=${ocorrenciaId}`)
            .then(response => response.json())
            .then(comentarios => {
                lista.innerHTML = ''; // Limpa o carregando

                if (comentarios.length === 0) {
                    lista.innerHTML = '<p class="text-muted small text-center mt-3">Nenhum comentário ainda. Seja o primeiro!</p>';
                    return;
                }

                comentarios.forEach(c => {
                    lista.innerHTML += `
                    <div class="comment-item">
                        <img src="${c.usuarioFoto || '/img/placeholder-user.png'}" alt="${c.usuarioNome}" class="avatar-sm">
                        <div class="comment-content">
                            <p><strong>${c.usuarioNome}:</strong> ${c.texto}</p>
                            <small class="text-muted" style="font-size: 10px;">${c.data}</small>
                        </div>
                    </div>`;
                });
            })
            .catch(error => {
                console.error('Erro ao carregar comentários:', error);
                lista.innerHTML = '<p class="text-danger small text-center mt-3">Erro ao carregar comentários.</p>';
            });
    }

    function enviarComentario() {
        const input = document.getElementById('txt-comentario');
        const texto = input.value.trim();

        if (!ocorrenciaSelecionadaId) {
            alert("Selecione uma ocorrência primeiro!");
            return;
        }

        if (!texto) return;

        const btn = document.getElementById('btn-enviar-comentario');
        btn.disabled = true;

        fetch(`/Comentarios/AdicionarComentario`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `ocorrenciaId=${ocorrenciaSelecionadaId}&texto=${encodeURIComponent(texto)}`
        })
            .then(response => {
                if (response.status === 401) {
                    alert("Você precisa estar logado para comentar.");
                    const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
                    loginModal.show();
                    throw new Error("Não autorizado");
                }
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    input.value = ''; // Limpa o campo
                    carregarComentarios(ocorrenciaSelecionadaId); // Recarrega a lista para mostrar o novo
                }
            })
            .finally(() => {
                btn.disabled = false;
            });
    }

});