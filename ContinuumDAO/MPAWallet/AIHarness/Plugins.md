## Plugins

A plugin is an add-on for the AI agent on your node. It packages instructions the agent can follow, a `/` command you can type in chat, and, when the author needs it, a small program that runs on the node.

Plugins are made to be published and shared. An author installs one on their node, puts the source in a public GitHub repository, and has their group sign the release. It then appears in a public catalog. Another operator can search that catalog, read the code, and install the same plugin. You can also keep a plugin private and use it only on your own node.

A plugin earns its place when it carries a whole job you can start with one command. One package can pull price charts, run technical analysis, turn the result into a trade idea, and prepare a transaction for a venue such as Uniswap or Aave. The same idea works for a webhook: a message from Telegram, GitHub, or Slack can start the plugin’s workflow. Spending still goes through the [MPC Accept/Reject loop](/ContinuumDAO/MPAWallet/MPCAcceptRejectLoop.md). A plugin cannot hold a private key, and nothing is broadcast until group members Accept.

Open **Node → AI Agent → Plugins**. The public catalog is [mpaplugins.continuumdao.org](https://mpaplugins.continuumdao.org/index.json).

---

### Install a plugin

**Search** filters the published plugins loaded from the public catalog, by name, description, author, repository, or commit.

**Install** downloads the current version onto this node. It needs a management signature. The node checks that the file matches the published copy and that the release signature belongs to the publisher, then shows a [review](#review-before-you-enable-a-plugin) of what the plugin wants to do.

**Install local** copies a folder that is already on this node and already contains the plugin’s description file. Use it for a draft you are writing, or for a package the agent has adapted from Pi, Claude, or Codex.

When a plugin is on, its `/` command appears in the chat menu and loads the plugin’s instructions. The command name is the prompt file name. On the **Skills** tab those instructions are read-only. Turn the plugin off, update it, or remove it from this **Plugins** tab.

**Disable** turns the plugin off and leaves the files in place. **Uninstall** deletes them. Both need a management signature.

---

### What a plugin contains

A plugin is a folder. It needs at least one of these: written instructions, a chat command, or a small program.

| Part | What you get |
|------|----------------|
| **Description** | The name, version, a short summary, and the list of what the plugin is allowed to do |
| **Instructions** | Guidance the agent loads when you use the plugin |
| **Command** | A `/` command. It takes arguments the same way as [custom prompts](/ContinuumDAO/MPAWallet/AIHarness/AgentChat.md#custom-prompts) |
| **Program** | Optional code. Its tools show up in chat after you approve the plugin |

The name is lowercase words joined by hyphens, such as `hello-mpa`, and it is at most 48 characters.

These are the permissions a plugin can ask for. The usual default is read-only access to the workspace.

| Permission | What it allows |
|------------|----------------|
| **`user_folder:read`** | Read files in the workspace |
| **`user_folder:write`** | Change files in the workspace |
| **`net:https`** | Make HTTPS calls |
| **`hooks:session`** | Run when a chat starts or ends |
| **`hooks:before_tool`** | See or block a later tool call |
| **`process:spawn`** | Start a program on the node |

File names and the shape of the description file are in [For AI agents — plugins](#package-layout).

---

### Plugin coding

A plugin is instructions for the agent, plus an optional program. The instructions name tools the node already has for the wallet, charts, analysis, trade ideas, and DeFi. The agent calls those tools. The program can calculate something and hand the text back to the agent, or it can ask the group to sign. It uses the node’s preferred KeyGen address. Management keys stay on the node. The program cannot create or hold a private key.

Library names, the calls the program may make, and the tool names to write into the instructions are in [For AI agents — plugins](#entrypoint-and-libraries).

#### Charts, analysis, trade ideas, and DeFi

The instructions say which of these to use, and how to combine the numbers.

| Piece | What the agent does |
|-------|---------------------|
| **Charts** | Reads candlestick prices from the sources in [AI charting](/ContinuumDAO/MPAWallet/AICharting.md) and can draw them |
| **Technical analysis** | Runs indicators such as a moving average, RSI, or MACD on those prices. [Technical analysis](/ContinuumDAO/MPAWallet/TechnicalAnalysis.md) |
| **Trade ideas** | Turns a clear analysis into one primary idea with an entry, a target, and what would make the idea invalid. [Trade ideas](/ContinuumDAO/MPAWallet/TradeIdeas.md). **Build #N** is the path from that idea to a transaction |
| **DeFi** | Uses a protocol this node already supports, such as Uniswap, Aave, Curve, Aerodrome, GMX, or Hyperliquid. [DeFi protocol support](/ContinuumDAO/MPAWallet/DeFiProtocolSupport.md). The agent quotes a trade, builds liquidity, or builds a position |
| **Signing** | A quote or a prepared transaction stays unsigned. The agent opens the sign request later, in the same chat. Group members Accept or Reject before anything is broadcast |

One plugin can chain these: load candles, run an indicator, keep the primary idea, use the venue you named, and build the transaction. Opening the sign request is a later step.

#### Instructions and other skills

Write the order of steps, the inputs, and what to do with the result. The `/` command loads those instructions.

The same instructions can load other skills already on the node. A chart skill or a trade-idea skill stays the source of those rules. The plugin says when to load it.

#### Tools already on the node

The plugin uses the MCP servers already installed under **AI Agent → MCP Servers**. The built-in continuum server covers the wallet, DeFi, charts, and trade ideas, and it is available when a chat starts. Chart and indicator servers are loaded when the instructions ask for them. A protocol pack is loaded after you have chosen the venue. Server names and tool names are in [For AI agents — plugins](#charts-analysis-ideas-and-protocol-tools).

#### Webhooks

A webhook starts a new agent turn and can point that turn at this plugin. The prompt tells the agent to load the plugin’s instructions and apply the message that was posted. The same chart, analysis, and transaction steps then run for that event. The plugin’s own program runs when that turn calls it. Telegram, GitHub, Slack, and a plain JSON post all work this way. Secrets stay in **Variables**. The agent does not receive them. [Webhooks](/ContinuumDAO/MPAWallet/AIHarness/Overview.md#webhooks).

---

### Publish a plugin

Publishing sends a plugin that is already installed on this node to the public catalog. Other operators can then search for it and install it. The catalog checks the group signature, the file, and that the new version follows the previous one. Each node that later installs the plugin runs its own [review](#review-before-you-enable-a-plugin).

Ask the agent on this node to publish. It needs the plugin-author skill. You push the code to GitHub yourself. The node has no GitHub login.

1. Have the plugin installed on this node. Ask the agent for a first draft, write the folder yourself, or adapt a Pi, Claude, or Codex package and use **Install local**. This step only fills this node.
2. On **Plugins**, click **Download for GitHub** for that plugin. Unpack the download into a folder of the same name, commit it, and push it to a **public** GitHub repository from your own computer. Other operators have to be able to open that commit and read the code. Keep the download as the source of the commit, and keep it under 32 MB.
3. Tell the agent the repository address, the full commit, and the folder inside the repository when the plugin is not at the root. This node needs veCTM privilege. The KeyGen that signs must be a multi-agree KeyGen in that veCTM group.
4. The first public version is **v1.0.0**. A later version must be higher. It must use the same GitHub repository and folder, and the same veCTM, group, and KeyGen as the first release.
5. The node checks that the GitHub commit matches the plugin on this node, then opens a [multi-sign request](/ContinuumDAO/MPAWallet/MPCAcceptRejectLoop.md) for the release. Group members Accept or Reject. The request expires in 24 hours.
6. After members have agreed and the signature is triggered, ask the agent to finish publishing. The catalog shows the new version as current. Older versions stay available. Other nodes take the new version when they update.

The signature fields, the hash check, and the catalog record are in [For AI agents — plugins](#publish-procedure).

---

### Review before you enable a plugin

Before a plugin from the catalog or from a local folder is allowed to run, this node scans it. You see the findings on the **Installed** row, and the agent can explain them.

The scan looks for a program that would run on the node, network calls, reading or writing files, starting a shell, hooks that can see or block a later tool call, instructions that tell the agent to do those things, and text that mentions node keys.

On the **Skills** tab, **Host YAML** says whether each kind of finding is accepted or rejected. As shipped, every finding is rejected, and a package with nothing to flag is accepted. If any rule says reject, the recommendation is **do not install**.

A plugin that is only instructions and a command, and that only asks to read the workspace, turns on by itself when the scan is clean. A program, any wider permission, or any finding leaves the plugin off until you approve it.

**Review and approve** needs a management signature. Approving records what you accepted and turns the plugin on. The program can then do only what you accepted. It can read its own folder. It can read or write the rest of the workspace, open the network, or start a process only when that permission was accepted. A sentence in the instructions that mentions a shell or a web address still needs that approval. If you decline, the plugin stays off.

**Update** downloads a newer signed version from the catalog and replaces the copy on this node. The new copy stays on when it was already on, the scan has nothing new to confirm, and the review recommends install. If the program, a permission, or a finding changed, it stays off until you approve it again, the same way as a new install.

The finding names and the checks on the download are in [For AI agents — plugins](#install-and-update-scan).

---

### For AI agents — plugins

`search_continuum_docs` (`MPA plugins` / `install plugin` / `publish plugin` / `plugin coding`) then `get_continuum_doc` path `ContinuumDAO/MPAWallet/AIHarness/Plugins` section `for-ai-agents-plugins`. Package layout, entrypoint imports, tool names, the publish procedure, index fields, and the install scan are in this section.

Load **`mpa-plugin-author`** first. These tools are added with that skill. Load **`mpa-plugin-review`** before install, update, or enable, and show its recommendation (each risk, and the **accept** or **reject** rule) before asking the operator whether to continue. A plugin’s own tools appear after its skill is loaded. `/<name>` or **`agent_load_skill`** does that.

| Tool | Use |
|------|-----|
| **`agent_search_plugins`** | Index search. Optional `query` and `indexUrl`. |
| **`agent_install_plugin`** | Install by `name` or `localPath` under `user_folder`. Returns the review and leaves the permission card closed. |
| **`agent_update_plugin`** | Replace the install with the current signed repository version. Older packages stay in the repository. Returns the review and leaves the card closed. A changed entrypoint needs approval again. |
| **`agent_enable_plugin`** | Without `confirmPermissions`, returns the review and leaves the plugin off. |
| **`agent_disable_plugin`** | Turn a plugin off. Files stay. |
| **`agent_uninstall_plugin`** | Delete `plugins/<name>`. |
| **`agent_adapt_plugin`** | Rewrite a Pi, Claude, or Codex directory under `user_folder` into `mpa-plugin.json`. The original manifest stays. Unsupported Pi APIs are listed. Install afterwards. |
| **`agent_create_plugin`** | Local draft at `plugins/<name>`, version `v1.0.0`, with a skill, a `/` prompt, a `README.md`, and `user_folder:read`, then enables it. This does not publish. |
| **`agent_export_plugin_for_github`** | Check an installed plugin and tell the operator to click **Download for GitHub**. The archive is the directory to commit. |
| **`agent_create_plugin_new_version`** | Publish after that commit is pushed. Pass `repository`, the full `commit`, and `path` when the plugin is a subdirectory. The commit does not need the release stamp. The catalog keeps a `commitUrl` and rejects a private repository or a commit whose other files differ from the archive. The node needs veCTM privilege, and `keyGenId` (or the preferred KeyGen) must be a multi-agree KeyGen in that group. The first release is `v1.0.0`. A later version must be higher, from the same repository and path, and signed by the same KeyGen. Opens a multi-sign request. After members agree and the signature is triggered, call again with `requestId`. |

Call **`agent_enable_plugin`** with `confirmPermissions: true` only after the operator has read the recommendation and asked to continue. That call is the permission card. Keep it in a later step than the recommendation. If they decline, the plugin stays off. Leave key material, bootstrap, and signing endpoints out of a plugin.

External agents coach install, approval, disable, and uninstall through **AI Agent → Plugins**. Each of those buttons needs a management signature. Publishing is the node harness calling **`agent_create_plugin_new_version`**, described below. There is no publish button on the tab.

#### Package layout

Installed copies live in `user_folder/plugins/<name>`. **Install local** copies a directory under `user_folder` that already contains `mpa-plugin.json`. A source example sits at `agent_llm_config.defaults/plugins/hello-mpa` in the mpc-config tree. It is not copied into `user_folder/plugins` on a new node. Its prompt file is `prompts/hello-mpa.md`, so `/hello-mpa` appears only after that package is installed and enabled. `data/incoming/hello-mpa` is a test path. The node does not create that folder.

| Path | Role |
|------|------|
| **`mpa-plugin.json`** | Name, version, description, skills, prompts, optional entrypoint, permissions |
| **`skills/<name>/SKILL.md`** | Guidance, loaded on demand |
| **`prompts/<name>.md`** | The `/` command. Same placeholders as [custom prompts](/ContinuumDAO/MPAWallet/AIHarness/AgentChat.md#custom-prompts) |
| **`extension/`** | Optional JavaScript. Its tools appear as `plugin_<name>_<tool>` (`plugin_hello_mpa_ping`) |

The name is kebab-case, at most 48 characters. The package must include a skill, a prompt, or an entrypoint.

| Permission | Allows |
|------------|--------|
| **`user_folder:read`** | Read the workspace. This is the default |
| **`user_folder:write`** | Write under the workspace |
| **`net:https`** | HTTPS from the entrypoint |
| **`hooks:session`** | Session start and end |
| **`hooks:before_tool`** | See or block a later tool call |
| **`process:spawn`** | Run a process |

#### Entrypoint and libraries

The instructions name tools from the public packages [`@continuumdao/continuum-node-sdk`](https://www.npmjs.com/package/@continuumdao/continuum-node-sdk) and [`@continuumdao/ctm-mpc-defi`](https://www.npmjs.com/package/@continuumdao/ctm-mpc-defi). The SDK package is the tool catalog `continuum-mcp-server` runs. The DeFi package is the protocol math behind the wallet’s web3 tools. Tool names and payload shapes are in the [continuum-node-sdk](https://github.com/ContinuumDAO/continuum-node-sdk) repository.

The agent calls those tools. The entrypoint can compute and return text to that agent. `pi.preferredKeyGenAddress()` returns the node's current preferred KeyGen Ethereum address when a tool or hook runs. Management keys stay on the node. The entrypoint may `import` `ethers` to encode a call or read a contract. It cannot hold a private key: `Wallet`, `HDNodeWallet`, and `SigningKey` throw. `pi.signRequest({ chainId, to, data, value, purpose })` opens a [multi-sign request](/ContinuumDAO/MPAWallet/MPCAcceptRejectLoop.md) for the preferred KeyGen. Group members still Accept or Reject before anything is broadcast. `purpose` is the text they review. A provider needs the `net:https` permission. The entrypoint may `import express from 'express'` and register `get`, `post`, `put`, `patch`, and `delete` routes. `app.listen` needs `net:https` and listens on `127.0.0.1`. The entrypoint may `import { z } from 'zod'` to check a request body or a tool argument.

The plugin skill is the program of steps. The `/` prompt loads it with **`agent_load_skill`**. Write the order of tools, the inputs, and what to do with the result in `skills/<name>/SKILL.md`. The same skill can load other skills already on the node. A chart or trade-idea skill stays the source of those rules. The plugin skill says when to load it.

#### Charts, analysis, ideas, and protocol tools

| Piece | What the agent uses |
|-------|---------------------|
| **Candlesticks** | OHLCV from the chart sources in [AI charting](/ContinuumDAO/MPAWallet/AICharting.md). **`list_ohlcv_sources`** lists providers. A provider tool such as **`coinbase-public__get_product_candles`** returns the rows. **`prepare_chart_from_rows`** draws them. |
| **Technical analysis** | The chart analysis menu in [Technical analysis](/ContinuumDAO/MPAWallet/TechnicalAnalysis.md), and the **`technical-indicators`** MCP server (SMA, RSI, MACD, and the rest) over those rows. |
| **Trade ideas** | A clear analysis becomes a PRIMARY idea with entry, target, and invalidation. [Trade ideas](/ContinuumDAO/MPAWallet/TradeIdeas.md). **Build #N** is the agent’s path from that idea to a payload. |
| **DeFi web3 protocols** | [DeFi protocol support](/ContinuumDAO/MPAWallet/DeFiProtocolSupport.md). **`list_defi_protocols`** shows what this node has. **`load_defi_protocol`** turns one pack on (Uniswap, Aave, Curve, Aerodrome, GMX, Hyperliquid, and the others on that page). The pack’s tools quote, build liquidity, or build a position. |
| **Transaction payload** | Build tools return a quote or a helper JSON and leave the sign request closed. The agent uses that payload afterwards, in the same chat, when it calls the tool that posts **`/multiSignRequest`**. Group members still Accept or Reject before anything is broadcast. |

One skill can chain these: load candles, run an indicator, keep the PRIMARY idea, load the venue the operator named, and build the payload. Opening the sign request is a later agent step.

| Server | Role in a plugin |
|--------|------------------|
| **`continuum`** | Wallet, DeFi packs, charts, and trade ideas. Loaded at chat start. [Built-in continuum MCP](/ContinuumDAO/MPAWallet/AIHarness/McpServers.md#built-in-continuum-mcp-wallet-node). |
| **Candle and indicator servers** | **`coinmarketcap-public`**, **`coinbase-public`**, **`technical-indicators`**, and the other OHLCV servers on [MCP servers](/ContinuumDAO/MPAWallet/AIHarness/McpServers.md). The skill tells the agent to load one with **`agent_load_mcp_server`** when the chat does not already have it. |
| **A protocol pack** | **`load_defi_protocol`** after the operator has chosen the venue. |

Tools from a server other than **`continuum`** are named **`{serverId}__{toolName}`**.

A webhook starts an agent turn. It does not call the entrypoint. [Webhooks](/ContinuumDAO/MPAWallet/AIHarness/Overview.md#webhooks). Point the webhook prompt at this plugin: tell the agent to load the plugin skill and apply the posted body. Secrets stay in **Variables**. The agent does not receive them.

#### Publish procedure

Publishing sends a plugin that is already installed on this node to [mpaplugins.continuumdao.org](https://mpaplugins.continuumdao.org/index.json). The repository checks the signature, the archive hash, and the version lineage. The security review runs later, on each node that imports the package. The **Plugins** tab has no publish button. Ask this node’s harness, with **`mpa-plugin-author`** loaded.

1. Put the package at `user_folder/plugins/<name>/`. **`agent_create_plugin`** writes a local draft at `v1.0.0` (a skill, a `/` prompt, a `README.md`, and `user_folder:read`) and enables it. A hand-written directory, or a Pi, Claude, or Codex package after **`agent_adapt_plugin`** and **Install local**, is the same starting point. This step only fills this node. A local install does not need a public repository.
2. On **AI Plugins**, click **Download for GitHub** for that plugin, or ask the harness to call **`agent_export_plugin_for_github`**. The archive is the plugin directory. Extract it into a folder of the same name, commit, and push to a **public** GitHub repository from the operator’s own computer. The node has no GitHub login. The archive includes `README.md` and leaves out `.trust.json`, `.mpa-state.json`, and `.position-state.json`. Do not add a file that exists only on GitHub. The commit does not need `version`, `versionDate`, `nodeKey`, `veCtmId`, `groupId`, or `keyGenAddress`. Pass **`repository`** (`https://github.com/owner/name`), the full 40-character **`commit`**, and **`path`** when the plugin is a directory inside the repository. A private repository is refused, because other operators have to be able to open the commit and read the code. The public snapshot must fit the 32 MB catalog limit.
3. Call **`agent_create_plugin_new_version`**. The node needs veCTM privilege. **`keyGenId`**, or the preferred KeyGen, must be a secp256k1 multi-agree KeyGen in that veCTM group.
4. The first public version is **`v1.0.0`**. A later version (`v1.2.3`) must be greater. It must use the same GitHub repository and path, and the veCTM id, GroupId, and KeyGen address recorded on the first release.
5. The node writes `version`, `versionDate`, `nodeKey`, `veCtmId`, `groupId`, and `keyGenAddress` into the local `mpa-plugin.json`, downloads the commit, and refuses to sign unless every published file matches. Those six fields are left out of the comparison, so the commit can be the plugin the operator copied. It then packs a `.tar.gz` of at most 32 MB and hashes it. `.mpa-state.json`, `.trust.json`, and `.position-state.json` stay out of the archive.
6. That opens a [multi-sign request](/ContinuumDAO/MPAWallet/MPCAcceptRejectLoop.md) for an EIP-712 **`MpaPluginRelease`** (domain **MPA Wallet Plugins**, version 1, Linea chain id 59144). The signed fields are the name, version, version date, sha256, node key, veCTM id, group id, KeyGen address, repository, commit, and path. The request expires in 24 hours. Group members agree, then the signature is triggered.
7. Call **`agent_create_plugin_new_version`** again with **`requestId`**. The node posts the archive and the signature to `https://mpaplugins.continuumdao.org/publish`. The host checks the commit again, keeps the archive at `packages/<name>/<version>.tar.gz`, and replaces that name’s current row in `index.json`. **`commitUrl`** is the GitHub tree for that commit. The previous row moves into **`versions`**. Other nodes take the new current version with **`agent_update_plugin`**.

#### Index record

`index.json` keeps one current record per name. **`versions`** lists the earlier records. Each archive stays at its own URL.

| Field | Stored value |
|-------|----------------|
| **`name`** | Kebab-case package name |
| **`version`** | `v1.2.3` |
| **`versionDate`** | `YYYY-MM-DD` |
| **`description`** | Description from `mpa-plugin.json` |
| **`source`** | URL of this version’s `.tar.gz` |
| **`sha256`** | Hash of that archive |
| **`repository`** | Public `https://github.com/owner/name` URL |
| **`commit`** | Full 40-character commit hash |
| **`path`** | Directory inside the repository, empty when the plugin is the repository root |
| **`commitUrl`** | GitHub tree link for that commit, so an operator can read the code |
| **`permissions`** | Permissions declared in the manifest |
| **`nodeKey`** | Publishing node’s public key |
| **`veCtmId`** | veCTM token id attached to that node |
| **`groupId`** | Group of the signing KeyGen |
| **`keyGenAddress`** | secp256k1 address that must have produced the signature |
| **`digest`** | EIP-712 digest of the release |
| **`signature`** | 65-byte KeyGen signature |
| **`originVeCtmId`**, **`originGroupId`**, **`originKeyGenAddress`**, **`originRepository`**, **`originPath`** | Identity of the first release. Later versions have to match it |
| **`versions`** | Earlier records for this name |

Inside the archive, `mpa-plugin.json` repeats those release fields and also lists **`skills`**, **`prompts`**, an optional **`entrypoint`**, an optional **`mcp`** file, and an optional **`agentReputation`** object (`standard: EIP-8004`, plus optional `chainId`, `agentRegistry`, and `agentId`). Reputation fields are stored for a later check and are left unresolved.

#### Install and update scan

The scan runs on the node that imports or updates a package. Findings appear on the **Installed** row and in the agent’s review text. **`mpa-plugin-review.yaml`** (**Skills → Host YAML**) maps each finding to **accept** or **reject**. The shipped file rejects every finding below. A package with no findings follows **`cleanAction`**, which ships as **accept**. One **reject** rule makes the recommendation **do not install**.

| Finding | What the scan saw |
|---------|-------------------|
| **`entrypoint`** | JavaScript or TypeScript that runs after approval |
| **`shell`** | Process execution, **`process:spawn`**, or a shell script |
| **`net`** | A network call, including **`net:https`** |
| **`fs-read-user`**, **`fs-write-user`** | A read or write under the workspace |
| **`fs-read-outside`**, **`fs-write-outside`** | A path outside the plugin directory |
| **`hook-before-tool`** | A hook that can see or block a later tool call |
| **`skill-shell`**, **`skill-net`**, **`skill-write`** | Instructions that tell the agent to run a shell, fetch or search, or write a file |
| **`key-material`** | Text that mentions node key material |
| **`protocol-library`** | An entrypoint that names a covered protocol and builds that call itself, without importing the library module |
| **`http-post`**, **`http-put`**, **`http-patch`**, **`http-delete`** | A route or request for that method. Each shipped rule is reject |

The scan covers the manifest, JavaScript and TypeScript, shell scripts, and skill or prompt markdown.

**From the index.** Search → **Install**, or **`agent_install_plugin`** with a name, downloads the current archive, checks **`sha256`**, and checks that the signature recovers to **`keyGenAddress`**. The manifest’s version, date, node key, veCTM id, group, and KeyGen address must match the index row. Then the scan runs.

**From a directory.** **Install local**, or **`localPath`**, copies a tree that already has `mpa-plugin.json` and runs the same scan. Use this for a draft that is not in the index yet.

After the scan, a skill and a prompt with only **`user_folder:read`** and no findings turns on. An entrypoint, any other permission, or any finding leaves the plugin off. **Review and approve** (management signature), or **`agent_enable_plugin`** with **`confirmPermissions: true`** after the operator has asked to continue, writes **`.trust.json`**: the permissions, the entrypoint hash, the audit hash, the accepted finding ids, and the time. That turns the plugin and its entrypoint on. The entrypoint can read its own directory. It can read the rest of `user_folder` when a read or write was accepted, write there when a write was accepted, open the network when network was accepted, and start a process when shell was accepted. A skill line that mentions a shell or a URL still needs that approval, and it does not grant those rights by itself. Other paths stay blocked. If the operator declines, the plugin stays off.

**Update** is **`agent_update_plugin`**. It downloads the current index version when that version is newer than the copy on this node, repeats the hash and signature checks, and replaces `plugins/<name>`. Replacing the directory drops the previous **`.trust.json`**. The new copy stays on when three things are true: it was already on, the scan has nothing left to confirm, and the review recommends install. Otherwise it stays off and the findings are shown again, including when the entrypoint, a permission, or a finding changed. Approve it the same way as a new install.

---

### Related

- [AI harness overview](/ContinuumDAO/MPAWallet/AIHarness/Overview.md)
- [Agent chat](/ContinuumDAO/MPAWallet/AIHarness/AgentChat.md)
- [MCP servers](/ContinuumDAO/MPAWallet/AIHarness/McpServers.md)
- [AI charting](/ContinuumDAO/MPAWallet/AICharting.md)
- [Technical analysis](/ContinuumDAO/MPAWallet/TechnicalAnalysis.md)
- [Trade ideas](/ContinuumDAO/MPAWallet/TradeIdeas.md)
- [DeFi protocol support](/ContinuumDAO/MPAWallet/DeFiProtocolSupport.md)
