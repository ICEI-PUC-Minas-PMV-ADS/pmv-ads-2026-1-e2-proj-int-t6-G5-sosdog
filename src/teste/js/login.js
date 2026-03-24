// ==========================================
// 1. MÓDULO DE SERVIÇOS DE USUÁRIO
// ==========================================
const UserService = {
    isLogado: () => localStorage.getItem("sos_logado") === "true",
    
    getDados: () => {
        try {
            return JSON.parse(localStorage.getItem('sos_usuario')) || {};
        } catch (error) {
            console.error("ERRO AO PARSEAR DADOS DO USUÁRIO:", error);
            return { error: "ERRO AO CARREGAR DADOS DO USUÁRIO" };
        }
    },

    logout: () => {
        localStorage.removeItem("sos_logado");
        location.reload();
    },

    // BUSCA UM ARQUIVO HTML EXTERNO PELA URL E CONVERTE PARA UM ELEMENTO DOM
    async carregarFragmento(url) {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`ERRO AO CARREGAR: ${url}`);
        const html = await response.text();
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = html;
        return tempDiv;
    }
};

// ==========================================
// 2. GERENCIADOR DE AUTENTICAÇÃO E INTERFACE
// ==========================================
class AuthManager {
    constructor() {
        this.loginBtn = document.getElementById("loginBtn");
        this.perfilSelecionado = ''; // ESTADO DA CLASSE PARA O CADASTRO
        this.init();
    }

    init() {
        this.verificarEstadoLogin();
        this.setupInterceptadorCliques();
        this.setupBotaoLogin();
    }

    // INTERCEPTA CLIQUES EM BOTÕES DE AÇÃO SE O USUÁRIO NÃO ESTIVER LOGADO
    setupInterceptadorCliques() {
        document.body.addEventListener("click", (e) => this.lidarComCliqueGlobal(e), true);
    }

    lidarComCliqueGlobal(e) {
        const el = e.target.closest("button, a, .feed-actions i, .edit-icon");
        if (!el) return;

        // PERMITE CLIQUES NO PRÓPRIO SISTEMA DE LOGIN
        if (el.id === "loginBtn" || el.closest("#loginModal")) return;

        if (!UserService.isLogado()) {
            e.preventDefault();
            e.stopPropagation();
            this.loginBtn?.click(); // ABRE O MODAL DE LOGIN
        }
    }

    // CONFIGURA O BOTÃO QUE ABRE O MODAL DE LOGIN (INJEÇÃO DINÂMICA)
    setupBotaoLogin() {
        this.loginBtn?.addEventListener("click", async (e) => {
            e.preventDefault();
            let modal = document.getElementById("loginModal");

            if (!modal) {
                modal = await this.injetarModalNaTela();
            }
            modal.style.display = "flex";
        });
    }

    async injetarModalNaTela() {
        const fragmento = await UserService.carregarFragmento("./pages/loginModal.html");
        document.body.appendChild(fragmento.firstElementChild);
        this.iniciarEventosDoModal();
        return document.getElementById("loginModal");
    }

    // GERENCIA O QUE APARECE NA TELA (HEADER E SIDEBAR) BASEADO NO LOGIN
    async verificarEstadoLogin() {
        if (!UserService.isLogado()) return;

        const btnLoginNav = document.querySelector(".btnLogin");
        if (btnLoginNav) btnLoginNav.style.display = "none";

        try {
            const fragmento = await UserService.carregarFragmento("./pages/logadoModal.html");
            this.atualizarHeaderUsuario(fragmento);
            this.atualizarSidebarUsuario(fragmento);
        } catch (err) {
            console.error("ERRO AO ATUALIZAR INTERFACE LOGADA:", err);
        }
    }

    atualizarHeaderUsuario(fragmento) {
        const userMenuContainer = document.getElementById("userMenuContainer");
        const novoMenu = fragmento.querySelector(".user-menu");
        
        if (novoMenu && userMenuContainer) {
            const usuario = UserService.getDados();
            userMenuContainer.innerHTML = novoMenu.innerHTML;
            userMenuContainer.querySelector(".user-info strong").textContent = usuario.nome || "Usuário";
            userMenuContainer.querySelector(".user-info span").textContent = `@${usuario.nome || 'user'}`;
        }
    }

    atualizarSidebarUsuario(fragmento) {
        const sidebarAtual = document.querySelector(".right-sidebar.dog-profile-sidebar");
        const novaSidebar = fragmento.querySelector("aside.right-sidebar");
        
        if (novaSidebar && sidebarAtual) {
            sidebarAtual.innerHTML = novaSidebar.innerHTML;
            sidebarAtual.className = novaSidebar.className;
        }
    }

    // LÓGICA INTERNA DO MODAL (ALTERNÂNCIA ENTRE TELAS E EVENTOS GERAIS)
    iniciarEventosDoModal() {
        const modal = document.getElementById("loginModal");
        
        // FECHAMENTO DO MODAL
        modal.querySelector("#closeModal")?.addEventListener("click", () => modal.style.display = "none");
        window.addEventListener("click", (e) => { if (e.target === modal) modal.style.display = "none"; });

        // ALTERNAR ENTRE TELAS DE LOGIN E CADASTRO
        this.configurarAlternanciaTelas(modal);

        // SEPARA A LÓGICA DOS FORMULÁRIOS PARA REDUZIR COMPLEXIDADE
        this.setupSelecaoPerfil(modal);
        this.setupSubmitCadastro(modal);
        this.setupSubmitLogin(modal);
    }

    configurarAlternanciaTelas(modal) {
        const toggle = (showLogin) => {
            modal.querySelector("#formLoginBox").style.display = showLogin ? "block" : "none";
            modal.querySelector("#formRegisterBox").style.display = showLogin ? "none" : "block";
        };

        modal.querySelector("#showRegister")?.addEventListener("click", (e) => { e.preventDefault(); toggle(false); });
        modal.querySelector("#showLogin")?.addEventListener("click", (e) => { e.preventDefault(); toggle(true); });
    }

    // CONFIGURA OS BOTÕES DE SELEÇÃO DE PERFIL NO CADASTRO
    setupSelecaoPerfil(modal) {
        const botoesPerfil = modal.querySelectorAll('.btn-perfil');
        botoesPerfil.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                botoesPerfil.forEach(b => b.style.opacity = '0.4');
                btn.style.opacity = '1';
                this.perfilSelecionado = btn.textContent.trim();
            });
        });
    }

    // LIDA COM O ENVIO DO FORMULÁRIO DE CADASTRO
    setupSubmitCadastro(modal) {
        modal.querySelector('#formAcaoCadastro')?.addEventListener('submit', (e) => {
            e.preventDefault();
            const senha = modal.querySelector('#cadSenha').value;
            const confirmacao = modal.querySelector('#cadConfirmaSenha').value;
            
            if (senha !== confirmacao) return alert('SENHAS NÃO COINCIDEM!');

            const dados = { 
                nome: modal.querySelector('#cadNome').value, 
                email: modal.querySelector('#cadEmail').value, 
                senha: senha, 
                perfil: this.perfilSelecionado 
            };
            
            this.efetuarLogin(dados);
        });
    }

    // LIDA COM O ENVIO DO FORMULÁRIO DE LOGIN
    setupSubmitLogin(modal) {
        modal.querySelector('#formAcaoLogin')?.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = modal.querySelector('#loginEmail').value;
            const senha = modal.querySelector('#loginSenha').value;
            
            if (this.validarCredenciais(email, senha)) {
                const usuario = email === 'teste@portal.com' ? { nome: 'Ozias Souza', email } : null;
                this.efetuarLogin(usuario);
            } else {
                alert('CREDENCIAIS INCORRETAS!');
            }
        });
    }

    // CHECA SE AS CREDENCIAIS SÃO VÁLIDAS (USUÁRIO SALVO OU CONTA DE TESTE)
    validarCredenciais(emailDigitado, senhaDigitada) {
        const salvo = UserService.getDados();
        const isUsuarioSalvo = (salvo.email === emailDigitado && salvo.senha === senhaDigitada);
        const isContaTeste = (emailDigitado === 'teste@portal.com' && senhaDigitada === '123456');
        
        return isUsuarioSalvo || isContaTeste;
    }

    // FUNÇÃO REUTILIZÁVEL PARA SALVAR ESTADO E RECARREGAR
    efetuarLogin(dadosUsuario = null) {
        localStorage.setItem('sos_logado', 'true');
        if (dadosUsuario) {
            localStorage.setItem('sos_usuario', JSON.stringify(dadosUsuario));
        }
        location.reload();
    }
}

// ==========================================
// 3. INICIALIZAÇÃO E EXPOSIÇÃO GLOBAL
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    window.authApp = new AuthManager();
});

// FUNÇÃO GLOBAL PARA O BOTÃO DE SAIR (LOGOUT)
window.fazerLogoutGeral = () => UserService.logout();