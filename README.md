# Calendário de Luta

Site estático com o calendário de atividades do segundo turno. Para cada atividade, gera:

- **Mensagem de WhatsApp** pronta para colar (com negrito, emojis e só os campos preenchidos);
- **Panfleto em PNG** (1080 × 1350 px) para compartilhar.

Sem build, sem dependências para instalar: HTML, CSS e JavaScript puro.

## Editando a agenda

A agenda vem da planilha do Google publicada na web (link em `CSV_URL`, no arquivo `js/config.js`): é só editar a planilha que o site se atualiza. O arquivo `data/agenda.csv` fica como modelo e cópia local, no formato brasileiro: colunas separadas por ponto e vírgula (`;`), datas no formato dia/mês/ano e acentos em UTF-8. Ele abre direto no Excel, no LibreOffice e no Google Planilhas.

| coluna | obrigatória | exemplo |
|---|---|---|
| `Título` | sim | Panfletagem na Feira da Vila |
| `Descrição` | não | Leve água e boné! |
| `Tipo` | não | Panfletagem, Formação, Ato… (texto livre) |
| `Dia` | sim | `17/10/2026`, `17/10` ou `2026-10-17` |
| `Horário` | não | `9h`, `9h30` ou `09:30` |
| `Local` | não | Praça Central, em frente ao coreto |
| `Término` | não | `12h` → aparece como "9h às 12h" |
| `Contato` | não | Ana – (11) 90000-0000 |
| `Link` | não | link do Maps, do Instagram, inscrição etc. |
| `Visível` | não | caixa de seleção: desmarcada = a atividade não aparece no site |
| `Cancelado` | não | caixa de seleção: marcada = a atividade aparece como cancelada |
| `Motivo Cancelamento` | não | Chuva, Remarcado, ou uma frase curta |

**Coluna `Visível`:** serve para guardar na planilha atividades ainda incompletas (rascunhos) sem mostrá-las no site. No Google Planilhas, selecione a coluna e use **Inserir → Caixa de seleção**. Atenção: ao inserir, todas as caixas começam desmarcadas, então marque as atividades que já devem aparecer. Célula vazia ou planilha sem essa coluna = atividade visível.

**Colunas `Cancelado` e `Motivo Cancelamento`:** marque `Cancelado` (também com **Inserir → Caixa de seleção**) quando uma atividade não for mais acontecer. Ela continua no site, riscada e com a etiqueta "Cancelada" e o motivo, e deixa de ser a "próxima" atividade. A mensagem de WhatsApp e o panfleto viram um aviso de cancelamento, para avisar os grupos que já tinham sido convidados. O motivo é opcional: uma palavra ("Chuva", "Remarcado") ou uma frase curta ("Remarcado para sábado, 17/10, no mesmo horário"). Célula vazia ou planilha sem a coluna = atividade confirmada.

Ao salvar no Excel, use **"CSV UTF-8 (delimitado por vírgulas)"** ou **"CSV (separado por vírgulas)"**: o site entende os dois, com `;` ou `,` como separador, e não importa se os cabeçalhos estão com ou sem acento, em maiúsculas ou minúsculas. Planilhas antigas com cabeçalhos em inglês (`title`, `day`…) continuam funcionando.

Linhas sem título ou com data inválida são ignoradas e aparecem num aviso no topo da página.

A agenda é carregada automaticamente ao abrir o site.

### Usando uma planilha online

Em vez do arquivo local, dá para ler direto de uma planilha pública do Google Planilhas:

1. Na planilha: **Arquivo → Compartilhar → Publicar na Web**, escolha a aba e o formato **CSV (.csv)** e copie o link.
2. Em `js/config.js`, troque o valor de `CSV_URL` por esse link.

Assim, quem edita a planilha atualiza o site sem precisar publicar nada de novo (o Google pode levar alguns minutos para refletir as mudanças).

## Rodando localmente

O navegador não deixa ler o CSV abrindo o `index.html` direto (`file://`), então suba um servidor simples:

```sh
python3 -m http.server 8000
```

e acesse <http://localhost:8000>.

## Publicando

Qualquer hospedagem estática serve (GitHub Pages, Netlify, Cloudflare Pages…): é só publicar a pasta inteira. Para atualizar a agenda, troque o `data/agenda.csv` e publique de novo.

## Funcionando sem internet

O `sw.js` (service worker) guarda uma cópia do site e da planilha a cada visita. Com internet, o site sempre busca a versão mais nova; sem internet, abre a última cópia salva e avisa no topo da página desde quando ela é. Ao criar um arquivo novo que o site carrega (CSS, JS, fonte), acrescente-o à lista `SHELL` do `sw.js` para que ele funcione offline já na primeira visita.

## Instalando como app

O site pode ser instalado na tela inicial do celular ou no computador, abrindo em janela própria e funcionando sem internet:

- **Android (Chrome):** menu ⋮ → **Instalar app** (ou **Adicionar à tela inicial**).
- **iPhone (Safari):** botão Compartilhar → **Adicionar à Tela de Início**.
- **Computador (Chrome/Edge):** ícone de instalar na barra de endereço.

O que faz isso funcionar: `manifest.webmanifest` (nome, cores, ícones e capturas de tela mostradas na janela de instalação), as tags no `<head>` do `index.html` e o `sw.js`. A instalação só aparece com o site em HTTPS (ou em `localhost`).

- **Ícones** (`assets/icons/`): vêm de `assets/icon.html`. Para refazer, sirva a pasta e tire um print da página no tamanho de cada ícone: `icon.html#any` com fundo transparente para `icon-192.png`/`icon-512.png`, e `icon.html#maskable` para `icon-maskable-*.png` e `apple-touch-icon.png` (180 × 180).
- **Capturas** (`assets/screenshots/`): prints do próprio site, 390 × 844 em densidade 2 (celular) e 1440 × 900 (computador). Se mudar o tamanho, atualize `sizes` no manifesto.

## Prévia do link

Quando alguém cola o link do site no WhatsApp (ou Telegram, Facebook…), aparece uma prévia com título, descrição e imagem. Ela vem das tags `og:` no `<head>` do `index.html` e da imagem `assets/og-image.png` (1200 × 630).

- Se o endereço do site mudar, troque `https://calendario.rsensato.com/` nas tags `og:url`, `og:image` e `canonical` do `index.html`.
- Para mudar a imagem, edite `assets/og-image.html`, abra pelo servidor local (`http://localhost:8000/assets/og-image.html`), tire um print de exatamente 1200 × 630 (no Chrome: DevTools → modo dispositivo em 1200 × 630 → menu ⋮ → "Capturar captura de tela") e salve por cima de `assets/og-image.png`.
- O WhatsApp guarda a prévia em cache por um tempo: depois de mudar, um link novo (ex.: `https://calendario.rsensato.com/?v=2`) mostra a versão atualizada.

## Personalizando

Tudo que costuma mudar fica em `js/config.js`:

- `CSV_URL`: de onde vem a agenda (arquivo local ou planilha publicada).
- `APP_NAME`: nome que aparece no topo do site e nos panfletos.
- `CITY`: a cidade das atividades (hoje `Dourados/MS`), mostrada embaixo do nome e no começo de cada mensagem de WhatsApp. Se mudar, troque também nas tags do `<head>` do `index.html` e em `assets/og-image.html`.
- `ELECTION_DATE` / `ELECTION_LABEL`: o ponto final da linha e a contagem regressiva.

Outros textos:

- Frase final da mensagem de WhatsApp: `CLOSING_LINE` em `js/whatsapp.js`.
- Frase que fecha todo panfleto: `FLYER_SLOGAN` em `js/flyer.js`.
- Estilos de panfleto: são 10, escolhidos no seletor da aba Panfleto (o site lembra o último usado). Cada estilo é uma função em `js/flyer.js` (lista `FLYER_STYLES`) com o visual em `css/flyers.css`.
- Cores: variáveis no topo de `css/style.css`; cores dos tipos de atividade em `js/types.js`.

## Estrutura

```
index.html
css/style.css       estilos do site
css/flyers.css      os 10 estilos de panfleto
fonts/              fontes Barlow (hospedadas no próprio site)
js/config.js        configurações (planilha, nome, data da eleição)
js/app.js           carrega a agenda e liga a interface
js/line.js          a linha (visão principal)
js/month.js         a visão de mês
js/flyer.js         estilos de panfleto e exportação PNG
js/whatsapp.js      montador da mensagem de WhatsApp
js/types.js         cores e etiquetas dos tipos de atividade
js/icons.js         ícones
js/csv.js           leitor de CSV
js/events.js        normaliza linhas, datas e horários
js/vendor/          html-to-image (gera o PNG)
data/agenda.csv     modelo e cópia local da agenda
assets/             imagem da prévia do link (og-image) e sua fonte HTML
```
