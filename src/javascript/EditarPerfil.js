document.addEventListener('DOMContentLoaded', () => {
  const STORAGE_KEYS = {
    foto: 'petSos_fotoPerfil',
    nome: 'petSos_nomeUsuario',
    bio: 'petSos_bioUsuario',
    perfil: 'petSos_tipoPerfil',
    site: 'petSos_site',
    selo: 'petSos_seloVoluntario',
    genero: 'petSos_genero',
    alertas: 'petSos_alertasUrgentes'
  };

  const LIMITE_FOTO_BYTES = 2 * 1024 * 1024; // 2MB

  let novaFotoBase64 = null;

  const elementos = {
    formEditar: document.getElementById('form-editar-perfil'),
    inputNome: document.getElementById('input-nome-edit'),
    inputBio: document.getElementById('input-bio-edit'),
    inputPerfil: document.getElementById('input-perfil-edit'),
    inputSite: document.getElementById('input-site-edit'),
    inputSelo: document.getElementById('input-selo-edit'),
    inputGenero: document.getElementById('input-genero-edit'),
    inputAlertas: document.getElementById('input-alertas-edit'),
    btnMudarFoto: document.getElementById('btn-mudar-foto'),
    inputFotoArquivo: document.getElementById('input-foto-arquivo'),
    fotoPerfilPreview: document.getElementById('foto-perfil-edit'),
    contadorBio: document.getElementById('contador-bio'),
    imagensPerfil: document.querySelectorAll('.img-perfil-global'),
    nomesPerfil: document.querySelectorAll('.nome-perfil-global'),

    biosPerfil: document.querySelectorAll('.bio-perfil-global'),
    tiposPerfil: document.querySelectorAll('.tipo-perfil-global'),
    usernameEdit: document.getElementById('username-edit'),
    fullnameEdit: document.getElementById('fullname-edit')
  };

  function lerStorage(chave) {
    return localStorage.getItem(chave);
  }

  function salvarStorage(chave, valor) {
    localStorage.setItem(chave, valor);
  }

  function atualizarContadorBio() {
    const { inputBio, contadorBio } = elementos;
    if (!inputBio || !contadorBio) return;

    const maximo = Number(inputBio.getAttribute('maxlength')) || 150;
    const atual = inputBio.value.length;
    contadorBio.textContent = `${atual} / ${maximo}`;
  }

  function aplicarFotoNaInterface(urlFoto) {
    if (!urlFoto) return;
    elementos.imagensPerfil.forEach((img) => {
      img.src = urlFoto;
    });
  }

  function aplicarNomeNaInterface(nome) {
    if (!nome) return;
    elementos.nomesPerfil.forEach((elemento) => {
      elemento.textContent = nome;
    });

    if (elementos.fullnameEdit) {
      elementos.fullnameEdit.textContent = nome;
    }
  }


  function aplicarBioNaInterface(bio) {
    if (!bio) return;
    elementos.biosPerfil.forEach((elemento) => {
      elemento.textContent = bio;
    });
  }


  function aplicarTipoPerfilNaInterface(perfil) {
    if (!perfil) return;
    elementos.tiposPerfil.forEach((elemento) => {
      elemento.textContent = perfil;
    });
  }

  function gerarUsername(nome) {
    if (!nome) return '@usuario';

    return (
      '@' +
      nome
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '')
        .replace(/[^a-z0-9_]/g, '')
    ) || '@usuario';
  }

  function aplicarUsernameNaInterface(nome) {
    if (!elementos.usernameEdit) return;
    elementos.usernameEdit.textContent = gerarUsername(nome);
  }

  function validarImagem(arquivo) {
    if (!arquivo) {
      return { valido: false, mensagem: 'Nenhum arquivo foi selecionado.' };
    }

    if (!arquivo.type.startsWith('image/')) {
      return { valido: false, mensagem: 'Selecione um arquivo de imagem válido.' };
    }

    if (arquivo.size > LIMITE_FOTO_BYTES) {
      return { valido: false, mensagem: 'A foto é muito pesada. Escolha uma imagem com menos de 2MB.' };
    }

    return { valido: true };
  }

  function preencherFormularioComDadosSalvos() {
    const fotoSalva = lerStorage(STORAGE_KEYS.foto);
    const nomeSalvo = lerStorage(STORAGE_KEYS.nome);
    const bioSalva = lerStorage(STORAGE_KEYS.bio);
    const perfilSalvo = lerStorage(STORAGE_KEYS.perfil);
    const siteSalvo = lerStorage(STORAGE_KEYS.site);
    const seloSalvo = lerStorage(STORAGE_KEYS.selo);
    const generoSalvo = lerStorage(STORAGE_KEYS.genero);
    const alertasSalvos = lerStorage(STORAGE_KEYS.alertas);

    if (fotoSalva) aplicarFotoNaInterface(fotoSalva);

    if (nomeSalvo) {
      aplicarNomeNaInterface(nomeSalvo);
      aplicarUsernameNaInterface(nomeSalvo);
    }


    if (bioSalva) aplicarBioNaInterface(bioSalva);
    if (perfilSalvo) aplicarTipoPerfilNaInterface(perfilSalvo);

    if (elementos.inputNome && nomeSalvo) {
      elementos.inputNome.value = nomeSalvo;
    }

    if (elementos.inputBio) {
      elementos.inputBio.value = bioSalva || '';
      atualizarContadorBio();
    }

    if (elementos.inputPerfil && perfilSalvo) {
      elementos.inputPerfil.value = perfilSalvo;
    }

    if (elementos.inputSite && siteSalvo) {
      elementos.inputSite.value = siteSalvo;
    }

    if (elementos.inputGenero && generoSalvo) {
      elementos.inputGenero.value = generoSalvo;
    }

    if (elementos.inputSelo && seloSalvo !== null) {
      elementos.inputSelo.checked = seloSalvo === 'true';
    }

    if (elementos.inputAlertas && alertasSalvos !== null) {
      elementos.inputAlertas.checked = alertasSalvos === 'true';
    }
  }

  function configurarContadorBio() {
    if (!elementos.inputBio) return;

    elementos.inputBio.addEventListener('input', atualizarContadorBio);
    atualizarContadorBio();
  }

  function configurarTrocaDeFoto() {
    const { btnMudarFoto, inputFotoArquivo, fotoPerfilPreview } = elementos;

    if (btnMudarFoto && inputFotoArquivo) {
      btnMudarFoto.addEventListener('click', () => {
        inputFotoArquivo.click();
      });
    }

    if (!inputFotoArquivo || !fotoPerfilPreview) return;

    inputFotoArquivo.addEventListener('change', (event) => {
      const arquivo = event.target.files?.[0];
      const validacao = validarImagem(arquivo);

      if (!validacao.valido) {
        alert(validacao.mensagem);
        inputFotoArquivo.value = '';
        novaFotoBase64 = null;
        return;
      }

      const leitor = new FileReader();

      leitor.onload = (e) => {
        novaFotoBase64 = e.target?.result || null;

        if (novaFotoBase64) {
          fotoPerfilPreview.src = novaFotoBase64;
        }
      };

      leitor.onerror = () => {
        alert('Não foi possível carregar a imagem selecionada.');
        inputFotoArquivo.value = '';
        novaFotoBase64 = null;
      };

      leitor.readAsDataURL(arquivo);
    });
  }

  function validarFormulario() {
    const nome = elementos.inputNome?.value.trim() || '';
    const site = elementos.inputSite?.value.trim() || '';

    if (!nome) {
      alert('Preencha o nome completo.');
      elementos.inputNome?.focus();
      return false;
    }

    if (site) {
      try {
        new URL(site);
      } catch {
        alert('Informe um link válido. Exemplo: https://seudominio.com.br');
        elementos.inputSite?.focus();
        return false;
      }
    }

    return true;
  }

  function salvarDadosPerfil() {
    const nome = elementos.inputNome?.value.trim() || '';
    const bio = elementos.inputBio?.value.trim() || '';
    const perfil = elementos.inputPerfil?.value || '';
    const site = elementos.inputSite?.value.trim() || '';
    const genero = elementos.inputGenero?.value || '';
    const selo = elementos.inputSelo?.checked || false;
    const alertas = elementos.inputAlertas?.checked || false;

    try {
      if (novaFotoBase64) {
        salvarStorage(STORAGE_KEYS.foto, novaFotoBase64);
        aplicarFotoNaInterface(novaFotoBase64);
      }

      salvarStorage(STORAGE_KEYS.nome, nome);
      salvarStorage(STORAGE_KEYS.bio, bio);
      salvarStorage(STORAGE_KEYS.perfil, perfil);
      salvarStorage(STORAGE_KEYS.site, site);
      salvarStorage(STORAGE_KEYS.genero, genero);
      salvarStorage(STORAGE_KEYS.selo, String(selo));
      salvarStorage(STORAGE_KEYS.alertas, String(alertas));

      aplicarNomeNaInterface(nome);
      aplicarUsernameNaInterface(nome);


      aplicarBioNaInterface(bio);
      aplicarTipoPerfilNaInterface(perfil);

      return true;
    } catch (erro) {
      console.error('Erro ao salvar perfil:', erro);
      alert('Não foi possível salvar os dados. Tente novamente ou use uma imagem menor.');
      return false;
    }
  }

  function configurarEnvioFormulario() {
    if (!elementos.formEditar) return;

    elementos.formEditar.addEventListener('submit', (event) => {
      event.preventDefault();

      const formularioValido = validarFormulario();
      if (!formularioValido) return;

      const salvou = salvarDadosPerfil();
      if (!salvou) return;

      alert('Perfil atualizado com sucesso!');
    });
  }

  function inicializar() {
    preencherFormularioComDadosSalvos();
    configurarContadorBio();
    configurarTrocaDeFoto();
    configurarEnvioFormulario();
  }

  inicializar();
});