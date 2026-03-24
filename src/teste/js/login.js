document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.getElementById("loginBtn");

    // Chama a função para alterar a tela caso o usuário já esteja logado
    verificarEstadoLogin();

    // =========================================================
    // INTERCEPTADOR DE CLIQUES (BLOQUEIO PARA NÃO LOGADOS)
    // =========================================================
    // O 'true' no final faz com que ele intercepte o clique ANTES de qualquer outra função
    document.body.addEventListener("click", (e) => {
        // Verifica se o que foi clicado é um link, botão ou ícone de ação (como curtir/salvar)
        const elementoClicado = e.target.closest("button, a, .feed-actions i, .edit-icon");

        // Se não clicou em nada interativo, deixa passar normal
        if (!elementoClicado) return;

        // Se o clique for no botão de login ou dentro do próprio modal de login, deixa passar
        if (elementoClicado.id === "loginBtn" || elementoClicado.closest("#loginModal")) {
            return;
        }

        // Verifica se o usuário está logado
        const isLogado = localStorage.getItem("sos_logado") === "true";

        if (!isLogado) {
            e.preventDefault(); // Impede que o link mude de página
            e.stopPropagation(); // Impede que a ação do botão aconteça

            // Se não estiver logado, "força" um clique no botão de abrir o modal
            if (loginBtn) {
                loginBtn.click();
            }
        }
    }, true); 


    // =========================================================
    // LÓGICA DE ABERTURA DO MODAL
    // =========================================================
    if (loginBtn) {
        loginBtn.addEventListener("click", async (e) => {
            e.preventDefault(); 

            // 1. Verifica se o modal já está na tela para não injetar duas vezes
            let loginModal = document.getElementById("loginModal");

            if (!loginModal) {
                try {
                    // 2. Busca o arquivo HTML (Caminho relativo ao index.html)
                    const response = await fetch("./pages/loginModal.html");
                    
                    if (!response.ok) {
                        throw new Error("Erro ao carregar o arquivo do modal");
                    }

                    const html = await response.text();

                    // 3. Cria uma div temporária para converter o texto em HTML
                    const tempDiv = document.createElement("div");
                    tempDiv.innerHTML = html;

                    // 4. Joga o conteúdo do modal para o final do <body>
                    document.body.appendChild(tempDiv.firstElementChild);

                    // Atualiza a variável agora que o modal existe
                    loginModal = document.getElementById("loginModal");

                    // 5. Liga as funções dos botões internos do modal (Login e Cadastro)
                    iniciarEventosDoModal();

                } catch (error) {
                    console.error("Falha ao injetar o modal:", error);
                    return; 
                }
            }

            // 6. Mostra o modal na tela
            loginModal.style.display = "flex"; 
        });
    }
});

// =========================================================
// FUNÇÕES INTERNAS DO MODAL (LOGIN E CADASTRO)
// =========================================================
function iniciarEventosDoModal() {
    const loginModal = document.getElementById("loginModal");
    const closeModal = document.getElementById("closeModal");
    const formLoginBox = document.getElementById("formLoginBox");
    const formRegisterBox = document.getElementById("formRegisterBox");
    const showRegisterLink = document.getElementById("showRegister");
    const showLoginLink = document.getElementById("showLogin");

    // Fecha ao clicar no X
    if (closeModal) {
        closeModal.addEventListener("click", () => {
            loginModal.style.display = "none";
        });
    }

    // Fecha ao clicar fora da caixa branca (no fundo escuro)
    window.addEventListener("click", (e) => {
        if (e.target === loginModal) {
            loginModal.style.display = "none";
        }
    });

    // Alternar para Cadastro
    if (showRegisterLink) {
        showRegisterLink.addEventListener("click", (e) => {
            e.preventDefault();
            formLoginBox.style.display = "none";
            formRegisterBox.style.display = "block";
        });
    }

    // Alternar para Login
    if (showLoginLink) {
        showLoginLink.addEventListener("click", (e) => {
            e.preventDefault();
            formRegisterBox.style.display = "none";
            formLoginBox.style.display = "block";
        });
    }

    // --- LÓGICA DE CADASTRO ---
    const formAcaoCadastro = document.getElementById('formAcaoCadastro');
    const perfilBtns = document.querySelectorAll('.btn-perfil');
    let perfilSelecionado = '';
    
    if (perfilBtns.length > 0) {
        perfilBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                perfilBtns.forEach(b => b.style.opacity = '0.4'); 
                btn.style.opacity = '1'; 
                perfilSelecionado = btn.textContent.trim(); 
            });
        });
    }

    if (formAcaoCadastro) {
        formAcaoCadastro.addEventListener('submit', function (e) {
            e.preventDefault();
            const nome = document.getElementById('cadNome').value;
            const email = document.getElementById('cadEmail').value;
            const senha = document.getElementById('cadSenha').value;
            const confirmaSenha = document.getElementById('cadConfirmaSenha').value;

            if (senha !== confirmaSenha) { 
                alert('Erro: As senhas não coincidem!'); 
                return; 
            }

            const novoUsuario = { nome: nome, email: email, senha: senha, perfil: perfilSelecionado };
            localStorage.setItem('sos_usuario', JSON.stringify(novoUsuario));
            localStorage.setItem('sos_logado', 'true');

            loginModal.style.display = "none";
            location.reload(); 
        });
    }

    // --- LÓGICA DE LOGIN ---
    const formAcaoLogin = document.getElementById('formAcaoLogin');
    if (formAcaoLogin) {
        formAcaoLogin.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailDigitado = document.getElementById('loginEmail').value;
            const senhaDigitada = document.getElementById('loginSenha').value;
            
            let usuarioSalvo = null;
            try { usuarioSalvo = JSON.parse(localStorage.getItem('sos_usuario')); } catch(err) {}

            // Verifica o usuário cadastrado ou o usuário de teste
            if (usuarioSalvo && usuarioSalvo.email === emailDigitado && usuarioSalvo.senha === senhaDigitada) {
                localStorage.setItem('sos_logado', 'true');
                loginModal.style.display = "none";
                location.reload();
            } else if (emailDigitado === 'teste@portal.com' && senhaDigitada === '123456') {
                localStorage.setItem('sos_logado', 'true');
                localStorage.setItem('sos_usuario', JSON.stringify({ nome: 'Ozias Souza', email: emailDigitado }));
                loginModal.style.display = "none";
                location.reload(); 
            } else {
                alert('E-mail ou senha incorretos!');
            }
        });
    }
}

// =========================================================
// VERIFICAÇÃO DE ESTADO DE LOGIN NA TELA PRINCIPAL
// =========================================================
async function verificarEstadoLogin() {
    const isLogado = localStorage.getItem("sos_logado") === "true";
    
    // Pega os elementos atuais da tela
    const btnLogin = document.querySelector(".btnLogin"); // Botão de login/cadastrar
    const userMenuContainer = document.getElementById("userMenuContainer"); // Container vazio no header
    const sidebarAtual = document.querySelector(".right-sidebar.dog-profile-sidebar"); // Sidebar do cachorro

    if (isLogado) {
        // 1. Esconde o botão de Login
        if (btnLogin) {
            btnLogin.style.display = "none";
        }

        try {
            // 2. Busca o arquivo HTML que contém os elementos de usuário logado
            const response = await fetch("./pages/logadoModal.html");
            
            if (!response.ok) throw new Error("Erro ao carregar logadoModal.html");
            
            const htmlText = await response.text();
            
            // Cria uma div temporária para podermos "recortar" os pedaços do HTML
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = htmlText;

            // 3. Pega o menu do usuário (div class="user-menu") e injeta no header
            const novoUserMenu = tempDiv.querySelector(".user-menu");
            if (novoUserMenu && userMenuContainer) {
                userMenuContainer.innerHTML = novoUserMenu.innerHTML;
                
                // Opcional: Você pode pegar os dados do localStorage para trocar o Nome e @ do usuário na tela
                const usuarioSalvo = JSON.parse(localStorage.getItem('sos_usuario'));
                if (usuarioSalvo && usuarioSalvo.nome) {
                    const nomeElement = userMenuContainer.querySelector(".user-info strong");
                    if (nomeElement) nomeElement.textContent = usuarioSalvo.nome;
                    const nomeElementspan = userMenuContainer.querySelector(".user-info span");
                    if (nomeElementspan) nomeElementspan.textContent = `@${usuarioSalvo.nome}`;
                }
            }

            // 4. Pega a nova sidebar (aside class="right-sidebar") e substitui a do cachorro
            const novaSidebar = tempDiv.querySelector("aside.right-sidebar");
            if (novaSidebar && sidebarAtual) {
                // Substitui o HTML interno
                sidebarAtual.innerHTML = novaSidebar.innerHTML;
                // Atualiza as classes para remover 'dog-profile-sidebar' e não quebrar o CSS
                sidebarAtual.className = novaSidebar.className; 
            }

        } catch (error) {
            console.error("Erro ao alterar a interface para usuário logado:", error);
        }
    }
}

// =========================================================
// FUNÇÃO DE LOGOUT GERAL
// =========================================================
window.fazerLogoutGeral = function() {
    // Remove o status de logado
    localStorage.removeItem("sos_logado");

    // Atualiza a página para voltar ao estado normal (deslogado)
    window.location.reload();
};