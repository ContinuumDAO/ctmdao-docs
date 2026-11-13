## Agent chat

Open the harness from the **cat icon** (bottom-right) after [Provider](/ContinuumDAO/MPAWallet/AIHarness/Configure.md#1-link-an-llm-required-for-the-agent) is saved. The same composer is used in ordinary chat and in [Plan mode](/ContinuumDAO/MPAWallet/AIHarness/PlanMode.md).

Type a message and press **Enter**. **Shift+Enter** adds a line. Type **`/`** for commands.

---

### Slash commands

**`/`** opens a menu. Arrow keys move, **Tab** completes, **Enter** sends. A name in green is an exact match.

| Command | Example | Effect |
|---------|---------|--------|
| **`/load_skill`** | `/load_skill hedging-trade` | Loads that skill into this chat. Add words to ask something in the same turn: `/load_skill chart-defaults plot ETH 1h`. |
| **`/load_web3_protocol`** | `/load_web3_protocol uniswap quote 1 ETH to USDC on Linea` | Loads a DeFi protocol pack, then sends the rest of the line. |
| **`/load_mcp_server_external`** | `/load_mcp_server_external coinbase-public` | Loads an installed MCP server other than built-in **`continuum`**. |
| **`/run_mcp_tool`** | `/run_mcp_tool list_defi_protocols` | Runs one tool from the node catalog. `/run_mcp_tool list_defi_protocols ?` shows its description. Missing fields open a small form. |
| **`/upload_image_or_pdf`** | `/upload_image_or_pdf` | Opens the file picker. See [Images and PDFs](#images-and-pdfs). |

Your own commands appear in the same menu. See [Custom prompts](#custom-prompts).

For **`/load_skill`**, **`/load_web3_protocol`**, and **`/load_mcp_server_external`**, the bubble shows the `/` line and the model receives the words after the name, with that skill, protocol, or server already loaded. A name on its own only loads that context; type the question on the next line.

---

### For AI agents — slash commands

`search_continuum_docs` (`slash commands` / `load_skill`) then `get_continuum_doc` path `ContinuumDAO/MPAWallet/AIHarness/AgentChat` section `for-ai-agents-slash-commands`.

The host expands a `/` line before the model runs. Treat it as a preload, and answer the expanded message.

| Preload | Field |
|---------|--------|
| **`/load_skill`** | `skill` — catalog or `user_folder/skills/<name>/SKILL.md`. A catalog skill with the same name hides the workspace copy. |
| **`/load_web3_protocol`** | `protocolId` |
| **`/load_mcp_server_external`** | `mcpServerId` — installed servers only. **`continuum`** is already loaded. |
| **`/run_mcp_tool`** | The host calls the tool. One missing string argument can be the trailing text; then summarize that result. Skip a second call. |
| Name only | Context is loaded. The user message is “Context was loaded for this conversation.” Wait for the next line. |

External agents (Cursor, Claude, and similar) cannot type into this composer. Give the operator one exact line to paste.

---

### Custom prompts

**AI Agent → Prompts** stores commands as `user_folder/prompts/<name>.md`. The filename is the command. **Save** and **Delete** need a management signature. You can edit the same files under **Workspace → prompts/**.

**Name** is kebab-case (`market-brief`). These names are reserved: `load_skill`, `load_web3_protocol`, `load_mcp_server_external`, `run_mcp_tool`, `upload_image_or_pdf`.

**Description** is the menu line. **Argument hint** is grey placeholder text (for example `[pair]`). **Body** is the prompt, with Pi-style placeholders:

| Token | Meaning |
|-------|---------|
| `$1`, `$2` | That argument |
| `$ARGUMENTS`, `$@` | All arguments |
| `${1:-ETH}` | Argument 1, or `ETH` when it is empty |
| `${@:2}` | Arguments from 2 onward |
| `${@:2:3}` | Three arguments starting at 2 |

Example — save as `market-brief`:

```markdown
---
description: Summarize a market before a trade
argument-hint: "[pair]"
---
Summarize ${1:-ETH} for a trade idea. Cover trend, key levels, and what would invalidate the idea.
```

`/market-brief BTC` sends: “Summarize BTC for a trade idea. …”
`/market-brief` sends the same prompt with **ETH**.

The bubble shows the filled-in template.

---

### For AI agents — prompts

Write a template with `agent_write_file` at `prompts/<name>.md`. The stem is kebab-case and must not be a reserved command. Frontmatter keys the host reads are `description` and `argument-hint`. The body is what the model sees after substitution. Substitution does not run again inside an argument value.

There is no separate prompts API. The Prompts tab signs `writeUserFolderFile`. External agents coach the operator through **AI Agent → Prompts → Save**.

---

### Images and PDFs

Attach a file with **`/upload_image_or_pdf`**, by dropping it on the composer, or by pasting it ([Paste](#paste)).

| Limit | Value |
|-------|--------|
| Types | PNG, JPEG, WEBP, GIF, PDF |
| Count | 4 per message |
| Images | 4 MB |
| PDFs | 10 MB |

Ask a question with the file, or send the file alone. A file alone is read as “what does this contain?”

The node turns the file into text, then the model answers from that text:

- **Images** — the configured chat model transcribes visible text, labels, errors, and how the regions are laid out.
- **PDFs** — the text layer is extracted, up to 64,000 characters. A scanned PDF with no text layer is rejected.

A copy is kept at `user_folder/data/chat-uploads/<conversation>/`.

Examples:

- Drop a revert screenshot and ask “What failed, and which contract?”
- Attach a PDF spec and ask “Which functions would we call from Compose?”

---

### For AI agents — images and PDFs

The model sees each file as text on the user message: `[Attachment filename → path]` plus the transcript. It does not receive the raw bytes on that turn.

Read the stored file again with **`agent_read_document`** (`path`, and for a long PDF `offset` / `limit`). Image transcripts are not paged. Quote only what the transcript contains. A scanned PDF returns no text layer — ask for a text PDF or a screenshot of the page.

**`agent_write_user_skill`** `body` is markdown or that transcript.

---

### Paste

Click the composer and paste (**Ctrl+V** / **Cmd+V**).

- **Text** lands in the draft. Copy a compiler log, paste it, then ask “Explain the first error.”
- **An image or PDF** on the clipboard becomes an attachment (a copied screenshot, or a file copied from the desktop). Text copied with the file stays in the draft.

Leave API keys, seeds, and management private keys out of the paste.

---

### For AI agents — clipboard

Paste is a UI action. There is no tool that reads the operator’s clipboard. When they say they pasted a screenshot, use the attachment transcript already on the user message. Call **`agent_read_document`** only for another pass at the stored path.

External agents: tell the operator to focus the composer and paste. Tell them to leave secrets out of that paste.

---

### Skills from chat

Ask in ordinary chat. Example: “Save the checklist we just wrote as a skill named `pre-compose-check`.”

The agent asks, in one message, for the **name** and a **one-line description**, then writes `user_folder/skills/<name>/SKILL.md`.

The row shows on **AI Agent → Skills** as load-on-demand (**Initial load** stays off). Use it with `/load_skill pre-compose-check`, or ask the agent to load it.

The name starts with a letter, then letters, digits, hyphens, or underscores. A name that matches an installed catalog skill is refused, because the catalog copy would be the one that loads. Replacing an existing workspace skill needs an explicit overwrite.

The Skills tab can still create or upload a skill (**+**, or a `.md`, `.txt`, or text-layer PDF). Catalog skills live in `agent_llm_config/Skills/` and are the ones that can be marked **Initial load**.

---

### For AI agents — workspace skills

Call **`agent_write_user_skill`** only after this chat has both a `name` and a one-line `description`. If either is missing, ask for both in one message, then stop until the user answers.

| Argument | Rule |
|----------|------|
| `name` | `a-z`, then `a-z`, `0-9`, `-`, `_` |
| `description` | When to load it. One line, at most 1024 characters. |
| `body` | Markdown. Omit a second frontmatter block unless its `name` and `description` already match. |
| `overwrite` | `true` only when the user asked to replace that workspace skill. |

Then tell them it loads with **`agent_load_skill`** (or `/load_skill`). Leave **Initial load** alone — that flag is catalog-only. If a catalog skill already uses the name, pick another name.

The Skills tab signs **`POST /addSkill`** (catalog) or **`POST /upsertWorkspaceSkill`** (workspace). External agents coach that screen.

---

### Chat in any language

Type in the language you want the reply in. There is no language setting. The Telegram bot does the same — see [Chat from Telegram](/ContinuumDAO/MPAWallet/AIHarness/TelegramMiniApp.md#chat-from-telegram).

Example: *« Je veux créer une nouvelle proposition pour le marketplace veCTM »* — the reply stays in French, and proposal tools still load.

The node keeps your words as the chat turn. For routing only, it may write a short English paraphrase (intent rules, which tool groups to open, and the `q` on **`search_continuum_docs`** / **`search_continuum_tools`**). Addresses, URLs, token symbols, and names stay as you wrote them. If that paraphrase fails, your original text is used for routing too.

---

### For AI agents — language

`search_continuum_docs` (`non-English chat`) then `get_continuum_doc` path `ContinuumDAO/MPAWallet/AIHarness/AgentChat` section `for-ai-agents-language`.

Reply in the language of the user message. The stored turn is that message. The English paraphrase is for intent rules, verification class, and English keyword search. It is not a translation of the answer.

Pass the user’s query to **`search_continuum_docs`** and **`search_continuum_tools`**. The host rewrites a non-English `q` into English and leaves the fetched page unchanged. A failed paraphrase keeps the original `q`.

Leave addresses, URLs, symbols, and proper names unchanged. Do not ask the operator to switch to English.

---

### Microphone

The **microphone** button sits beside **Send**. Click it to record, click the square to stop. The transcript is inserted into the draft (appended after any text already there). Edit it, then **Send**.

Example: click the mic and say *“Quiero un resumen de ETH en una hora”*. The Spanish sentence appears in the box. Send it like any other message.

The browser must be on **HTTPS** or **localhost**, and you allow the microphone. A missing mic, a denied permission, or silence shows an error in the chat. While it transcribes, the button shows a spinner.

Speech becomes text before the chat model runs. Which transcriber runs depends on the linked provider:

| Provider | Transcriber |
|----------|-------------|
| **`openai`** | That account’s Whisper API (`whisper-1`), same API key as chat |
| **`groq`** | Groq Whisper (`whisper-large-v3`), same API key |
| **Any other text model** | Local **whisper.cpp** on the node (`whisper-cli`, ffmpeg, and a ggml model) |

Language is detected from the audio. Clips are capped at **25 MB** and about **3 minutes**. If neither cloud Whisper nor local whisper.cpp is available, the button stays disabled (*Speech-to-text is unavailable on this node*).

In Telegram, send a voice note. The bot transcribes it and runs the turn (a caption stays above the transcript). See [Chat from Telegram](/ContinuumDAO/MPAWallet/AIHarness/TelegramMiniApp.md#chat-from-telegram).

---

### For AI agents — microphone

There is no tool that reads the microphone. The composer calls **`POST /agent/transcribe`**, puts the text in the draft, and the operator sends it. The chat completion receives that text, not audio bytes.

| Path | Rule |
|------|------|
| **`openai`** / **`groq`** with a key | Provider **`/audio/transcriptions`**. OpenAI model `whisper-1`, Groq model `whisper-large-v3`. Same key as Provider. Leave a separate Whisper key out of **Variables**. |
| **Other providers** | Local `whisper-cli` after ffmpeg (`-l auto`). Defaults: binary on `PATH`, model `/usr/local/share/whisper/ggml-base.bin`. Overrides: **`MPC_AUTH_WHISPER_BIN`**, **`MPC_AUTH_WHISPER_MODEL`**. One local transcription at a time. |
| **Neither ready** | `speechToTextSupported` is false. The mic stays disabled. |

External agents: tell the operator to use the mic on HTTPS or localhost and to allow the browser microphone. They send the message themselves after the transcript appears.

---

### Related

- [AI harness overview](/ContinuumDAO/MPAWallet/AIHarness/Overview.md)
- [Configure the AI harness](/ContinuumDAO/MPAWallet/AIHarness/Configure.md)
- [MCP servers](/ContinuumDAO/MPAWallet/AIHarness/McpServers.md)
- [Plan mode](/ContinuumDAO/MPAWallet/AIHarness/PlanMode.md)
- [Workspace rules](/ContinuumDAO/MPAWallet/ComposeTransactionFlow.md#upload-scripts-and-data-workspace-tab)
