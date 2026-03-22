document.addEventListener('DOMContentLoaded', () => {
    
    
    try {
        new Swiper('.feed-swiper', {
            slidesPerView: 1, spaceBetween: 15, loop: true,
            navigation: { nextEl: '.feed-next', prevEl: '.feed-prev' },
            breakpoints: { 768: { slidesPerView: 2, spaceBetween: 25 } }
        });

        new Swiper('.lost-swiper', {
            slidesPerView: 2, spaceBetween: 10, loop: true,
            navigation: { nextEl: '.lost-next', prevEl: '.lost-prev' },
            breakpoints: { 600: { slidesPerView: 3, spaceBetween: 15 }, 1024: { slidesPerView: 4 } }
        });
    } catch (e) { console.error("Erro Swiper:", e); }

    
    const container = document.getElementById('userMenuContainer');
    const btnTelaUsuario = document.getElementById('btnTelaUsuario');
    const loginModal = document.getElementById('loginModal');

    function atualizarCabecalho() {
        const isLogado = localStorage.getItem('sos_logado') === 'true';
        const usuarioSalvo = JSON.parse(localStorage.getItem('sos_usuario') || '{}');

        if (isLogado && usuarioSalvo.nome && container) {
            const arroba = '@' + usuarioSalvo.nome.split(' ')[0].toLowerCase();
            
            if (btnTelaUsuario) {
                btnTelaUsuario.style.display = 'flex';
                btnTelaUsuario.onclick = function() {
                    window.location.href = 'tela_perfil_usuario.html';
                };
            }
            
            container.innerHTML = `
                <div class="user-profile" style="display: flex; align-items: center; gap: 15px;">
                    <img src="https:
                    
                    <div class="user-info" style="display: flex; flex-direction: column; text-align: left;">
                        <strong style="color: white; font-size: 14px; margin-bottom: 2px;">${usuarioSalvo.nome}</strong>
                        <span style="color: var(--light-green, #a2c1a3); font-size: 12px; margin-bottom: 5px;">${arroba}</span>
                        
                        <div class="user-actions" style="display: flex; gap: 15px; font-size: 12px;">
                            <small style="cursor: pointer; color: #ccc; transition: 0.2s;" onmouseover="this.style.color='white'" onmouseout="this.style.color='#ccc'" onclick="window.location.href='EditarPerfil.html'">
                                <i class="fas fa-pen"></i> Editar Perfil
                            </small>
                            <small style="cursor: pointer; color: #ccc; transition: 0.2s;" onmouseover="this.style.color='#f07565'" onmouseout="this.style.color='#ccc'" onclick="fazerLogout()">
                                <i class="fas fa-sign-out-alt"></i> Sair
                            </small>
                        </div>
                    </div>
                </div>`;
        } else if (container) {
            
            if (btnTelaUsuario) btnTelaUsuario.style.display = 'none';

            container.innerHTML = `
                <a href="#" class="nav-item" id="loginBtn" style="display: flex; flex-direction: column; align-items: center; color: white; text-decoration: none;">
                    <i class="far fa-user-circle" style="font-size: 24px; margin-bottom: 5px;"></i> login/cadastrar
                </a>`;
            
            document.getElementById('loginBtn').addEventListener('click', (e) => {
                e.preventDefault();
                if (loginModal) loginModal.classList.add('active');
            });
        }
    }
    
    atualizarCabecalho();

    
    const showRegisterBtn = document.getElementById('showRegister');
    const showLoginBtn = document.getElementById('showLogin');
    const formLoginBox = document.getElementById('formLoginBox');
    const formRegisterBox = document.getElementById('formRegisterBox');
    const btnCloseModal = document.getElementById('closeModal');

    
    if (btnCloseModal) {
        btnCloseModal.addEventListener('click', () => {
            if (loginModal) loginModal.classList.remove('active');
        });
    }

    
    window.addEventListener('click', (event) => {
        if (event.target === loginModal) loginModal.classList.remove('active');
    });

    
    if (showRegisterBtn && formLoginBox && formRegisterBox) {
        showRegisterBtn.addEventListener('click', (e) => { 
            e.preventDefault(); 
            formLoginBox.style.display = 'none'; 
            formRegisterBox.style.display = 'block'; 
        });
    }

    
    if (showLoginBtn && formLoginBox && formRegisterBox) {
        showLoginBtn.addEventListener('click', (e) => { 
            e.preventDefault(); 
            formRegisterBox.style.display = 'none'; 
            formLoginBox.style.display = 'block'; 
        });
    }

    
    const perfilBtns = document.querySelectorAll('.btn-perfil');
    let perfilSelecionado = '';
    
    perfilBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            perfilBtns.forEach(b => b.style.opacity = '0.4'); 
            btn.style.opacity = '1'; 
            perfilSelecionado = btn.textContent; 
        });
    });

    
    const formAcaoCadastro = document.getElementById('formAcaoCadastro');
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
            if (perfilSelecionado === '') { 
                alert('Selecione seu perfil (Adotante, Voluntário, etc).'); 
                return; 
            }

            
            const novoUsuario = { nome: nome, email: email, senha: senha, perfil: perfilSelecionado };
            localStorage.setItem('sos_usuario', JSON.stringify(novoUsuario));
            localStorage.setItem('sos_logado', 'true');

            if (loginModal) loginModal.classList.remove('active');
            atualizarCabecalho();
            location.reload(); 
        });
    }

    
    const formAcaoLogin = document.getElementById('formAcaoLogin');
    if (formAcaoLogin) {
        formAcaoLogin.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailDigitado = document.getElementById('loginEmail').value;
            const senhaDigitada = document.getElementById('loginSenha').value;
            
            let usuarioSalvo = null;
            try { usuarioSalvo = JSON.parse(localStorage.getItem('sos_usuario')); } catch(e) {}

            
            if (usuarioSalvo && usuarioSalvo.email === emailDigitado && usuarioSalvo.senha === senhaDigitada) {
                localStorage.setItem('sos_logado', 'true');
                if (loginModal) loginModal.classList.remove('active');
                atualizarCabecalho();
                location.reload();
            } 
            
            else if (emailDigitado === 'teste@portal.com' && senhaDigitada === '123456') {
                localStorage.setItem('sos_logado', 'true');
                localStorage.setItem('sos_usuario', JSON.stringify({ nome: 'Ozias Souza', email: emailDigitado, senha: senhaDigitada }));
                if (loginModal) loginModal.classList.remove('active');
                atualizarCabecalho();
                location.reload(); 
            } else {
                alert('E-mail ou senha incorretos! Cadastre-se primeiro.');
            }
        });
    }

    
    const btnEstado = document.getElementById('btnSelecionarEstado');
    if (btnEstado) {
        const dropdown = document.createElement('div');
        dropdown.id = 'dropdownEstados';
        dropdown.style.cssText = `
            display: none; position: absolute; background: white; border: 1px solid #ccc;
            border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); z-index: 1000;
            margin-top: 5px; width: 180px; max-height: 200px; overflow-y: auto; right: 0;
        `;

        const estados = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];

        estados.forEach(estado => {
            const opcao = document.createElement('div');
            opcao.innerText = estado;
            opcao.style.cssText = `padding: 10px 15px; cursor: pointer; border-bottom: 1px solid #eee; color: #333; font-weight: bold; transition: 0.2s;`;
            opcao.onmouseover = () => opcao.style.backgroundColor = '#f4f6f5';
            opcao.onmouseout = () => opcao.style.backgroundColor = 'white';
            opcao.onclick = (e) => {
                e.stopPropagation();
                btnEstado.innerHTML = `<i class="fas fa-map-marker-alt"></i> Estado: ${estado}`;
                dropdown.style.display = 'none';
            };
            dropdown.appendChild(opcao);
        });

        btnEstado.parentElement.appendChild(dropdown);
        btnEstado.addEventListener('click', (e) => {
            e.stopPropagation();
            const estaAberto = dropdown.style.display === 'block';
            dropdown.style.display = estaAberto ? 'none' : 'block';
        });

        document.addEventListener('click', () => dropdown.style.display = 'none');
    }

});


function fazerLogout() {
    localStorage.removeItem('sos_logado');
    location.reload();
}