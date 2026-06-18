// Variável global para rastrear qual ocorrência está aberta no painel lateral
let ocorrenciaSelecionadaId = null;

// Formato padrão: 01/06 19:14
function formatarDataAcao(dataStr) {
    if (!dataStr || dataStr === '--:--') return '--:--';

    // Se já vier no formato curto (dd/MM/aa HH:mm), retorna direto
    if (/^\d{2}\/\d{2}\/\d{2} \d{2}:\d{2}$/.test(dataStr)) return dataStr;

    // Tenta converter qualquer formato para dd/MM/aa HH:mm
    const date = new Date(dataStr);
    if (!isNaN(date)) {
        const dia = String(date.getDate()).padStart(2, '0');
        const mes = String(date.getMonth() + 1).padStart(2, '0');
        const ano = String(date.getFullYear()).slice(-2);
        const hora = String(date.getHours()).padStart(2, '0');
        const min = String(date.getMinutes()).padStart(2, '0');
        return `${dia}/${mes}/${ano} ${hora}:${min}`;
    }

    // Se vier como "01/06/2026 19:14:22", extrai e converte
    const match = dataStr.match(/(\d{2})\/(\d{2})\/(\d{2,4}) (\d{2}):(\d{2})/);
    if (match) {
        const ano = match[3].slice(-2);
        return `${match[1]}/${match[2]}/${ano} ${match[4]}:${match[5]}`;
    }

    return dataStr;
}

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
                if (elAgua) {
                    elAgua.textContent = formatarDataAcao(result.dataStr);
                    elAgua.style.cssText = 'white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;';

                }

                if (btnElement) {
                    btnElement.classList.add('btn-animacao-agua');
                    setTimeout(() => btnElement.classList.remove('btn-animacao-agua'), 2000);
                }
            }
            // Lógica isolada para COMIDA
            else if (tipoAcao === 'comida') {
                const elComida = document.getElementById('sidebar-last-comida');
                if (elComida) {
                    elComida.textContent = formatarDataAcao(result.dataStr);
                    elComida.style.cssText = 'white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;';
                }

                if (btnElement) {
                    btnElement.classList.add('btn-animacao-comida');
                    setTimeout(() => btnElement.classList.remove('btn-animacao-comida'), 2000);
                }
            }

            // Atualiza os atributos no Card original (na lista esquerda)
            const cardOriginal = document.querySelector(`.case-card[data-id='${ocorrenciaSelecionadaId}']`);
            if (cardOriginal) {
                if (tipoAcao === 'agua') {
                    cardOriginal.setAttribute('data-agua', formatarDataAcao(result.dataStr));
                } else {
                    cardOriginal.setAttribute('data-comida', formatarDataAcao(result.dataStr));
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
    // 3. LÓGICA DE DETALHES (CLIQUE NOS CARDS DA LISTA E DO CARROSSEL)
    // ==========================================
    // Seleciona tanto os cards da lista lateral quanto os cards do carrossel do feed
    const todosOsCards = document.querySelectorAll('.case-card, .animal-card');

    todosOsCards.forEach(card => {
        card.addEventListener('click', function () {
            const idOcorrencia = this.dataset.id;

            // Invoca a função centralizada que resolve tudo de forma idêntica ao Mapa
            if (typeof focusCard === 'function') {
                focusCard(idOcorrencia);
            }

            if (window.innerWidth <= 991) {
                abrirPerfilAnimal();
            }
        });
    });

    // ==========================================
    // 4. LÓGICA DO BOTÃO EDITAR
    // ==========================================

    // 👇 ADICIONE ESTA LINHA PARA CAPTURAR O BOTÃO 👇
    const btnEditar = document.getElementById('btn-editar-ocorrencia');

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

// ==========================================================
// FUNÇÕES DE CONTROLE DA EXCLUSÃO DE OCORRÊNCIA
// ==========================================================

/**
 * Controla se o ícone de lixeira deve ou não aparecer na barra lateral.
 * Chame esta função sempre que preencher/abrir a sidebar com uma ocorrência.
 * @param {string|number} idCriadorOcorrencia - ID do usuário que criou a ocorrência atual.
 */
function gerenciarVisibilidadeBotaoDeletar(idCriadorOcorrencia) {
    const containerAcoes = document.getElementById('header-acoes-ocorrencia');
    const btnDeletar = document.getElementById('btn-deletar-ocorrencia');

    if (!containerAcoes || !btnDeletar) return;

    // Recupera o ID do usuário logado diretamente do atributo HTML data-* que definimos no cshtml
    const usuarioLogadoId = containerAcoes.dataset.usuarioLogado;

    // Se o usuário estiver logado e for o criador desta ocorrência específica, mostra o botão
    if (usuarioLogadoId && String(idCriadorOcorrencia) === String(usuarioLogadoId)) {
        btnDeletar.style.display = 'inline-block';
    } else {
        btnDeletar.style.display = 'none';
    }
}

// Ouvinte de eventos para quando o documento HTML terminar de carregar
document.addEventListener("DOMContentLoaded", function () {
    const btnDeletar = document.getElementById('btn-deletar-ocorrencia');

    if (btnDeletar) {
        btnDeletar.addEventListener('click', function () {
            // 'ocorrenciaSelecionadaId' é a sua variável global já existente que guarda o ID ativo
            if (!ocorrenciaSelecionadaId) {
                alert('Nenhuma ocorrência selecionada.');
                return;
            }

            const confirmar = confirm('Tem certeza de que deseja excluir permanentemente esta ocorrência? Todos os comentários vinculados a ela também serão deletados!');

            if (confirmar) {
                const form = document.getElementById('form-deletar-ocorrencia');
                const inputId = document.getElementById('deletar-ocorrencia-id');

                if (form && inputId) {
                    // Define o ID no input e submete o formulário nativo com o AntiForgeryToken
                    inputId.value = ocorrenciaSelecionadaId;
                    form.submit();
                }
            }
        });
    }
});

// ==========================================
// FUNÇÕES DO DRAWER / BOTTOM SHEET (MOBILE)
// ==========================================

window.abrirPerfilAnimal = function () {
    const sidebar = document.getElementById('painel-detalhes');
    const overlay = document.getElementById('drawerOverlay');

    if (sidebar) {
        sidebar.style.display = ''; // Remove o display: none inline se existir
        sidebar.classList.add('drawer-open');
    }
    if (overlay) {
        overlay.classList.add('active');
    }

    // Trava o scroll da página de fundo para melhorar a usabilidade no mobile
    document.body.style.overflow = 'hidden';
};

window.fecharPerfilAnimal = function () {
    const sidebar = document.getElementById('painel-detalhes');
    const overlay = document.getElementById('drawerOverlay');

    if (sidebar) {
        sidebar.classList.remove('drawer-open');
    }
    if (overlay) {
        overlay.classList.remove('active');
    }

    // Libera o scroll da página de fundo
    document.body.style.overflow = '';
};