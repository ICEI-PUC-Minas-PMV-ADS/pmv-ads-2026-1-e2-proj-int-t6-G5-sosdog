document.addEventListener("DOMContentLoaded", function () {

    
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

    function obterUsuarioSalvo() {
        try {
            const usuario = JSON.parse(localStorage.getItem("sos_usuario") || "null");
            return usuario && typeof usuario === "object" ? usuario : null;
        } catch (error) {
            console.error("Erro ao ler usuário salvo:", error);
            return null;
        }
    }

    function estaLogado() {
        const usuario = obterUsuarioSalvo();
        const logado = localStorage.getItem("sos_logado") === "true";
        return logado && !!usuario;
    }

    function salvarSessao(usuario, logarAgora = true) {
        if (!usuario || !usuario.nome || !usuario.email) {
            console.error("Usuário inválido para salvar sessão.");
            return false;
        }

        const usuarioFinal = {
            ...usuario,
            arroba: usuario.arroba || gerarArroba(usuario.nome)
        };

        localStorage.setItem("sos_usuario", JSON.stringify(usuarioFinal));
        localStorage.setItem("sos_logado", logarAgora ? "true" : "false");
        return true;
    }

    function limparSessao() {
        localStorage.setItem("sos_logado", "false");
        localStorage.removeItem("sos_usuario");
    }

    function obterDadosPerfilAtualizados() {
        const usuario = obterUsuarioSalvo() || {};

        return {
            nome: localStorage.getItem("petSos_nomeUsuario") || usuario.nome || "Nome do Usuário",
            arroba:
                localStorage.getItem("petSos_nomeUsuario")
                    ? gerarArroba(localStorage.getItem("petSos_nomeUsuario"))
                    : (usuario.arroba || gerarArroba(usuario.nome)),
            foto:
                localStorage.getItem("petSos_fotoPerfil") ||
                usuario.foto ||
                "https://placehold.co/45x45",
            bio:
                localStorage.getItem("petSos_bioUsuario") ||
                usuario.bio ||
                "Amo animais e procuro lares cheios de amor.",
            perfil:
                localStorage.getItem("petSos_tipoPerfil") ||
                usuario.perfil ||
                "Adotante",
            seloVoluntario:
                localStorage.getItem("petSos_seloVoluntario") === "true"
        };
    }

    function aplicarTemaPorPerfil(perfil) {
        const root = document.documentElement;

        const temas = {
            "Adotante": {
                cor: "#4f7c75",
                hover: "#3c635d",
                soft: "#a2c1a3",
                shadow: "rgba(79, 124, 117, 0.22)"
            },
            "Voluntário": {
                cor: "#2e7d32",
                hover: "#1f5a23",
                soft: "#9ad29d",
                shadow: "rgba(46, 125, 50, 0.22)"
            },
            "Apoiador": {
                cor: "#d9826a",
                hover: "#c9715a",
                soft: "#f1b8aa",
                shadow: "rgba(217, 130, 106, 0.22)"
            }
        };

        const tema = temas[perfil] || temas["Adotante"];

        root.style.setProperty("--cor-perfil", tema.cor);
        root.style.setProperty("--cor-perfil-hover", tema.hover);
        root.style.setProperty("--cor-perfil-soft", tema.soft);
        root.style.setProperty("--cor-perfil-shadow", tema.shadow);

        const perfilNormalizado = perfil.toLowerCase().replace("á", "a");
        document.body.setAttribute("data-tema", perfilNormalizado);
    }
    const loginModal = document.getElementById("loginModal");
    const loginBtnContainer = document.getElementById("loginBtnContainer");
    const loggedInContainer = document.getElementById("loggedInContainer");
    const loginBtn = document.getElementById("loginBtn");

    const userNameDisplay =
        document.getElementById("homeUserName") ||
        document.getElementById("userNameDisplay");

    const userArrobaDisplay =
        document.getElementById("homeUserArroba") ||
        document.getElementById("userArrobaDisplay");

    const userAvatarDisplay =
        document.getElementById("homeUserAvatar") ||
        document.getElementById("userAvatarDisplay");

    const userProfileTypeDisplay =
        document.getElementById("homeTipoPerfil") ||
        document.getElementById("userProfileTypeDisplay");

    const userBioDisplay =
        document.getElementById("homeUserBio");

    const seloVoluntarioDisplay =
        document.getElementById("homeSeloVoluntario");

    const showRegisterBtn = document.getElementById("showRegister");
    const showLoginBtn = document.getElementById("showLogin");
    const formLoginBox = document.getElementById("formLoginBox");
    const formRegisterBox = document.getElementById("formRegisterBox");
    const btnCloseModal = document.getElementById("closeModal");

    const formAcaoCadastro = document.getElementById("formAcaoCadastro");
    const formAcaoLogin = document.getElementById("formAcaoLogin");

    const btnLogout = document.getElementById("btnLogout");

    const commentsSection = document.getElementById("commentsArea") || document.querySelector(".comments-section");

    const searchBar = document.getElementById("searchBarTop");
    const searchIcon = document.querySelector(".search-bar .fa-search");
    const swiperFeedContainer = document.getElementById("feedContainer");
    const btnEstado = document.getElementById("btnSelecionarEstado");
    const dropdownEstado = document.getElementById("dropdownEstado");
    const dropdownItems = document.querySelectorAll(".dropdown-item");
    let allFeedSlides = [];
    
    function iniciarCarrosselFeed() {
        if (window.feedSwiperInstance) {
            window.feedSwiperInstance.destroy(true, true); 
        }
        
        const qtdCards = swiperFeedContainer ? swiperFeedContainer.querySelectorAll(".swiper-slide").length : 0;
        const ativarLoop = qtdCards > 2;

        try {
            window.feedSwiperInstance = new Swiper(".feed-swiper", {
                slidesPerView: 1,
                spaceBetween: 14,
                grabCursor: true,
                loop: ativarLoop,
                navigation: { nextEl: ".feed-next", prevEl: ".feed-prev" },
                breakpoints: {
                    320: { slidesPerView: 1 },
                    768: { slidesPerView: 1 },
                    1200: { slidesPerView: 2 }
                }
            });
        } catch (e) {
            console.error("Erro no Swiper Feed:", e);
        }
    }

    if (searchBar && swiperFeedContainer) {
        allFeedSlides = Array.from(swiperFeedContainer.children).map(slide => slide.cloneNode(true));

        window.executarBusca = function () {
            let textoCru = searchBar.value.toUpperCase();
            let textoFiltrado = textoCru.replace(/([^A-Z0-9\s!@#$%&.,])/g, "");
            searchBar.value = textoFiltrado;
            
            const query = textoFiltrado.toLowerCase().trim();

            swiperFeedContainer.innerHTML = "";

            if (query === "") {
                allFeedSlides.forEach(slide => swiperFeedContainer.appendChild(slide.cloneNode(true)));
            } else {
                const filteredSlides = allFeedSlides.filter(slide => {
                    const card = slide.querySelector(".feed-card");
                    if (!card) return false;
                    
                    const dataBusca = card.getAttribute("data-busca");
                    return dataBusca && dataBusca.toLowerCase().includes(query);
                });

                if (filteredSlides.length > 0) {
                    filteredSlides.forEach(slide => swiperFeedContainer.appendChild(slide.cloneNode(true)));
                } else {
                    const msgDiv = document.createElement("div");
                    msgDiv.className = "swiper-slide";
                    msgDiv.innerHTML = `<div class="feed-card" style="align-items: center; justify-content: center; min-height: 200px; color: #888; font-weight: bold;">Nenhum animal encontrado para "${query}"</div>`;
                    swiperFeedContainer.appendChild(msgDiv);
                }
            }

            iniciarCarrosselFeed();
        };

        searchBar.addEventListener("input", window.executarBusca);

        if (searchIcon) {
            searchIcon.style.cursor = "pointer";
            searchIcon.addEventListener("click", function () {
                window.executarBusca();
                searchBar.focus();
            });
        }
    }

    iniciarCarrosselFeed();
    try {
        if (typeof Swiper !== "undefined") {
            new Swiper(".lost-swiper", {
                slidesPerView: 4,
                spaceBetween: 15,
                grabCursor: true,
                loop: true,
                autoplay: { delay: 3000, disableOnInteraction: false },
                navigation: { nextEl: ".lost-next", prevEl: ".lost-prev" },
                breakpoints: {
                    320: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 4 },
                    1400: { slidesPerView: 5 }
                }
            });
        }
    } catch (e) {
        console.error("Erro Swiper Lost:", e);
    }
    if (btnEstado && dropdownEstado) {
        btnEstado.addEventListener("click", function(e) {
            e.stopPropagation(); 
            dropdownEstado.classList.toggle("show");
        });

        window.addEventListener("click", function(e) {
            if (!btnEstado.contains(e.target) && !dropdownEstado.contains(e.target)) {
                dropdownEstado.classList.remove("show");
            }
        });
    }

    if (dropdownItems.length > 0) {
        dropdownItems.forEach(botao => {
            botao.addEventListener("click", function() {
                const ufEscolhida = this.textContent.trim();
                
                if (btnEstado) {
                    btnEstado.innerHTML = `<i class="fas fa-map-marker-alt" aria-hidden="true"></i> <span>Estado: ${ufEscolhida}</span> <i class="fas fa-chevron-down" style="margin-left: 5px; font-size: 11px;"></i>`;
                }
                
                if (dropdownEstado) {
                    dropdownEstado.classList.remove("show");
                }
                
                if (searchBar) {
                    searchBar.value = ufEscolhida;
                    if (window.executarBusca) window.executarBusca();
                }
            });
        });
    }
    function atualizarCabecalho() {
        const dados = obterDadosPerfilAtualizados();
        
        if (!loginBtnContainer || !loggedInContainer) return;

        if (estaLogado() && dados.nome) {
            if (userNameDisplay) userNameDisplay.textContent = dados.nome;
            if (userArrobaDisplay) userArrobaDisplay.textContent = dados.arroba;

            if (userAvatarDisplay) {
                userAvatarDisplay.src = dados.foto;
                userAvatarDisplay.alt = `Foto de perfil de ${dados.nome}`;
            }

            aplicarTemaPorPerfil(dados.perfil);

            const etiquetasPerfil = [
                userProfileTypeDisplay,
                document.getElementById("badgePerfilUsuario")
            ];

            etiquetasPerfil.forEach(etiqueta => {
                if (etiqueta) {
                    etiqueta.textContent = dados.perfil;
                    etiqueta.style.display = "inline-block";
                    etiqueta.style.background = "transparent";
                    etiqueta.style.border = "none";
                    etiqueta.style.padding = "0";
                    etiqueta.style.backdropFilter = "none";
                    etiqueta.style.color = "var(--cor-perfil-soft)";
                    etiqueta.style.fontWeight = "700";
                }
            });

            if (userBioDisplay) {
                userBioDisplay.textContent = dados.bio;
            }

            if (seloVoluntarioDisplay) {
                const mostrarSelo = dados.seloVoluntario && dados.perfil === "Voluntário";
                seloVoluntarioDisplay.style.display = mostrarSelo ? "inline-flex" : "none";
            }

            loginBtnContainer.classList.add("hidden");
            loggedInContainer.classList.remove("hidden");
        } else {
            document.body.removeAttribute("data-tema");

            loginBtnContainer.classList.remove("hidden");
            loggedInContainer.classList.add("hidden");
            
            const etiquetasPerfil = [
                userProfileTypeDisplay,
                document.getElementById("badgePerfilUsuario")
            ];

            etiquetasPerfil.forEach(etiqueta => {
                if (etiqueta) etiqueta.style.display = "none";
            });

            if (seloVoluntarioDisplay) {
                seloVoluntarioDisplay.style.display = "none";
            }
        }
    }

    atualizarCabecalho();
    const fecharModal = () => loginModal?.classList.remove("active");
    const abrirModal = () => loginModal?.classList.add("active");

    if (loginBtn) {
        loginBtn.onclick = (e) => { 
            e.preventDefault(); 
            estaLogado() ? window.location.href = "tela_perfil_usuario.html" : abrirModal(); 
        };
    }
    
    if (btnCloseModal) btnCloseModal.onclick = fecharModal;
    
    if (showRegisterBtn) {
        showRegisterBtn.onclick = (e) => { 
            e.preventDefault();
            if (formLoginBox) formLoginBox.style.display = "none";
            if (formRegisterBox) formRegisterBox.style.display = "block";
        };
    }
    
    if (showLoginBtn) {
        showLoginBtn.onclick = (e) => { 
            e.preventDefault();
            if (formRegisterBox) formRegisterBox.style.display = "none";
            if (formLoginBox) formLoginBox.style.display = "block";
        };
    }

    window.addEventListener("click", (e) => {
        if (e.target === loginModal) fecharModal();
    });

    const perfilBtns = document.querySelectorAll("#formAcaoCadastro .btn-perfil");
    const cadPerfilInput = document.getElementById("cadPerfil");

    if (perfilBtns.length > 0) {
        perfilBtns.forEach(b => b.style.opacity = "0.6");
        
        perfilBtns.forEach((btn) => {
            btn.addEventListener("click", () => {
                perfilBtns.forEach((b) => {
                    b.classList.remove("active");
                    b.style.opacity = "0.6";
                });
                
                btn.classList.add("active");
                btn.style.opacity = "1";
                
                if (cadPerfilInput) {
                    const perfilSelecionado = btn.dataset.profile || btn.textContent.trim();
                    cadPerfilInput.value = perfilSelecionado;
                    aplicarTemaPorPerfil(perfilSelecionado);
                }
            });
        });
    }

    if (formAcaoLogin) {
        formAcaoLogin.onsubmit = (e) => {
            e.preventDefault();
            
            const emailDigitado = document.getElementById("loginEmail").value.trim();
            const senhaDigitada = document.getElementById("loginSenha").value;
            const salvo = obterUsuarioSalvo();
            
            if (salvo && salvo.email === emailDigitado && salvo.senha === senhaDigitada) {
                localStorage.setItem("sos_logado", "true");

                if (salvo.nome) localStorage.setItem("petSos_nomeUsuario", salvo.nome);
                if (salvo.perfil) localStorage.setItem("petSos_tipoPerfil", salvo.perfil);

                if (salvo.perfil === "Voluntário") {
                    localStorage.setItem("petSos_seloVoluntario", "true");
                } else {
                    localStorage.setItem("petSos_seloVoluntario", "false");
                }

                fecharModal();
                atualizarCabecalho();
                window.location.href = "tela_perfil_usuario.html";
            } else {
                alert("E-mail ou senha incorretos! Tente novamente.");
            }
        };
    }

    if (formAcaoCadastro) {
        formAcaoCadastro.onsubmit = (e) => {
            e.preventDefault();
            
            const nome = document.getElementById("cadNome").value.trim();
            const email = document.getElementById("cadEmail").value.trim();
            const senha = document.getElementById("cadSenha").value;
            const confirmaSenha = document.getElementById("cadConfirmaSenha").value;
            const perfil = cadPerfilInput ? cadPerfilInput.value : null;

            if (senha !== confirmaSenha) {
                alert("Erro: As senhas não coincidem! Digite a mesma senha nos dois campos.");
                return;
            }

            if (!perfil) {
                alert("Selecione seu perfil (Adotante, Voluntário ou Apoiador).");
                return;
            }
            
            const novoUsuario = {
                nome: nome,
                email: email,
                senha: senha,
                perfil: perfil,
                arroba: gerarArroba(nome)
            };
            
            localStorage.setItem("sos_usuario", JSON.stringify(novoUsuario));
            localStorage.setItem("sos_logado", "false");

            localStorage.setItem("petSos_nomeUsuario", nome);
            localStorage.setItem("petSos_tipoPerfil", perfil);

            if (perfil === "Voluntário") {
                localStorage.setItem("petSos_seloVoluntario", "true");
            } else {
                localStorage.setItem("petSos_seloVoluntario", "false");
            }

            alert("Cadastro realizado com sucesso! Agora faça o seu login.");
            formAcaoCadastro.reset();

            perfilBtns.forEach(b => {
                b.classList.remove("active");
                b.style.opacity = "0.6";
            });

            if (cadPerfilInput) cadPerfilInput.value = "";

            if (formRegisterBox && formLoginBox) {
                formRegisterBox.style.display = "none";
                formLoginBox.style.display = "block";
            }
        };
    }

    function escapeHtml(texto) {
        const div = document.createElement("div");
        div.textContent = texto;
        return div.innerHTML;
    }

    window.renderizarComentariosDaHome = function () {
        if (!commentsSection) return;

        commentsSection.innerHTML = "";
        
        let comentarios = [];
        try {
            comentarios = JSON.parse(localStorage.getItem("sos_comentarios") || "[]");
            if (!Array.isArray(comentarios)) comentarios = [];
        } catch (e) {
            comentarios = [];
        }

        if (comentarios.length === 0) {
            commentsSection.innerHTML = '<div style="font-size: 12px; color: #888; text-align: center; margin-top: 15px; width: 100%; background: transparent; border: none;">Nenhum comentário feito ainda. Seja o primeiro!</div>';
            return;
        }

        comentarios.forEach(c => {
            const nome = c.nome || "Anônimo";
            const inicial = nome.charAt(0).toUpperCase();

            commentsSection.innerHTML += `
                <div class="comment-row" style="margin-bottom: 10px; display: flex; align-items: start; gap: 10px;">
                    <div style="width: 25px; height: 25px; border-radius: 50%; background: var(--cor-perfil-soft, #a2c1a3); color: white; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; flex-shrink: 0;">${escapeHtml(inicial)}</div>
                    <div class="comment-bubble" style="background: #f4f6f5; padding: 8px; border-radius: 10px; flex-grow: 1;">
                        <strong style="color: var(--cor-perfil, #385b54); font-size: 12px;">${escapeHtml(nome)}</strong>
                        <span style="float: right; font-size: 9px; color: #999;">${escapeHtml(c.data || "")}</span><br>
                        <span style="font-size: 11px; color: #333;">${escapeHtml(c.texto || "")}</span>
                    </div>
                </div>`;
        });
        
        commentsSection.scrollTop = commentsSection.scrollHeight;
    };

    window.renderizarComentariosDaHome();
    window.fazerLogoutGeral = function (e) {
        if (e) e.preventDefault();
        limparSessao();
        window.location.href = "home.html";
    };

    window.sairDaConta = window.fazerLogoutGeral;

    if (btnLogout) {
        btnLogout.onclick = window.fazerLogoutGeral;
    }

    function sincronizarHomeAoVoltar() {
        window.addEventListener("focus", function () {
            atualizarCabecalho();
            window.renderizarComentariosDaHome();
        });

        document.addEventListener("visibilitychange", function () {
            if (!document.hidden) {
                atualizarCabecalho();
                window.renderizarComentariosDaHome();
            }
        });
    }

    sincronizarHomeAoVoltar();

    document.addEventListener("click", function(e) {
        
        
        if (e.target.classList.contains("fa-heart")) {
            e.target.classList.toggle("far"); 
            e.target.classList.toggle("fas"); 
            
            if (e.target.classList.contains("fas")) {
                e.target.style.color = "#ff4757"; 
                e.target.style.transform = "scale(1.2)";
                setTimeout(() => e.target.style.transform = "scale(1)", 200); 
            } else {
                e.target.style.color = ""; 
            }
        }

        
        if (e.target.classList.contains("fa-bookmark")) {
            e.target.classList.toggle("far"); 
            e.target.classList.toggle("fas"); 
            
            if (e.target.classList.contains("fas")) {
                e.target.style.color = "#ffa502"; 
            } else {
                e.target.style.color = ""; 
            }
        }

        
        if (e.target.classList.contains("fa-share")) {
            if (navigator.share) {
                navigator.share({
                    title: 'SOS Dog - Caso Urgente',
                    text: 'Dê uma olhada neste caso no SOS Dog!',
                    url: window.location.href, 
                }).catch(console.error);
            } else {
                alert("Link do caso copiado para a área de transferência!");
            }
        }
    });
});