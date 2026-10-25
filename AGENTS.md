# AGENTS.md — Convite da Giulia

## Escopo e contexto

Estas instruções valem para todo o repositório. Responda à usuária em português e mantenha os textos do convite em português do Brasil.

O projeto é um convite interativo de 15 anos da Giulia, feito com HTML, CSS e JavaScript puros. Não há framework, `package.json`, dependências de instalação, backend, banco de dados, etapa de build, suíte de testes ou workflow de CI versionado. Preserve essa estrutura simples nas alterações comuns.

O endereço configurado no código é `https://gabriela-mazon.github.io/convite-giulia/`. O remoto é `https://github.com/Gabriela-Mazon/convite-giulia.git`, com branch principal `main`. O README orienta publicar pelo GitHub Pages usando `main` e a raiz `/`; isso descreve a configuração pretendida, não comprova o estado atual da publicação.

## Mapa dos arquivos

| Arquivo | Função e cuidados |
| --- | --- |
| `index.html` | Página única, metadados de compartilhamento, abertura, convite, botões sobre a arte, player e diálogo. Carrega o JS com `defer`. |
| `style.css` | Visual azul-marinho, prata e detalhes ciano; envelope de duas abas, animações, responsividade e área clicável. Há muitas regras sobrescritas posteriormente no mesmo arquivo. |
| `script.js` | `CONFIG`, abertura e repetição, ação de localização, diálogo, partículas e integração com a API de iframe do YouTube. |
| `convite-giulia.png` | Arte final em uso, 1086 × 1448, proporção 3:4, aproximadamente 2,2 MB. Aparece dentro do envelope e no convite aberto. |
| `selo-prata.png` | Selo prateado com monograma G e transparência, 1254 × 1254. É a imagem do botão de abertura. |
| `previa-whatsapp-v2.jpg` | Prévia ativa de compartilhamento, 1200 × 630, aproximadamente 42 KB. Referenciada pelos metadados Open Graph e Twitter. |
| `convite-sem-traje.png` | Arte anterior, 1086 × 1448; não está referenciada no código atual. |
| `previa-giulia.png` | Prévia anterior, 1733 × 907; não está referenciada no código atual. |
| `.nojekyll` | Arquivo marcador para servir o conteúdo estático no GitHub Pages. |
| `README.md` | Descrição curta e orientação de publicação. Inclui dados da festa, Google Maps, execução local e publicação. |

## O que já foi implementado

A análise inicial abrangeu os 17 commits de implementação entre 11 e 17 de outubro de 2026, até `8537819`, “Aplicar versao final definitiva do convite da Giulia”. Essa referência descreve a base histórica, não o HEAD atual.

- A primeira versão trouxe o envelope, o selo, os brilhos, a arte e os diálogos de detalhes.
- Depois foi adicionada a música do YouTube, iniciada pelo gesto de abrir, com sincronização, controle flutuante e alternativas em caso de erro.
- A abertura foi desacelerada; as duas abas passaram a chegar a 180 graus antes de a camada inicial desaparecer.
- Foram configurados o Google Maps e a prévia leve para WhatsApp.
- A arte foi substituída e refinada até a versão final de maior resolução. As áreas clicáveis ficaram transparentes e o rodapé perdeu o aviso de prévia.

Em 25/10/2026, por solicitação da usuária, a arte ganhou data em três colunas, ano explícito, letras em prata clara uniforme e o local em fonte sem itálico. O texto do salão foi centralizado e o ícone de localização foi reduzido e colocado à esquerda. A confirmação de presença foi removida da arte, HTML, JavaScript e CSS. Preserve essa versão atual, a abertura com duas abas e a área clicável discreta ao fazer ajustes que não peçam um redesenho.

A revisão seguinte, também em 25/10/2026, adotou a nova referência visual da usuária: fundo azul-marinho com textura diagonal discreta, balões mais realistas e brilhos finos nos cantos. A flor prateada no canto superior direito foi mantida por solicitação explícita. O nome ganhou caligrafia mais fina e os textos de apoio passaram a uma fonte serifada sem itálico, próxima da referência. O dia 20 permanece menor e o botão de localização segue à esquerda; seu centro foi ajustado à nova arte.

Por último, apenas as frases “Uma noite especial merece pessoas especiais.” e “Venha comemorar comigo!” foram colocadas em itálico. Data, local e “15 anos” continuam sem itálico. O restante do desenho foi mantido.

## Fluxo e pontos de alteração

### Abertura e repetição

- `#open-invitation` e `#open-label` chamam `openInvitation()`. `openingInProgress` evita iniciar duas aberturas simultâneas.
- A música é solicitada dentro do clique. A abertura aguarda a reprodução, uma falha/bloqueio informado pelo player ou até 4 segundos.
- O envelope é posicionado sobre a arte usando `getBoundingClientRect()` e a Web Animations API. O movimento dura 1600 ms; depois há 4800 ms para abrir e manter as abas visíveis e 1000 ms para desaparecer. A sequência visual dura aproximadamente 7,4 segundos, além da eventual espera pela música.
- Enquanto o envelope abre, o convite está visível, mas `inert`. No final, a abertura fica `hidden`, o convite volta a aceitar interação e o foco vai para o botão de localização.
- `#replay` pausa a música, oculta o controle musical e restaura a abertura, suas classes, estilos e foco.
- Os tempos estão distribuídos entre JS e CSS. Ao alterá-los, confira a sequência inteira e a repetição; não deixe a camada desaparecer antes de as abas terminarem.

### Links e dados da festa

- Altere os destinos no objeto `CONFIG`, no início de `script.js`.
- `locationUrl` já contém `https://maps.app.goo.gl/Kx4zQCqEYLbQSMhm8`.
- Não há `rsvpUrl`, botão nem fluxo de confirmação de presença. A usuária decidiu que não haverá RSVP; não o reintroduza sem nova solicitação.
- Quando existe URL, a ação abre outra aba com `noopener,noreferrer`. Quando está vazia, usa o `<dialog>` nativo. O diálogo pode ser fechado pelos botões, por Escape ou pelo clique fora dele.
- A arte e o texto alternativo informam 20 de novembro de 2026, sexta-feira, às 21h. Local: Salão de festas LaBelle Maison. Não invente endereço completo ou outros dados ausentes.
- Ao mudar dados do evento, confira também a imagem, o `alt` em `index.html` e as mensagens de fallback em `script.js`. Editar apenas o HTML não altera o texto incorporado à imagem.

### Arte e áreas clicáveis

- O ícone de localização e os textos já fazem parte do PNG. Um botão HTML transparente torna apenas a região do ícone interativa.
- A área clicável usa centro em `left:25.3%` e `top:82.2%`, `transform:translate(-50%,-50%)`, `width:10%` e `height:7.5%`, com tamanho mínimo de 44 × 44 pixels. O ícone fica à esquerda do texto do salão.
- Ao substituir ou recortar a arte, revalide essas porcentagens em telas pequenas e grandes. Mantenha as duas referências à arte principal consistentes e atualize suas dimensões HTML quando necessário.
- Preserve nomes acessíveis, textos `.sr-only`, foco visível e navegação por teclado. A transparência dos botões é uma decisão visual; não remova a indicação de foco.
- A imagem atual tem 1086 × 1448 pixels. A versão anterior de 4344 × 5792 permanece no histórico Git. Compare aparência, legibilidade e resolução antes de substituir ou otimizar a arte.
- Não exclua as imagens anteriores somente por não estarem em uso sem que a tarefa inclua essa limpeza.

### Música

- O script carrega `https://www.youtube.com/iframe_api` e cria um player em `https://www.youtube-nocookie.com`, com vídeo `88wi--Lls84`, loop, `playsinline` e volume 35.
- O player fica fora de `<main>`, deslocado para fora da tela, com `aria-hidden` e `inert`. O controle acessível é `#music-toggle`, e os avisos são atualizados em `#music-status`.
- Os estados de carregamento, intenção de tocar, reprodução e falha são controlados separadamente. Preserve o início solicitado pelo clique e a possibilidade de abrir o convite mesmo sem áudio.
- Há alternativas para falha do iframe, bloqueio de autoplay e abertura por `file:`. Use HTTP local para validar; não conclua que o player está quebrado apenas por falhar ao abrir o arquivo diretamente.
- A reprodução real depende da rede, da disponibilidade do vídeo e das políticas do navegador. Diferencie teste da interface e confirmação de áudio real.

### CSS, responsividade e acessibilidade

- Leia todas as ocorrências de um seletor antes de editá-lo: as regras do final do arquivo prevalecem sobre várias versões anteriores. Evite acumular novas sobrescritas sem necessidade ou reorganizar o arquivo inteiro em um ajuste pontual.
- O breakpoint principal é `max-width:540px`. O layout também usa `svh`, `clamp()`, proporção 3:4 e transformações 3D.
- Existem regras para `prefers-reduced-motion`, mas o suporte é parcial: `reducedMotion` está fixado em `false` no JS e há regras posteriores com `!important` que mantêm animações. Não descreva essa preferência como integralmente respeitada. Se a tarefa envolver movimento reduzido, avalie JS e a cascata CSS juntos.
- Preserve `lang="pt-BR"`, texto alternativo da arte, botões nativos, semântica do diálogo, regiões de status e o controle de foco/`inert` durante a abertura.

## Desenvolvimento e validação

Execute os comandos na raiz do clone. Não é necessário instalar pacotes.

```powershell
# Iniciar o servidor local; manter este processo aberto enquanto valida.
python -m http.server 8000 --bind 127.0.0.1
```

Abra `http://127.0.0.1:8000/`. Para verificar a sintaxe do JavaScript:

```powershell
node --check script.js
```

Não há comandos `npm install`, `npm run build` ou `npm test` definidos no repositório. Para alterações funcionais ou visuais, faça uma verificação manual proporcional à mudança:

1. Conferir abertura e convite em uma tela de celular, como 390 × 844, e em uma tela de desktop. Verificar cortes, rolagem horizontal, selo e legibilidade.
2. Abrir pelo selo e pelo texto, conferir as abas e o foco final, depois usar “Rever a abertura” e abrir novamente.
3. Conferir o alinhamento do botão de localização com o ícone à esquerda do salão. A ação deve usar a URL configurada; não deve existir botão ou diálogo de confirmação de presença.
4. Conferir teclado, foco visível e fechamento do diálogo. Se alterar animações, testar também a preferência de movimento reduzido e relatar o comportamento observado.
5. Se alterar a música, testar tocar/pausar e a abertura sem acesso ao YouTube. Não afirmar que o áudio foi ouvido sem conferência real.
6. Conferir o console e as requisições locais, quando houver navegador de teste disponível. Se a alteração for apenas documental, releitura e verificação do diff bastam.

Ao relatar a entrega, diga o que foi alterado, o que foi efetivamente verificado e o que continua pendente. Não confunda leitura do código, inspeção das imagens e teste no navegador.

## Compartilhamento e publicação

- Mantenha os caminhos de recursos relativos, pois o site usa o subcaminho `/convite-giulia/` no GitHub Pages.
- `canonical`, `og:url`, `og:image`, `og:image:secure_url` e `twitter:image` usam URLs absolutas. Se mudar o endereço ou a prévia, atualize as referências relacionadas e as dimensões/tipo da imagem.
- A versão atual usa `?v=27` no CSS, no JS e nas duas referências à arte principal. Ao atualizar esses recursos para publicação, siga o padrão existente e incremente a versão de forma consistente.
- Para trocar a imagem de compartilhamento, considere um nome novo e atualize todos os metadados correspondentes; aplicativos podem manter a prévia antiga em cache. Inspecionar o HTML não comprova a prévia real no WhatsApp.
- Publicação é separada da validação local. Verifique a solicitação vigente antes de fazer push ou alterar configurações do Pages.

## Pendências conhecidas nesta análise

- O suporte a movimento reduzido continua parcial; trate-o quando a tarefa envolver acessibilidade de animações.

Base desta orientação: leitura de todos os arquivos de texto do projeto, inspeção visual das cinco imagens e consulta ao histórico local em 25/10/2026. A sintaxe de `script.js`, as referências locais do HTML e a ausência de IDs duplicados foram conferidas. Não foram validados nesta análise o site publicado, o áudio real, o destino final do Maps ou o fluxo em navegador na análise inicial. As verificações de alterações posteriores devem ser relatadas na entrega correspondente.

Verificação da atualização visual de 25/10/2026: abertura pelo selo e pelo texto, repetição, foco final, renderização em desktop e em viewport de 390 × 844, ausência de rolagem horizontal e botão com área mínima de 44 × 44 pixels conferidos no Chrome. O botão de localização abriu o Google Maps de Espaço de Festa La Belle Maison. Sintaxe JS e referências locais conferidas. A reprodução audível da música e a publicação não foram verificadas.
