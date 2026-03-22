document.addEventListener('DOMContentLoaded', () => {
    
    // 1. INICIALIZAÇÃO DOS CARROSSEIS (Swiper)
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

    // 2. SISTEMA DE CABEÇALHO DINÂMICO (Login / Perfil)
    const container = document.getElementById('userMenuContainer');
    const btnTelaUsuario = document.getElementById('btnTelaUsuario');
    const loginModal = document.getElementById('loginModal');

    function atualizarCabecalho() {
        const isLogado = localStorage.getItem('sos_logado') === 'true';
        const usuarioSalvo = JSON.parse(localStorage.getItem('sos_usuario') || '{}');

        if (isLogado && usuarioSalvo.nome && container) {
            const arroba = '@' + usuarioSalvo.nome.split(' ')[0].toLowerCase();
            
            // Mostra o botão USUÁRIO e adiciona o redirecionamento
            if (btnTelaUsuario) {
                btnTelaUsuario.style.display = 'flex';
                btnTelaUsuario.onclick = function() {
                    window.location.href = 'tela_perfil_usuario.html';
                };
            }
            
            // Injetando o Perfil Logado CORRIGIDO (Alinhamento em Coluna)
            container.innerHTML = `
                <div class="user-profile" style="display: flex; align-items: center; gap: 15px;">
                    
                    <img src="https://placehold.co/45x45" alt="Avatar" style="border-radius: 50%; width: 45px; height: 45px; object-fit: cover; border: 2px solid var(--tag-green, #a2c1a3); flex-shrink: 0;">
                    
                    <div class="user-info" style="display: flex; flex-direction: column; text-align: left;">
                        <strong style="color: white; font-size: 14px; margin-bottom: 2px;">${usuarioSalvo.nome}</strong>
                        <span style="color: var(--tag-green, #a2c1a3); font-size: 12px; margin-bottom: 5px;">${arroba}</span>
                        
                        <div class="user-actions" style="display: flex; gap: 15px; font-size: 12px;">
                            <small style="cursor: pointer; color: #ccc; transition: 0.2s;" onmouseover="this.style.color='white'" onmouseout="this.style.color='#ccc'" onclick="window.location.href='../html/EditarPerfil.html'">
                                <i class="fas fa-pen"></i> Editar Perfil
                            </small>
                            <small style="cursor: pointer; color: #ccc; transition: 0.2s;" onmouseover="this.style.color='#f07565'" onmouseout="this.style.color='#ccc'" onclick="fazerLogout()">
                                <i class="fas fa-sign-out-alt"></i> Sair
                            </small>
                        </div>
                    </div>
                </div>`;
        } else if (container) {
            // Esconde o botão USUÁRIO se estiver deslogado
            if (btnTelaUsuario) btnTelaUsuario.style.display = 'none';

            container.innerHTML = `
                <a href="#" class="nav-item" id="loginBtn">
                    <i class="far fa-user-circle" style="font-size: 24px;"></i> login/cadastrar
                </a>`;
            
            document.getElementById('loginBtn').addEventListener('click', (e) => {
                e.preventDefault();
                if (loginModal) loginModal.classList.add('active');
            });
        }
    }

    // 3. FUNÇÃO SELECIONAR ESTADO (Dropdown)
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

    // 4. LÓGICA DE LOGIN
    const formLogin = document.getElementById('formAcaoLogin');
    if (formLogin) {
        formLogin.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            localStorage.setItem('sos_logado', 'true');
            localStorage.setItem('sos_usuario', JSON.stringify({ nome: 'Ozias Souza', email: email }));
            if (loginModal) loginModal.classList.remove('active');
            atualizarCabecalho();
            location.reload(); 
        });
    }

    atualizarCabecalho();
    document.getElementById('closeModal')?.addEventListener('click', () => {
        if (loginModal) loginModal.classList.remove('active');
    });
});

// 5. FUNÇÃO GLOBAL DE LOGOUT
function fazerLogout() {
    localStorage.removeItem('sos_logado');
    location.reload();
}