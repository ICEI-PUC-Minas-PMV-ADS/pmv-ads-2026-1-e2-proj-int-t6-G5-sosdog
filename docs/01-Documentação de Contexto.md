# Introdução

O crescimento da população de animais em situação de rua e o alto índice de animais domésticos perdidos representam um desafio social e de saúde pública nos centros urbanos. A falta de uma plataforma centralizada e em tempo real para o monitoramento desses animais dificulta ações de resgate, assistência e reencontro por parte de tutores e protetores independentes.

Nesse contexto, surge a proposta desta aplicação: uma plataforma de monitoramento georreferenciado colaborativo, projetada para conectar a comunidade em prol da causa animal. O sistema utiliza a tecnologia de geolocalização para mapear ocorrências, diferenciando visualmente animais avistados em situação de vulnerabilidade de animais perdidos que possuem tutores em busca.


## Problema
O cenário da causa animal nos centros urbanos enfrenta um desafio crítico: a fragmentação e a volatilidade das informações. Atualmente, a gestão do bem-estar de animais comunitários e a busca por animais domésticos perdidos dependem de métodos analógicos ou de redes sociais genéricas, o que gera lacunas graves de comunicação e eficiência.

No caso dos animais em situação de rua, o principal obstáculo é a falta de um histórico de assistência. Um animal pode ser avistado por dezenas de pessoas diariamente, mas, sem um registro centralizado, o auxílio torna-se aleatório. Alguns animais permanecem invisíveis e sem qualquer suporte básico em situações de ferimentos ou doenças. Essa "ajuda desorganizada" impede que protetores independentes e órgãos de zoonoses priorizem casos críticos, resultando em um desperdício de recursos e esforços.

Para tutores de animais perdidos, o tempo é o maior inimigo. O modelo atual de divulgação baseia-se em cartazes físicos — vulneráveis ao clima e ao vandalismo — e postagens em redes sociais. Nestas últimas, o algoritmo rapidamente "enterra" os anúncios de desaparecimento sob novas publicações, tornando a informação obsoleta em poucas horas. Além disso, a descrição da localização costuma ser imprecisa ("visto perto da escola"), o que dificulta que um vizinho ou passante identifique o animal em tempo real e o contenha até a chegada do dono.

A ausência de uma ferramenta georreferenciada dedicada resulta em um fluxo de dados ruidosos. Em suma, o problema reside na falta de uma ponte tecnológica que conecte o avistamento geográfico à ação imediata, transformando a boa vontade da população em uma rede de proteção animal inteligente, precisa e funcional.

## Objetivos

 **Objetivo Geral**

Desenvolver uma plataforma colaborativa de monitoramento georreferenciado que centralize e organize informações sobre animais de rua e perdidos, utilizando a tecnologia móvel para agilizar resgates, facilitar o reencontro de animais com seus tutores e promover a assistência comunitária de forma estruturada.

 **Objetivos Específicos**
- Implementar um sistema de mapeamento dinâmico: Permitir a marcação precisa via GPS de animais avistados, utilizando uma distinção visual (pins coloridos) para diferenciar situações de abandono de casos de animais perdidos.

- Otimizar a busca e filtragem de ocorrências: Oferecer ferramentas de busca personalizada por estado de saúde, porte e tempo de avistamento, além de delimitar alertas em um raio de 5 km da posição do utilizador.

- Garantir a veracidade dos dados: Criar um mecanismo de validação social ("joinha") e uma regra de expiração temporal de 72 horas para assegurar que o mapa apresente apenas informações recentes e fidedignas, combatendo notícias falsas ou dados obsoletos.

- Facilitar a logística de busca por animais perdidos: Automatizar a criação de materiais de divulgação através de um gerador de cartazes digitais em PDF com QR Code integrado à localização do último avistamento.

- Promover o histórico de cuidados comunitários: Disponibilizar um registo de ações sociais que permita aos utilizadores informar se um animal já recebeu alimentação, água ou medicação, evitando a sobrecarga ou a negligência de cuidados.

- Fomentar a educação e auxílio emergencial: Disponibilizar uma secção informativa com legislação vigente, contactos de emergência e guias de primeiros socorros para situações de urgência animal.

## Justificativa
A proposta de desenvolvimento desta plataforma fundamenta-se na necessidade crítica de organizar a rede de apoio à causa animal por meio da tecnologia. Atualmente, o manejo de animais em situação de rua e a busca por animais perdidos dependem de métodos fragmentados, como grupos em redes sociais e cartazes físicos. Embora bem-intencionadas, essas soluções sofrem com a volatilidade das informações e a falta de precisão geográfica, o que justifica a criação de uma ferramenta centralizada e georreferenciada que transforme o avistamento casual em um dado acionável e útil.
Segundo RIBEIRO, Carolina Antunes “os cães domésticos (Canis lupus familiaris) estão presentes em todos os continentes, exceto na Antártida (Lima, 2020). Estima-se que em 2017, havia 1 bilhão em todo o mundo (ABINPET, 2019).”
Pressupõe-se que no Brasil, os cães ocupam pelo menos 31 Parques Nacionais (Meneguelli, 2023). Em um estudo realizado no Sudeste do Brasil em uma região de fragmento urbano com 250 hectares de Floresta Atlântica por (Galetti & Sazima, 2006)


A motivação para este projeto reside, primeiramente, no impacto direto na saúde pública e no bem-estar animal. Segundo dados da Organização Mundial da Saúde (OMS), o Brasil possui milhões de animais abandonados, um cenário que favorece a propagação de zoonoses e a ocorrência de acidentes urbanos. Ao permitir que a população mapeie animais feridos ou em situação de risco em tempo real, o sistema atua como um facilitador para o trabalho de ONGs e órgãos de controle de zoonoses, otimizando drasticamente o tempo de resposta em resgates críticos e intervenções de urgência.

Além disso, a ineficiência dos métodos convencionais de busca por animais domésticos é um fator determinante para este estudo. O uso de cartazes de papel e postagens em redes sociais genéricas apresenta um alcance limitado e uma "vida útil" curta, uma vez que o conteúdo é rapidamente enterrado por novos fluxos de informação, perdendo sua relevância no momento em que a precisão geográfica é mais necessária.

Outro ponto relevante que motiva a equipe é a organização do cuidado comunitário. Frequentemente, a vontade de ajudar da população é desperdiçada por falta de coordenação e histórico de assistência. Assim, o projeto não apenas soluciona um problema logístico, mas promove uma cultura de cidadania e proteção animal mediada por uma arquitetura de software robusta, confiável e voltada para a eficiência social.

## Público-Alvo
O público-alvo da aplicação é composto por cidadãos que interagem direta ou indiretamente com a causa animal, segmentados nos seguintes perfis:

- Protetores Independentes e Voluntários:
  * Pessoas que dedicam tempo ao resgate, alimentação e tratamento de animais de rua.
- Tutores de Animais de Estimação:
  * Proprietários de animais domésticos que buscam segurança ou auxílio em situações de perda.
- Observadores e Colaboradores Casuais:
  * Cidadãos que, ao presenciarem um animal em perigo ou perdido em seu trajeto, desejam ajudar sem necessariamente realizar o acolhimento físico.
- Gestores de ONGs e Abrigos:
  * Organizações que trabalham com resgate em larga escala e controle populacional.
