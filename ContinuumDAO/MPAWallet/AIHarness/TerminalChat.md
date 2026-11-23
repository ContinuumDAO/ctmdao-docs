## Terminal chat

**mpa-chat** is a small program you run in a terminal on your own computer. You type a line, and the AI agent on your node replies in that same window. It is the same agent as [Agent chat](/ContinuumDAO/MPAWallet/AIHarness/AgentChat.md) in the node app. Wallet spends still go through the [MPC Accept/Reject loop](/ContinuumDAO/MPAWallet/MPCAcceptRejectLoop.md).

The node app calls this the REPL (a read-eval-print loop: you type a line, it answers, then it waits for the next line). The download page is **Node → REPL Downloads**. The program you install is named `mpa-chat`.

Link a model first: [Configure the AI harness](/ContinuumDAO/MPAWallet/AIHarness/Configure.md).

---

### Install

Packages are published for Linux: Ubuntu, Debian, Arch Linux, and Omarchy. Windows and macOS do not have a package yet. On those computers, use Agent chat in the node app.

1. Attach the node app and open **Node → REPL Downloads**.
2. Choose **Linux**, then the distribution. Omarchy uses the Arch package.
3. Download the package. The page picks the file for the processor in that browser. A normal PC is `amd64` (Ubuntu and Debian) or `x86_64` (Arch). An ARM machine is `arm64` or `aarch64`.
4. Open a terminal in the folder where the file was saved.
5. Install it with the command shown on that page.

Ubuntu or Debian:

```bash
sudo apt install ./mpa-chat_0.1.0_amd64.deb
```

Arch or Omarchy:

```bash
sudo pacman -U ./mpa-chat-0.1.0-1-x86_64.pkg.tar.zst
```

Use the file name you downloaded. The version in the name changes when a new package is published. The install also pulls in OpenSSH, which the chat uses to reach the node.

The same files are on the [mpc-config releases page](https://github.com/ContinuumDAO/mpc-config/releases/latest). If the node app cannot fetch the latest file, download it from there and run the same install command.

---

### Start a chat

mpa-chat uses an SSH tunnel that is already open. That is the tunnel from the node app, or the node itself when it is running on this computer. Both already answer on this machine, so run:

```bash
mpa-chat
```

It talks to the node at `http://127.0.0.1:8080` through that tunnel and does not ask for a password.

If there is no tunnel, give it the node’s IP address or machine name. mpa-chat opens the tunnel for you:

```bash
mpa-chat 203.0.113.10
mpa-chat your-node.example
```

An address or name on its own logs in as **`mpcnode`**. To use another account, write `you@203.0.113.10` or `you@your-node.example`.

OpenSSH opens that tunnel. A key the node already accepts is used without a password. Otherwise SSH asks for the password and does not show what you type.

You should see `Connected to http://127.0.0.1:8080` and a prompt:

```text
mpa-chat>
```

Type a message and press Enter. The reply streams into the same window. While a reply is running, the prompt shows the first characters of that conversation, for example `mpa-chat a1b2c3d4>`.

| Key or word | What it does |
|-------------|----------------|
| **Enter** | Sends the line |
| **`/help`** | Lists the commands |
| **Ctrl-C** | Stops the reply that is running and stays in the chat. If nothing is running, it tells you how to leave |
| **`logout`**, **`exit`**, **`quit`**, or **Ctrl-D** | Leaves |

For more about the command-line options, run `mpa-chat --help`. That lists the SSH port, the key file, and the ports the tunnel forwards. Inside the chat, `/help` lists the chat commands.

---

### What you can ask

Anything you would type in Agent chat works here. The same `/` commands load a skill, a DeFi protocol, an extra MCP server, or one tool. See [Slash commands](/ContinuumDAO/MPAWallet/AIHarness/AgentChat.md#slash-commands). Your own prompts and an enabled plugin’s command appear the same way. `/name?` prints that prompt’s description and the words it expects.

A picture or PDF on this computer:

```text
/upload_image_or_pdf ./chart.png What is this level?
```

PNG, JPEG, WebP, GIF, and PDF are accepted. Images up to **4 MB**, PDFs up to **10 MB**. Leave off the question and it sends “Look at this file.”

| Command | What it does |
|---------|----------------|
| **`/new`** | Starts a fresh conversation |
| **`/conversations`** | Lists conversations stored on the node |
| **`/use`** and the id | Opens that conversation and prints the recent lines |
| **`/stop`** | Asks the node to cancel the current reply |
| **`/plan`** | Lists plans. **`/plan new`** starts one and asks for the mode if you leave it out. **`/plan show`** prints the plan. **`/plan run`** executes it. See [Plan mode](/ContinuumDAO/MPAWallet/AIHarness/PlanMode.md) |
| **`/cron`** | Lists scheduled jobs. You can add, change, run, or remove one from here. See [Cron](/ContinuumDAO/MPAWallet/AIHarness/Overview.md#cron) |
| **`/hooks`** | The same for webhooks. See [Webhooks](/ContinuumDAO/MPAWallet/AIHarness/Overview.md#webhooks) |
| **`/skills`** | Lists skills |
| **`/mcp`** | Lists MCP servers |

If the agent needs a decision from you, it prints the question and waits. Type **`accept`**, **`decline`**, or **`cancel`**. Anything else is treated as cancel.

Adding or changing a schedule, a webhook, or an MCP server is signed with the management key stored on the node. The terminal does not open a browser signature. A spend still waits for the group to Accept.

Charts, menus, and other pictures that Agent chat draws in the browser are not drawn here. The window prints a line that the picture was not shown. Open Agent chat in the node app to see them.

---

### For AI agents — terminal chat

`search_continuum_docs` (`mpa-chat` / `REPL` / `terminal chat`) then `get_continuum_doc` path `ContinuumDAO/MPAWallet/AIHarness/TerminalChat`.

You cannot type into this program. Give the operator one exact command to paste.

Install is a Linux package from **Node → REPL Downloads**, or the matching asset on `https://github.com/ContinuumDAO/mpc-config/releases/latest`. Ubuntu/Debian: `sudo apt install ./<file>.deb`. Arch and Omarchy: `sudo pacman -U ./<file>.pkg.tar.zst`. The package depends on OpenSSH. There is no Windows or macOS package.

With no address, `mpa-chat` uses an SSH tunnel that is already open (or a node on this computer) at `http://127.0.0.1:8080`. If there is no tunnel, `mpa-chat <ip-or-hostname>` opens one as `mpcnode@host` and forwards 3333, 8080, 18080, and 8446. `user@host` uses that account. Tell the operator to run `mpa-chat --help` for the command-line options. A read JWT, when the listener is Browser HTTPS, is `--token` or `token` in `mpc-chat/config.yaml` under the user config directory (`~/.config/mpc-chat/config.yaml` on Linux). The SSH-tunnel path does not need it.

Chat commands are `/help`, `/new`, `/stop`, `/conversations`, `/use`, `/cron`, `/hooks`, `/plan`, `/skills`, `/mcp`, `/load_skill`, `/load_web3_protocol`, `/load_mcp_server_external`, `/run_mcp_tool`, `/upload_image_or_pdf`, and custom `/name` prompts. `logout`, `exit`, `quit`, and Ctrl-D leave. Ctrl-C cancels the current turn.

Cron, webhook, and add-MCP writes are signed on the node with the on-disk Ed25519 management key. There is no browser signature step. Warn the operator before a command that adds, changes, or removes a job or webhook. Spending still uses the MPC Accept/Reject loop.

Graphic events (`pattern_menu`, `trend_menu`, `analysis_menu`, `trade_ideas`, `image`, and the other browser cards) are not rendered. Tell the operator to open Agent chat in the node app for those.

### Related

- [AI harness overview](/ContinuumDAO/MPAWallet/AIHarness/Overview.md)
- [Agent chat](/ContinuumDAO/MPAWallet/AIHarness/AgentChat.md)
- [Configure the AI harness](/ContinuumDAO/MPAWallet/AIHarness/Configure.md)
- [Plan mode](/ContinuumDAO/MPAWallet/AIHarness/PlanMode.md)
- [Telegram Mini App](/ContinuumDAO/MPAWallet/AIHarness/TelegramMiniApp.md)
- [Attach your node](/ContinuumDAO/MPAWallet/AttachYourNode.md)
