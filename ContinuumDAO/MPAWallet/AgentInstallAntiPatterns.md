<!--
agent:
  task: agent-install-anti-patterns
  audience: [ai-agent, human]
  keywords: [install anti-patterns, wrong install, mpcnode, root only, custom folder, Windows agent, recovery]
-->

## Agent install anti-patterns (and recovery)

This page documents **common mistakes** when an AI agent (or operator) installs a Continuum MPA node **without** following [Agent provision and configure](/ContinuumDAO/MPAWallet/AgentProvision.md). Use it to **recognize**, **prevent**, and **fix** non-standard installs.

Humans doing a **deliberate advanced manual** install may still use [Running an MPC Node](/ContinuumDAO/RunningInstructions/NodeRunningInstruction.md) — that path is valid when you know what you are doing. This page is about **accidental** improvisation.

### Anti-pattern 1 — VPS: everything as root, no `mpcnode` user

**Symptoms**

- `id mpcnode` fails or user does not exist
- Repo lives under `/root/...` or a random path such as `/opt/continuum-node`
- Agent ran `git clone`, `docker compose up`, or `process_config.sh` directly as root

**Why it breaks the playbook**

- SSH tunnels and attach expect **`mpcnode@`** (see [Agent provision §1b](/ContinuumDAO/MPAWallet/AgentProvision.md#1b-set-the-mpcnode-login-password-required-before-the-tunnel))
- Ownership, sudo, and docker group membership for day-to-day ops are wrong
- Updates via MPA Maintenance and documented paths assume `/home/mpcnode/mpc-config`

**What agents should do instead (greenfield Ubuntu/Debian VPS)**

Run **only** the published one-shot (as root — the script creates `mpcnode` for you):

```bash
curl -fsSL "https://raw.githubusercontent.com/ContinuumDAO/mpc-config/main/scripts/install-node-debian-ubuntu.sh" \
  | bash -s -- \
      --node-mgt-key "0xYour40HexCharacters..." \
      --ip "YOUR_VPS_PUBLIC_IP"
```

Then verify (see [Verify a VPS install](#verify-a-vps-install) below).

### Anti-pattern 2 — VPS: custom clone directory or made-up folder name

**Symptoms**

- `mpc-config` (or similar) cloned to `/root/mpc-config`, `/srv/continuum`, etc.
- Not `/home/mpcnode/mpc-config`

**Why it matters**

- One-shot, uninstall, backup docs, and support all assume the canonical VPS layout
- Peer tooling and operator muscle memory use the standard path

**Fix:** treat as a broken greenfield install — [recover](#recovery-uninstall-and-reinstall) unless you are intentionally on the advanced manual path and will maintain a custom layout yourself.

### Anti-pattern 3 — Agent improvised from Quick Start instead of one-shot

**Symptoms**

- Agent followed step-by-step shell from [Node Running Instructions](/ContinuumDAO/RunningInstructions/NodeRunningInstruction.md) but skipped user creation or mixed steps
- Or agent “helpfully” ran individual `apt`, `git clone`, and `docker compose` commands

**Note:** Node Running Instructions remain **valuable** for advanced operators. AI agents provisioning a **new VPS** should start at [Agent provision and configure](/ContinuumDAO/MPAWallet/AgentProvision.md), not reimplement fragments of the manual guide.

### Anti-pattern 4a — Windows: agent ran install scripts instead of coaching the human

**Symptoms**

- Agent invoked `install-node-docker-desktop.sh`, WSL orchestration, or curl/bash install on a Windows home PC
- Operator never used [node map `+`](https://mpa.continuumdao.org/node-map) or the **Continuum Node** Docker extension

**What agents should do instead**

- **Coach** through [Install — Windows](/ContinuumDAO/MPAWallet/Install.md#windows)
- Operator installs **Docker Desktop for Windows** (WSL2) and the **Continuum Node** extension
- Operator clicks **Install** in the extension — agent does **not** substitute shell automation

### Anti-pattern 4b — macOS: agent ran install scripts instead of coaching the human

**Symptoms**

- Agent ran `install-node-macos-docker-desktop.sh`, `desktop-local-orchestrate.sh --profile macos`, or manual `git clone` + `docker compose` on the Mac
- Repo not at **`~/mpc-config`**, or LaunchAgent `com.continuumdao.mpc-auth-watcher` never registered
- Agent ran Homebrew or `visudo` steps without the operator at the keyboard
- Operator never opened the **Continuum Node** Docker extension

**What agents should do instead**

- **Coach** through [For AI agents — macOS home PC](/ContinuumDAO/MPAWallet/Install.md#for-ai-agents--macos-home-pc)
- Operator installs **Docker Desktop for Mac** and the **Continuum Node** extension
- Operator clicks **Install** in the extension or node-map wizard

**Recovery (macOS)**

```bash
curl -fsSL "https://raw.githubusercontent.com/ContinuumDAO/mpc-config/main/scripts/uninstall-node-macos-docker-desktop.sh" \
  | bash -s -- --yes
```

Then operator re-runs the extension or node-map **`+`** flow (human-led).

Machine-readable routing: [install-node.json](https://docs.continuumdao.org/well-known/install-node.json) (`agentPlatformRules.windows-11`, `agentPlatformRules.macos`).

### Verify a VPS install

After the one-shot completes, run on the VPS (as root or `mpcnode`):

```bash
curl -fsSL "https://raw.githubusercontent.com/ContinuumDAO/mpc-config/main/scripts/verify-node-install.sh" \
  | bash -s
```

Or from the mpc-config clone:

```bash
./scripts/verify-node-install.sh
```

**Agents:** paste the script output back to the operator before continuing to mesh setup (peers / MQTT). Do **not** declare success if verification fails.

### Verify a macOS Docker Desktop install

After the operator completes the **Continuum Node** extension (or node-map) install, run on **the Mac**:

```bash
curl -fsSL "https://raw.githubusercontent.com/ContinuumDAO/mpc-config/main/scripts/verify-node-install-macos-desktop.sh" \
  | bash -s
```

Or from `~/mpc-config`:

```bash
./scripts/verify-node-install-macos-desktop.sh
```

**Agents:** require passing output before attach or wallet setup. Do **not** declare success if verification fails.

Manual checks:

| Check | Expected |
|-------|----------|
| `test -f ~/mpc-config/configs.yaml` | config present |
| `docker ps` | Continuum compose containers running |
| `launchctl list \| grep continuumdao` | `com.continuumdao.mpc-auth-watcher` loaded (warn if extension path skipped) |
| Attach mode | **Node hosted app (local PC)** at mpa.continuumdao.org |

Manual checks if you cannot fetch the VPS script:

| Check | Expected |
|-------|----------|
| `id mpcnode` | user exists |
| `test -f /home/mpcnode/mpc-config/configs.yaml` | config present |
| `test -d /home/mpcnode/mpc-config/.git` | official clone |
| `docker ps` | Continuum compose containers running |
| `/var/log/continuumdao-mpc-install.log` | present after one-shot (optional) |

### Recovery: uninstall and reinstall

1. Back up bootstrap key and database if anything worth keeping exists — [Backup and restoration](/ContinuumDAO/MPAWallet/BackupAndRestoration.md)
2. On the VPS as root:

```bash
curl -fsSL "https://raw.githubusercontent.com/ContinuumDAO/mpc-config/main/scripts/uninstall-node-debian-ubuntu.sh" \
  | bash -s -- --yes
```

3. Re-run the [one-shot install](https://github.com/ContinuumDAO/mpc-config/blob/main/docs/CREATE_NODE_ONESHOT.md)
4. Run [verify](#verify-a-vps-install) again
5. Continue [Agent provision](/ContinuumDAO/MPAWallet/AgentProvision.md) from §1b (mpcnode password + tunnel)

### Related

- [Agent provision and configure](/ContinuumDAO/MPAWallet/AgentProvision.md)
- [CREATE_NODE_ONESHOT.md](https://github.com/ContinuumDAO/mpc-config/blob/main/docs/CREATE_NODE_ONESHOT.md)
- [Running an MPC Node](/ContinuumDAO/RunningInstructions/NodeRunningInstruction.md) — advanced manual (humans and experienced operators)
- [Uninstall a node](/ContinuumDAO/MPAWallet/Uninstall.md)
