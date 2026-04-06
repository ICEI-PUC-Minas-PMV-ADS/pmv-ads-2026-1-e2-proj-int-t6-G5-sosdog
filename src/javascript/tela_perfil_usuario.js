document.addEventListener("DOMContentLoaded", function () {
    if (!verificarAcesso()) return;

    preencherPerfil();
    iniciarSwipers();
    configurarEventos();
    sincronizarSessaoAoVoltar();
});
function gerarArroba(nome) {
    if (!nome) return "@usuario";

    return "@" + nome
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim()
        .split(" ")[0]
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "");
}
function normalizarPerfil(perfil) {
    if (!perfil) return "Visitante";
    const perfilLimpo = String(perfil).trim().toLowerCase();
    if (perfilLimpo === "voluntario" || perfilLimpo === "voluntário") return "Voluntário";
    if (perfilLimpo === "adotante") return "Adotante";
    if (perfilLimpo === "apoiador") return "Apoiador";
    return "Visitante";
}

function obterSlugTema(perfil) {
    const perfilNormalizado = normalizarPerfil(perfil);
    switch (perfilNormalizado) {
        case "Adotante": return "adotante";
        case "Voluntário": return "voluntario";
        case "Apoiador": return "apoiador";
        default: return "";
    }
}

function obterCorPerfil(perfil) {
    switch (normalizarPerfil(perfil)) {
        case "Adotante": return "#ff9f43";
        case "Voluntário": return "#54a0ff";
        case "Apoiador": return "#10ac84";
        default: return "#385b54";
    }
}

function aplicarTemaDinamico(perfil) {
    const tema = obterSlugTema(perfil);
    if (!document.body) return;
    if (tema) {
        document.body.setAttribute("data-tema", tema);
    } else {
        document.body.removeAttribute("data-tema");
    }
}

function obterUsuarioSalvo() {
    try {
        return JSON.parse(localStorage.getItem("sos_usuario") || "null");
    } catch (error) {
        console.error("Erro ao ler usuário salvo:", error);
        return null;
    }
}

function estaLogado() {
    const usuario = obterUsuarioSalvo();
    const logado = localStorage.getItem("sos_logado");
    const sessaoValida = !!usuario && (logado === "true" || logado === true || logado === null);

    if (sessaoValida) {
        localStorage.setItem("sos_logado", "true");
        return true;
    }
    return false;
}

function salvarSessao(usuario) {
    const usuarioFinal = {
        ...usuario,
        arroba: usuario.arroba || gerarArroba(usuario.nome),
        perfil: normalizarPerfil(usuario.perfil)
    };

    localStorage.setItem("sos_usuario", JSON.stringify(usuarioFinal));
    localStorage.setItem("sos_logado", "true");
}

function limparSessao() {
    localStorage.removeItem("sos_logado");
    localStorage.removeItem("sos_usuario");
    aplicarTemaDinamico("");
}

function escapeHtml(texto) {
    const div = document.createElement("div");
    div.textContent = texto;
    return div.innerHTML;
}

function verificarAcesso() {
    if (!estaLogado()) {
        alert("Você precisa estar logado para acessar esta página.");
        window.location.href = "../html/home.html";
        return false;
    }
    return true;
}

function preencherPerfil() {
    const usuarioSalvo = obterUsuarioSalvo();
    if (!usuarioSalvo) return;

    
    const userNameDisplay = document.getElementById("userNameDisplay") || document.querySelector(".user-info strong");
    const userArrobaDisplay = document.getElementById("userArrobaDisplay") || document.querySelector(".user-info span");
    const userAvatarDisplay = document.getElementById("userAvatarDisplay") || document.querySelector(".user-profile img");
    
    
    const nomeUsuarioTelaPerfil = document.getElementById("nomeUsuario");
    const tipoUsuarioTelaPerfil = document.getElementById("tipoUsuario");

    const arroba = usuarioSalvo.arroba || gerarArroba(usuarioSalvo.nome);
    const perfil = normalizarPerfil(usuarioSalvo.perfil);

    aplicarTemaDinamico(perfil);

    if (userNameDisplay) userNameDisplay.textContent = usuarioSalvo.nome;
    if (userArrobaDisplay) userArrobaDisplay.textContent = arroba;
    if (userAvatarDisplay && usuarioSalvo.foto) userAvatarDisplay.src = usuarioSalvo.foto;

    if (nomeUsuarioTelaPerfil) nomeUsuarioTelaPerfil.textContent = usuarioSalvo.nome;
    if (tipoUsuarioTelaPerfil) {
        tipoUsuarioTelaPerfil.textContent = perfil;
        tipoUsuarioTelaPerfil.style.color = obterCorPerfil(perfil);
        tipoUsuarioTelaPerfil.style.fontWeight = "600";
    }
}

function iniciarSwipers() {
    try {
        if (typeof Swiper === "undefined") {
            console.error("Swiper não foi carregado.");
            return;
        }

        if (document.querySelector(".swiper-feed")) {
            new Swiper(".swiper-feed", {
                slidesPerView: 1,
                spaceBetween: 8,
                grabCursor: true,
                loop: false,
                navigation: { nextEl: ".feed-next", prevEl: ".feed-prev" },
                breakpoints: {
                    320: { slidesPerView: 1, spaceBetween: 8 },
                    900: { slidesPerView: 2, spaceBetween: 10 },
                    1200: { slidesPerView: 3, spaceBetween: 10 }
                }
            });
        }

        if (document.querySelector(".swiper-lost")) {
            new Swiper(".swiper-lost", {
                slidesPerView: 2,
                spaceBetween: 8,
                grabCursor: true,
                loop: false,
                navigation: { nextEl: ".lost-next", prevEl: ".lost-prev" },
                breakpoints: {
                    320: { slidesPerView: 2, spaceBetween: 8 },
                    768: { slidesPerView: 3, spaceBetween: 8 },
                    1024: { slidesPerView: 4, spaceBetween: 8 },
                    1400: { slidesPerView: 5, spaceBetween: 8 }
                }
            });
        }
    } catch (e) {
        console.error("Erro ao iniciar o Swiper:", e);
    }
}
window.fazerLogoutGeral = function(event) {
    if (event) event.preventDefault();
    try { limparSessao(); } catch (error) { console.error("Erro ao limpar sessão:", error); }
    window.location.href = "../html/home.html";
};

function configurarEventos() {
    const btnLogout = document.getElementById("btnLogout") || document.querySelector("small[onclick*='Logout']");
    if (btnLogout) {
        btnLogout.addEventListener("click", window.fazerLogoutGeral);
    }
}

function sincronizarSessaoAoVoltar() {
    window.addEventListener("focus", function () {
        if (estaLogado()) {
            preencherPerfil();
        } else {
            window.location.href = "../html/home.html";
        }
    });

    document.addEventListener("visibilitychange", function () {
        if (!document.hidden) {
            if (estaLogado()) {
                preencherPerfil();
            } else {
                window.location.href = "../html/home.html";
            }
        }
    });
}
window.enviarComentarioDoPerfil = function() {
    const textarea = document.getElementById("textoComentarioPerfil");
    
    if (!textarea) {
        console.error("Erro: Caixa de texto não encontrada.");
        return;
    }

    const texto = textarea.value.trim();
    if (texto === "") {
        alert("Escreva algo antes de enviar!");
        return;
    }

    
    let nomeUsuario = "Visitante";
    let perfilUsuario = "Visitante";

    try {
        if (estaLogado()) {
            const usuarioSalvo = obterUsuarioSalvo();
            if (usuarioSalvo && usuarioSalvo.nome) {
                nomeUsuario = usuarioSalvo.nome;
                perfilUsuario = normalizarPerfil(usuarioSalvo.perfil);
            }
        }
    } catch (e) {
        console.error("Erro ao ler usuário:", e);
    }

    
    let comentariosSalvos = [];
    try {
        comentariosSalvos = JSON.parse(localStorage.getItem("sos_comentarios") || "[]");
    } catch (e) {}
    
    comentariosSalvos.push({
        nome: nomeUsuario,
        texto: texto,
        perfil: perfilUsuario,
        data: new Date().toLocaleDateString("pt-BR")
    });

    
    localStorage.setItem("sos_comentarios", JSON.stringify(comentariosSalvos));

    
    textarea.value = "";
    alert("Comentário enviado com sucesso! Vá para a página Home para visualizá-lo.");
};