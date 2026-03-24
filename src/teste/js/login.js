document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.getElementById("loginBtn");

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
    // LÓGICA DE ABERTURA DO MODAL (SEU CÓDIGO ORIGINAL)
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