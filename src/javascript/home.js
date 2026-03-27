document.addEventListener("DOMContentLoaded", function () {

    
    try {
        const swiperFeed = new Swiper('.feed-swiper', {
            slidesPerView: 2,
            spaceBetween: 20,
            grabCursor: true,
            loop: true,
            navigation: {
                nextEl: '.feed-next',
                prevEl: '.feed-prev',
            },
            breakpoints: {
                320: { slidesPerView: 1 },
                768: { slidesPerView: 2 }
            }
        });

        const swiperLost = new Swiper('.lost-swiper', {
            slidesPerView: 4,
            spaceBetween: 15,
            grabCursor: true,
            loop: true,
            navigation: {
                nextEl: '.lost-next',
                prevEl: '.lost-prev',
            },
            breakpoints: {
                320: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 }
            }
        });
    } catch (e) {
        console.error("Erro ao iniciar o Swiper:", e);
    }

    
    const loginModal = document.getElementById('loginModal');
    const loginBtnContainer = document.getElementById('loginBtnContainer');
    const loggedInContainer = document.getElementById('loggedInContainer');
    const userNameDisplay = document.getElementById('userNameDisplay');
    const userArrobaDisplay = document.getElementById('userArrobaDisplay');
    const loginBtn = document.getElementById('loginBtn');

    function atualizarCabecalho() {
        const isLogado = localStorage.getItem('sos_logado') === 'true';
        const usuarioSalvo = JSON.parse(localStorage.getItem('sos_usuario') || '{}');

        if (isLogado && usuarioSalvo.nome) {
            
            const arroba = '@' + usuarioSalvo.nome.split(' ')[0].toLowerCase();
            
            
            if (userNameDisplay) userNameDisplay.textContent = usuarioSalvo.nome;
            if (userArrobaDisplay) userArrobaDisplay.textContent = arroba;
            
            
            if (loginBtnContainer) loginBtnContainer.style.display = 'none';
            if (loggedInContainer) loggedInContainer.style.display = 'flex';
        } else {
            
            if (loginBtnContainer) loginBtnContainer.style.display = 'block';
            if (loggedInContainer) loggedInContainer.style.display = 'none';
        }
    }
    
    atualizarCabecalho();

    
    if (loginBtn) {
        loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (loginModal) loginModal.classList.add('active');
        });
    }

    
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
            
            const nome = document.getElementById('cadNome').value.trim();
            const email = document.getElementById('cadEmail').value.trim();
            const senha = document.getElementById('cadSenha').value;
            const confirmaSenha = document.getElementById('cadConfirmaSenha').value;

            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            if (!emailRegex.test(email)) {
                alert('Por favor, insira um endereço de e-mail válido (ex: seu.nome@email.com).');
                return;
            }

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
            const emailDigitado = document.getElementById('loginEmail').value.trim();
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
                localStorage.setItem('sos_usuario', JSON.stringify({ nome: 'Visitante', email: emailDigitado, senha: senhaDigitada }));
                if (loginModal) loginModal.classList.remove('active');
                atualizarCabecalho();
                location.reload(); 
            } else {
                alert('E-mail ou senha incorretos! Verifique se digitou corretamente.');
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


function fazerLogoutGeral(e) {
    if (e) e.preventDefault(); 
    localStorage.removeItem('sos_logado');
    location.reload();
}