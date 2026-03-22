document.addEventListener('DOMContentLoaded', () => {
  
  let novaFotoBase64 = null;

  
  
  
  const fotoSalva = localStorage.getItem('petSos_fotoPerfil');
  const nomeSalvo = localStorage.getItem('petSos_nomeUsuario');
  const bioSalva = localStorage.getItem('petSos_bioUsuario');
  const perfilSalvo = localStorage.getItem('petSos_tipoPerfil');
  const siteSalvo = localStorage.getItem('petSos_site');
  const seloSalvo = localStorage.getItem('petSos_seloVoluntario');
  const generoSalvo = localStorage.getItem('petSos_genero');
  const alertasSalvos = localStorage.getItem('petSos_alertasUrgentes');

  
  const imagensPerfil = document.querySelectorAll('.img-perfil-global');
  if (fotoSalva) {
    imagensPerfil.forEach(img => img.src = fotoSalva);
  }

  const nomesPerfil = document.querySelectorAll('.nome-perfil-global');
  if (nomeSalvo) {
    nomesPerfil.forEach(elemento => elemento.textContent = nomeSalvo);
  }

  
  
  
  const inputNome = document.getElementById('input-nome-edit');
  const inputBio = document.getElementById('input-bio-edit');
  const inputPerfil = document.getElementById('input-perfil-edit');
  const inputSite = document.getElementById('input-site-edit');
  const inputSelo = document.getElementById('input-selo-edit');
  const inputGenero = document.getElementById('input-genero-edit');
  const inputAlertas = document.getElementById('input-alertas-edit');

  if (inputNome && nomeSalvo) inputNome.value = nomeSalvo;
  if (inputPerfil && perfilSalvo) inputPerfil.value = perfilSalvo;
  if (inputSite && siteSalvo) inputSite.value = siteSalvo;
  if (inputGenero && generoSalvo) inputGenero.value = generoSalvo;
  
  if (inputBio && bioSalva) {
    inputBio.value = bioSalva;
    if (typeof atualizarContador === 'function') atualizarContador();
  }

  if (inputSelo && seloSalvo !== null) inputSelo.checked = (seloSalvo === 'true');
  if (inputAlertas && alertasSalvos !== null) inputAlertas.checked = (alertasSalvos === 'true');

  
  
  
  const btnMudarFoto = document.getElementById('btn-mudar-foto');
  const inputFotoArquivo = document.getElementById('input-foto-arquivo');
  const fotoPerfilPreview = document.getElementById('foto-perfil-edit');

  if (btnMudarFoto && inputFotoArquivo) {
    btnMudarFoto.addEventListener('click', () => {
      inputFotoArquivo.click();
    });
  }

  if (inputFotoArquivo && fotoPerfilPreview) {
    inputFotoArquivo.addEventListener('change', (event) => {
      const arquivo = event.target.files[0];
      
      if (arquivo) {
        
        if (arquivo.size > 2.5 * 1024 * 1024) {
          alert('A foto é muito pesada! Por favor, escolha uma imagem com menos de 2MB.');
          inputFotoArquivo.value = ''; 
          return;
        }

        const leitor = new FileReader();
        leitor.onload = function(e) {
          novaFotoBase64 = e.target.result; 
          fotoPerfilPreview.src = novaFotoBase64; 
        };
        leitor.readAsDataURL(arquivo);
      }
    });
  }

  
  
  
  const formEditar = document.getElementById('form-editar-perfil');

  if (formEditar) {
    formEditar.addEventListener('submit', (event) => {
      event.preventDefault(); 

      
      if (novaFotoBase64) {
        try {
          localStorage.setItem('petSos_fotoPerfil', novaFotoBase64);
          
          imagensPerfil.forEach(img => img.src = novaFotoBase64);
        } catch (erro) {
          alert('Erro ao salvar a foto. Tente uma imagem menor.');
          console.error(erro);
          return; 
        }
      }

      
      if (inputNome) localStorage.setItem('petSos_nomeUsuario', inputNome.value);
      if (inputBio) localStorage.setItem('petSos_bioUsuario', inputBio.value);
      if (inputPerfil) localStorage.setItem('petSos_tipoPerfil', inputPerfil.value);
      if (inputSite) localStorage.setItem('petSos_site', inputSite.value);
      if (inputGenero) localStorage.setItem('petSos_genero', inputGenero.value);

      
      if (inputSelo) localStorage.setItem('petSos_seloVoluntario', inputSelo.checked);
      if (inputAlertas) localStorage.setItem('petSos_alertasUrgentes', inputAlertas.checked);

      
      if (inputNome) {
        nomesPerfil.forEach(elemento => elemento.textContent = inputNome.value);
      }

      alert('Perfil atualizado com sucesso!');
    });
  }
});

function atualizarContador() {
  const bio = document.getElementById('input-bio-edit');
  const contador = document.getElementById('contador-bio');
  if (bio && contador) {
    contador.textContent = `${bio.value.length} / 150`;
  }
}