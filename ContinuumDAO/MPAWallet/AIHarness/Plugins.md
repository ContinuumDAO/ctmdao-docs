## Plugins

A plugin is a package on this node: a skill, a `/` command, and an optional JavaScript entrypoint. Installed copies live in `user_folder/plugins/<name>`. Wallet spends still go through the [MPC Accept/Reject loop](/ContinuumDAO/MPAWallet/MPCAcceptRejectLoop.md).

Open **Node → AI Agent → Plugins**. The public index is [mpaplugins.continuumdao.org](https://mpaplugins.continuumdao.org/index.json).

---

### Install and run

**Search** filters the index by name or description. **Index URL** overrides the default index. **Install** needs a management signature. An index install checks the archive hash and the veCTM release signature, then runs the [review](#review-on-install-and-update).

**Install local** copies a directory that already contains `mpa-plugin.json`. The placeholder `data/incoming/hello-mpa` is a path on this node. A bundled example sits at `agent_llm_config.defaults/plugins/hello-mpa` in the mpc-config tree.

An enabled plugin adds its prompt to the chat `/` menu, for example `/hello-mpa`. That prompt loads the skill. Plugin skills on the **Skills** tab are read-only. Remove the package here.

**Disable** and **Uninstall** need a management signature. Disable leaves the files in place.

---

### Package

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

---

### Publish to the repository

Publishing sends a plugin that is already installed on this node to [mpaplugins.continuumdao.org](https://mpaplugins.continuumdao.org/index.json). The repository checks the signature, the archive hash, and the version lineage. The [security review](#review-on-install-and-update) runs later, on each node that imports the package.

The **Plugins** tab has no publish button. Ask this node’s harness, with **`mpa-plugin-author`** loaded.

1. Put the package at `user_folder/plugins/<name>/`. **`agent_create_plugin`** writes a local draft at `v1.0.0` (a skill, a `/` prompt, and `user_folder:read`) and enables it. A hand-written directory, or a Pi, Claude, or Codex package after **`agent_adapt_plugin`** and **Install local**, is the same starting point. This step only fills this node. A local install does not need a public repository.
2. Commit those same files to a **public** GitHub repository. `mpa-plugin.json` in that commit must already contain this release’s `version`, `versionDate` (UTC `YYYY-MM-DD`), `nodeKey`, `veCtmId`, `groupId`, and `keyGenAddress`. Pass **`repository`** (`https://github.com/owner/name`), the full 40-character **`commit`**, and **`path`** when the plugin is a directory inside the repository. A private repository is refused, because other operators have to be able to open the commit and read the code. The public snapshot must fit the 32 MB catalog limit.
3. Call **`agent_create_plugin_new_version`**. The node needs veCTM privilege. **`keyGenId`**, or the preferred KeyGen, must be a secp256k1 multi-agree KeyGen in that veCTM group.
4. The first public version is **`v1.0.0`**. A later version (`v1.2.3`) must be greater. It must use the same GitHub repository and path, and the veCTM id, GroupId, and KeyGen address recorded on the first release.
5. The node writes those release fields into the local `mpa-plugin.json`, downloads the commit, and refuses to sign unless every published file matches. It then packs a `.tar.gz` of at most 32 MB and hashes it. `.mpa-state.json` and `.trust.json` stay out of the archive.
6. That opens a [multi-sign request](/ContinuumDAO/MPAWallet/MPCAcceptRejectLoop.md) for an EIP-712 **`MpaPluginRelease`** (domain **MPA Wallet Plugins**, version 1, Linea chain id 59144). The signed fields are the name, version, version date, sha256, node key, veCTM id, group id, KeyGen address, repository, commit, and path. The request expires in 24 hours. Group members agree, then the signature is triggered.
7. Call **`agent_create_plugin_new_version`** again with **`requestId`**. The node posts the archive and the signature to `https://mpaplugins.continuumdao.org/publish`. The host checks the commit again, keeps the archive at `packages/<name>/<version>.tar.gz`, and replaces that name’s current row in `index.json`. **`commitUrl`** is the GitHub tree for that commit. The previous row moves into **`versions`**. Other nodes take the new current version with **`agent_update_plugin`**.

---

### Index record

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

---

### Review on install and update

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

The scan covers the manifest, JavaScript and TypeScript, shell scripts, and skill or prompt markdown.

**From the index.** Search → **Install**, or **`agent_install_plugin`** with a name, downloads the current archive, checks **`sha256`**, and checks that the signature recovers to **`keyGenAddress`**. The manifest’s version, date, node key, veCTM id, group, and KeyGen address must match the index row. Then the scan runs.

**From a directory.** **Install local**, or **`localPath`**, copies a tree that already has `mpa-plugin.json` and runs the same scan. Use this for a draft that is not in the index yet.

After the scan, a skill and a prompt with only **`user_folder:read`** and no findings turns on. An entrypoint, any other permission, or any finding leaves the plugin off. **Review and approve** (management signature), or **`agent_enable_plugin`** with **`confirmPermissions: true`** after the operator has asked to continue, writes **`.trust.json`**: the permissions, the entrypoint hash, the audit hash, the accepted finding ids, and the time. That turns the plugin and its entrypoint on. The entrypoint can read its own directory. It can read the rest of `user_folder` when a read or write was accepted, write there when a write was accepted, open the network when network was accepted, and start a process when shell was accepted. A skill line that mentions a shell or a URL still needs that approval, and it does not grant those rights by itself. Other paths stay blocked. If the operator declines, the plugin stays off.

**Update** is **`agent_update_plugin`**. It downloads the current index version when that version is newer than the copy on this node, repeats the hash and signature checks, and replaces `plugins/<name>`. Replacing the directory drops the previous **`.trust.json`**. The new copy stays on when three things are true: it was already on, the scan has nothing left to confirm, and the review recommends install. Otherwise it stays off and the findings are shown again, including when the entrypoint, a permission, or a finding changed. Approve it the same way as a new install.

---

### For AI agents — plugins

`search_continuum_docs` (`MPA plugins` / `install plugin` / `publish plugin`) then `get_continuum_doc` path `ContinuumDAO/MPAWallet/AIHarness/Plugins` section `for-ai-agents-plugins`. Publish steps and index fields: [Publish to the repository](#publish-to-the-repository). Import and update scan: [Review on install and update](#review-on-install-and-update).

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
| **`agent_create_plugin`** | Local draft at `plugins/<name>`, version `v1.0.0`, with a skill, a `/` prompt, and `user_folder:read`, then enables it. This does not publish. |
| **`agent_create_plugin_new_version`** | Publish. Pass public `repository`, full `commit`, and optional `path`. The catalog keeps a `commitUrl` and rejects a private repository or a commit whose files differ from the archive. The node needs veCTM privilege, and `keyGenId` (or the preferred KeyGen) must be a multi-agree KeyGen in that group. The first release is `v1.0.0`. A later version must be higher, from the same repository and path, and signed by the same KeyGen. Opens a multi-sign request. After members agree and the signature is triggered, call again with `requestId`. |

Call **`agent_enable_plugin`** with `confirmPermissions: true` only after the operator has read the recommendation and asked to continue. That call is the permission card. Keep it in a later step than the recommendation. If they decline, the plugin stays off. Leave key material, bootstrap, and signing endpoints out of a plugin.

External agents coach install, approval, disable, and uninstall through **AI Agent → Plugins**. Each of those buttons needs a management signature. Publishing is the node harness calling **`agent_create_plugin_new_version`**, described above. There is no publish button on the tab.

---

### Related

- [AI harness overview](/ContinuumDAO/MPAWallet/AIHarness/Overview.md)
- [Agent chat](/ContinuumDAO/MPAWallet/AIHarness/AgentChat.md)
- [MCP servers](/ContinuumDAO/MPAWallet/AIHarness/McpServers.md)
