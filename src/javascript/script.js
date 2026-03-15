document.addEventListener('DOMContentLoaded', () => {

    
    const feedSwiper = new Swiper('.feed-swiper', {
        slidesPerView: 1,
        spaceBetween: 15,
        loop: true,
        navigation: {
            nextEl: '.feed-next',
            prevEl: '.feed-prev',
        },
        breakpoints: {
            768: { slidesPerView: 2, spaceBetween: 25 }
        }
    });

    const lostSwiper = new Swiper('.lost-swiper', {
        slidesPerView: 2,
        spaceBetween: 10,
        loop: true,
        navigation: {
            nextEl: '.lost-next',
            prevEl: '.lost-prev',
        },
        breakpoints: {
            600: { slidesPerView: 3, spaceBetween: 15 },
            1024: { slidesPerView: 4, spaceBetween: 15 }
        }
    });

    
    function mostrarNotificacao(mensagem) {
        
        const toast = document.createElement('div');
        toast.innerHTML = `<i class="fas fa-paw" style="margin-right: 8px;"></i> ${mensagem}`;
        
        
        toast.style.position = 'fixed';
        toast.style.bottom = '30px';
        toast.style.right = '30px';
        toast.style.backgroundColor = '#325d57'; 
        toast.style.color = 'white';
        toast.style.padding = '15px 25px';
        toast.style.borderRadius = '10px';
        toast.style.boxShadow = '0 5px 15px rgba(0,0,0,0.3)';
        toast.style.fontSize = '16px';
        toast.style.fontWeight = 'bold';
        toast.style.zIndex = '10000';
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
        toast.style.transition = 'all 0.4s ease'; 

        document.body.appendChild(toast);

        
        setTimeout(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateY(0)';
        }, 100);

        
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(20px)';
            setTimeout(() => toast.remove(), 400); 
        }, 4000);
    }


    
    const loginBtn = document.getElementById('loginBtn');
    const loginModal = document.getElementById('loginModal');
    const closeModal = document.getElementById('closeModal');

    function atualizarCabecalho() {
        const isLogado = localStorage.getItem('sos_logado') === 'true';
        const usuarioSalvo = JSON.parse(localStorage.getItem('sos_usuario'));

        if (isLogado && usuarioSalvo && loginBtn) {
            const primeiroNome = usuarioSalvo.nome.split(' ')[0];
            
            loginBtn.innerHTML = `<i class="fas fa-user-check" style="color: #a8d5b4;"></i> Olá, ${primeiroNome}`;
            
            loginBtn.onclick = function(e) {
                e.preventDefault();
                if(confirm(`Deseja sair da conta de ${primeiroNome}?`)) {
                    localStorage.removeItem('sos_logado');
                    window.location.reload(); 
                }
            };
        } else if (loginBtn) {
            loginBtn.innerHTML = `<i class="far fa-user-circle"></i> login/cadastrar`;
            
            loginBtn.onclick = function(e) {
                e.preventDefault();
                loginModal.classList.add('active');
            };
        }
    }

    atualizarCabecalho();

    if (closeModal && loginModal) {
        closeModal.addEventListener('click', function () {
            loginModal.classList.remove('active');
        });
    }

    window.addEventListener('click', function (event) {
        if (event.target === loginModal) {
            loginModal.classList.remove('active');
        }
    });

    
    const showRegisterBtn = document.getElementById('showRegister');
    const showLoginBtn = document.getElementById('showLogin');
    const formLoginBox = document.getElementById('formLoginBox');
    const formRegisterBox = document.getElementById('formRegisterBox');

    if (showRegisterBtn && showLoginBtn && formLoginBox && formRegisterBox) {
        showRegisterBtn.addEventListener('click', (e) => {
            e.preventDefault();
            formLoginBox.style.display = 'none';
            formRegisterBox.style.display = 'block';
        });

        showLoginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            formRegisterBox.style.display = 'none';
            formLoginBox.style.display = 'block';
        });
    }

    
    const loginForm = document.querySelector('#formLoginBox .login-form');

    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const emailDigitado = loginForm.querySelector('input[type="email"]').value;
            const senhaDigitada = loginForm.querySelector('input[type="password"]').value;

            const usuarioSalvo = JSON.parse(localStorage.getItem('sos_usuario'));

            if (usuarioSalvo && usuarioSalvo.email === emailDigitado && usuarioSalvo.senha === senhaDigitada) {
                
                localStorage.setItem('sos_logado', 'true');
                atualizarCabecalho();
                loginModal.classList.remove('active');
                loginForm.reset();

                
                const primeiroNome = usuarioSalvo.nome.split(' ')[0];
                mostrarNotificacao(`Bem-vindo(a) de volta, ${primeiroNome}!`);
                
            } 
            else if (emailDigitado === 'teste@portal.com' && senhaDigitada === '123456') {
                const usuarioTeste = { nome: 'Visitante', email: 'teste@portal.com' };
                localStorage.setItem('sos_usuario', JSON.stringify(usuarioTeste));
                localStorage.setItem('sos_logado', 'true');
                
                atualizarCabecalho();
                loginModal.classList.remove('active');
                loginForm.reset();

                
                mostrarNotificacao(`Bem-vindo(a) de volta, Visitante!`);
            } 
            else {
                alert('E-mail ou senha incorretos! Verifique se você já fez o cadastro.');
            }
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

    
    const registerForm = document.getElementById('formAcaoCadastro');

    if (registerForm) {
        registerForm.addEventListener('submit', function (e) {
            e.preventDefault(); 
            
            const nome = document.getElementById('cadNome').value;
            const email = document.getElementById('cadEmail').value;
            const ddd = document.getElementById('cadDDD').value;
            const telefone = document.getElementById('cadTelefone').value;
            const senha = document.getElementById('cadSenha').value;
            const confirmaSenha = document.getElementById('cadConfirmaSenha').value;

            if (senha !== confirmaSenha) {
                alert('Erro: As senhas não coincidem!');
                return; 
            }
            if (perfilSelecionado === '') {
                alert('Por favor, selecione o seu perfil de conta (Adotante, Voluntário, etc).');
                return;
            }

            const dadosUsuario = {
                nome: nome,
                email: email,
                telefone: `(${ddd}) ${telefone}`,
                senha: senha,
                perfil: perfilSelecionado
            };

            localStorage.setItem('sos_usuario', JSON.stringify(dadosUsuario));

            
            loginModal.classList.remove('active');
            mostrarNotificacao(`Conta criada com sucesso! Faça o login.`);
            
            registerForm.reset();
            perfilBtns.forEach(b => b.style.opacity = '1'); 
            formRegisterBox.style.display = 'none';
            formLoginBox.style.display = 'block';
        });
    }
});