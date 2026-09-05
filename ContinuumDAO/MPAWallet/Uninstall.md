<!--
agent:
  task: uninstall-mpc-node
  audience: [human, ai-agent]
  linux_script: https://raw.githubusercontent.com/ContinuumDAO/mpc-config/main/scripts/uninstall-node-debian-ubuntu.sh
  windows_script: https://raw.githubusercontent.com/ContinuumDAO/mpc-config/main/scripts/uninstall-node-docker-desktop.sh
  macos_script: https://raw.githubusercontent.com/ContinuumDAO/mpc-config/main/scripts/uninstall-node-macos-docker-desktop.sh
  agent_doc: https://github.com/ContinuumDAO/mpc-config/blob/main/docs/UNINSTALL_NODE.md
  linux_skill: https://github.com/ContinuumDAO/mpc-config/blob/main/docs/skills/uninstall-node-linux/SKILL.md
  windows_skill: https://github.com/ContinuumDAO/mpc-config/blob/main/docs/skills/uninstall-node-windows/SKILL.md
  macos_skill: https://github.com/ContinuumDAO/mpc-config/blob/main/docs/skills/uninstall-node-macos/SKILL.md
  agents_md: https://github.com/ContinuumDAO/mpc-config/blob/main/AGENTS.md
  keywords: [uninstall node, remove node, decommission, wipe mpcnode, delete MPA wallet]
-->

## Uninstall an MPA wallet node

This page removes a Continuum MPC / MPA **node** from a machine (containers, Continuum images, host automation, the `mpc-config` folder, and on a VPS the `mpcnode` user). It does **not** uninstall Docker Engine, Docker Desktop, UFW, WireGuard, or OS packages.

### Before you delete anything

Do **one** of the following first:

1. **Back up** this node’s bootstrap key pair **and** an encrypted database backup. Store them in **separate** places. See [Backup and restoration](/ContinuumDAO/MPAWallet/BackupAndRestoration.md).
2. **Eject** your KeyGens (export the full private key and retire MPC for that address). See [Eject to Private Key](/ContinuumDAO/MPAWallet/EjectConversion.md).
3. **Transfer** all assets to another wallet.

**TSS / threshold:** if you delete this node, other nodes in the same KeyGen may no longer reach the signing threshold. A **2-of-2** wallet **freezes** if this node is gone. A **2-of-3** wallet can still sign if the other two remain.

Scripts print this warning even when an AI agent passes `--yes`.

### For AI agents

If you are an AI agent asked to uninstall, remove, decommission, or wipe a node, load the skill for the **operator’s OS** (or the target host). Discover this page with `search_continuum_docs` (`uninstall node` / `remove mpc node`) then `get_continuum_doc` path `ContinuumDAO/MPAWallet/Uninstall`.

| | |
|--|--|
| **Agent router** | [UNINSTALL_NODE.md](https://github.com/ContinuumDAO/mpc-config/blob/main/docs/UNINSTALL_NODE.md) |
| **Linux skill** | [uninstall-node-linux](https://github.com/ContinuumDAO/mpc-config/blob/main/docs/skills/uninstall-node-linux/SKILL.md) |
| **Windows skill** | [uninstall-node-windows](https://github.com/ContinuumDAO/mpc-config/blob/main/docs/skills/uninstall-node-windows/SKILL.md) |
| **macOS skill** | [uninstall-node-macos](https://github.com/ContinuumDAO/mpc-config/blob/main/docs/skills/uninstall-node-macos/SKILL.md) |
| **Repo entry** | [AGENTS.md](https://github.com/ContinuumDAO/mpc-config/blob/main/AGENTS.md) |

Warn the operator (backup / eject / transfer + TSS) **before** passing `--yes`. Interactive humans omit `--yes`.

**Remote VPS:** **ask** for the node’s **public IPv4**, then give **one** copy-paste **SSH login** with that address filled in. This is **not** an `ssh -N -L` tunnel (that is for MCP / attach). Curl runs **on** the VPS as `root@`. Do not use `curl | ssh bash -s`.

### Linux VPS (Ubuntu/Debian, as root)

On the VPS itself:

```bash
curl -fsSL "https://raw.githubusercontent.com/ContinuumDAO/mpc-config/main/scripts/uninstall-node-debian-ubuntu.sh" \
  | bash -s -- --yes
```

From your PC — ask for the public IPv4, then give this line with the IP substituted (example `203.0.113.50`):

```bash
ssh -o StrictHostKeyChecking=accept-new root@203.0.113.50 \
  'curl -fsSL "https://raw.githubusercontent.com/ContinuumDAO/mpc-config/main/scripts/uninstall-node-debian-ubuntu.sh" | bash -s -- --yes'
```

Linux Docker Desktop on this machine (keep the login user):

```bash
sudo ./scripts/uninstall-node-debian-ubuntu.sh --profile linux-desktop --yes
```

Preview: add `--dry-run`. Full flags: script `--help`.

### Windows (WSL + Docker Desktop)

Run as root **inside WSL**. Docker Desktop must be running.

```bash
curl -fsSL "https://raw.githubusercontent.com/ContinuumDAO/mpc-config/main/scripts/uninstall-node-docker-desktop.sh" \
  | sudo bash -s -- --yes
```

This also removes the WSL boot hook and Windows Scheduled Tasks `ContinuumNodeMpcAuthWatcher` / `ContinuumNodeMpcAuthWatcherPoll`. Desktop installs do not create an `mpcnode` user.

### macOS (Docker Desktop)

```bash
curl -fsSL "https://raw.githubusercontent.com/ContinuumDAO/mpc-config/main/scripts/uninstall-node-macos-docker-desktop.sh" \
  | sudo bash -s -- --yes
```

This unloads LaunchAgent `com.continuumdao.mpc-auth-watcher`. Desktop installs do not create an `mpcnode` user.

### What is removed

| Item | VPS Linux | Windows/WSL | macOS |
|------|-----------|-------------|--------|
| Compose stack + Continuum images | yes | yes | yes |
| `/var/lib/mpc-auth-docker` | yes | yes | yes |
| `mpc-config` folder | `/home/mpcnode/mpc-config` | `~/mpc-config` | `~/mpc-config` |
| systemd `mpc-auth-*` + libexec | yes | — | — |
| `mpcnode` user | yes | — | — |
| Scheduled Tasks / WSL boot | — | yes | — |
| launchd LaunchAgent | — | — | yes |

Optional afterwards: `docker extension rm continuumdao/continuum-node-installer`.

### Related

- [Install a node](/ContinuumDAO/MPAWallet/Install.md)
- [Backup and restoration](/ContinuumDAO/MPAWallet/BackupAndRestoration.md)
- [Eject to Private Key](/ContinuumDAO/MPAWallet/EjectConversion.md)
- [Agent provision and configure](/ContinuumDAO/MPAWallet/AgentProvision.md)
- [UNINSTALL_NODE.md](https://github.com/ContinuumDAO/mpc-config/blob/main/docs/UNINSTALL_NODE.md) — AI agent router
- [CREATE_NODE_ONESHOT.md](https://github.com/ContinuumDAO/mpc-config/blob/main/docs/CREATE_NODE_ONESHOT.md) — install only
