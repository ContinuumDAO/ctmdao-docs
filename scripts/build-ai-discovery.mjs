#!/usr/bin/env node
/**
 * Generate AI crawler discovery files from search-index.json.
 * Run after build-search-index.mjs: node scripts/build-ai-discovery.mjs
 */
import {readFileSync, writeFileSync, mkdirSync} from 'node:fs';
import {join, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const DOCS_BASE_URL = 'https://docs.continuumdao.org';
const HOME_URL = 'https://continuumdao.org';
const MPA_NODE_MAP = 'https://mpa.continuumdao.org/node-map';
const PRIVATE_VPN_DOC = `${DOCS_BASE_URL}/ContinuumDAO/PrivateVPN.md`;
const PRIVATE_VPN_URL = `${DOCS_BASE_URL}/ContinuumDAO/PrivateVPN`;
const PRIVATE_VPN_EXTERNAL_SECTION = 'external-ai-agent-ssh-tunnel--mcp';
const PRIVATE_VPN_EXTERNAL_DOC = `${PRIVATE_VPN_DOC}#${PRIVATE_VPN_EXTERNAL_SECTION}`;
const PRIVATE_VPN_EXTERNAL_URL = `${PRIVATE_VPN_URL}#${PRIVATE_VPN_EXTERNAL_SECTION}`;
const CONFIGURE_PATH = 'ContinuumDAO/MPAWallet/AIHarness/Configure';
const CONFIGURE_DOC = `${DOCS_BASE_URL}/${CONFIGURE_PATH}.md`;
const CONFIGURE_URL = `${DOCS_BASE_URL}/${CONFIGURE_PATH}`;
const CONFIGURE_MD_PATH = join(root, 'ContinuumDAO', 'MPAWallet', 'AIHarness', 'Configure.md');
const CONFIGURE_PROVIDER_SECTION = 'for-ai-agents-provider';
const CONFIGURE_PROVIDER_DOC = `${CONFIGURE_DOC}#${CONFIGURE_PROVIDER_SECTION}`;
const CONFIGURE_PROVIDER_URL = `${CONFIGURE_URL}#${CONFIGURE_PROVIDER_SECTION}`;

/** veCTM-gated WireGuard VPN — canonical doc task for AI crawlers. */
const privateVpnAgentTask = {
	task: 'private-vpn',
	summary:
		'External AI agents (SSH tunnel to 127.0.0.1:8446, Path A MCP): enable Private VPN via continuum + vpn MCP — load the External AI agent (SSH tunnel + MCP) section in PrivateVPN.md. Requires veCTM privilege; not a Linea subscription.',
	canonicalDoc: PRIVATE_VPN_EXTERNAL_DOC,
	canonicalDocUrl: PRIVATE_VPN_EXTERNAL_URL,
	overviewDoc: PRIVATE_VPN_DOC,
	overviewDocUrl: PRIVATE_VPN_URL,
	externalAgentSection: PRIVATE_VPN_EXTERNAL_SECTION,
	keywords: [
		'private vpn',
		'wireguard',
		'veCTM',
		'vpn',
		'shadowsocks',
		'egress',
		'vpn mcp',
		'ssh tunnel',
		'8446',
		'path a',
		'external ai agent',
	],
};

/** Coach the operator through AI Agent → Provider (no MCP write tool). */
const configureHarnessAgentTask = {
	task: 'configure-ai-harness-provider',
	summary:
		'External AI agents: coach the operator through Node → AI Agent → Provider (provider, model, baseUrl, API key). There is no MCP write tool. Load the For AI agents — Provider section in Configure.md. DeepSeek uses provider deepseek, model deepseek-flash (official default base URL). Groq (groq) is not xAI Grok (grok). other still requires a real baseUrl — not the example.com placeholder, not retired deepseek-chat.',
	canonicalDoc: CONFIGURE_PROVIDER_DOC,
	canonicalDocUrl: CONFIGURE_PROVIDER_URL,
	overviewDoc: CONFIGURE_DOC,
	overviewDocUrl: CONFIGURE_URL,
	externalAgentSection: CONFIGURE_PROVIDER_SECTION,
	keywords: [
		'AI Agent Provider',
		'LLM',
		'provider',
		'model',
		'baseUrl',
		'API key',
		'deepseek',
		'deepseek-flash',
		'groq',
		'mistral',
		'together',
		'fireworks',
		'ollama',
		'openai',
		'openrouter',
		'other',
		'venice',
		'grok',
	],
};
const INDEX_PATH = join(root, 'search-index.json');
const INSTALL_MD_PATH = join(root, 'ContinuumDAO', 'MPAWallet', 'Install.md');
const AGENT_PROVISION_MD_PATH = join(
	root,
	'ContinuumDAO',
	'MPAWallet',
	'AgentProvision.md',
);
const AGENT_ANTI_PATTERNS_MD_PATH = join(
	root,
	'ContinuumDAO',
	'MPAWallet',
	'AgentInstallAntiPatterns.md',
);
const AGENT_PROVISION_PATH = 'ContinuumDAO/MPAWallet/AgentProvision';
const AGENT_ANTI_PATTERNS_PATH = 'ContinuumDAO/MPAWallet/AgentInstallAntiPatterns';
const VERIFY_SCRIPT_URL =
	'https://raw.githubusercontent.com/ContinuumDAO/mpc-config/main/scripts/verify-node-install.sh';
const VERIFY_MACOS_SCRIPT_URL =
	'https://raw.githubusercontent.com/ContinuumDAO/mpc-config/main/scripts/verify-node-install-macos-desktop.sh';
const INSTALL_MACOS_DOC =
	`${DOCS_BASE_URL}/ContinuumDAO/MPAWallet/Install.md#for-ai-agents--macos-home-pc`;

/** @param {string} path @param {string} content */
function writeIfChanged(path, content) {
	const normalized = content.endsWith('\n') ? content : `${content}\n`;
	try {
		if (readFileSync(path, 'utf8') === normalized) {
			console.log(`${path.replace(`${root}/`, '')} unchanged`);
			return false;
		}
	} catch {
		// file missing
	}
	writeFileSync(path, normalized, 'utf8');
	console.log(`wrote ${path.replace(`${root}/`, '')}`);
	return true;
}

/** @typedef {{ path: string, title: string, section: string, excerpt: string, url: string }} DocPage */

/** @param {DocPage[]} pages */
function groupPagesBySection(pages) {
	/** @type {Map<string, DocPage[]>} */
	const bySection = new Map();
	for (const page of pages) {
		const section = page.section?.split(' > ')[0]?.trim() || 'General';
		if (!bySection.has(section)) {
			bySection.set(section, []);
		}
		bySection.get(section).push(page);
	}
	return [...bySection.entries()].sort(([a], [b]) => a.localeCompare(b));
}

/** Parse `agent:` metadata block from an HTML comment. */
function parseAgentMetadata(filePath) {
	try {
		const raw = readFileSync(filePath, 'utf8');
		const match = raw.match(/<!--\s*\n([\s\S]*?)\n\s*-->/);
		if (!match) return null;
		const block = match[1];
		if (!/^agent:/m.test(block)) return null;
		/** @type {Record<string, string | string[]>} */
		const meta = {};
		for (const line of block.split('\n')) {
			const trimmed = line.trim();
			if (!trimmed || trimmed === 'agent:') continue;
			const kv = trimmed.match(/^(\w[\w-]*):\s*(.+)$/);
			if (!kv) continue;
			const [, key, valueRaw] = kv;
			const value = valueRaw.trim();
			if (value.startsWith('[') && value.endsWith(']')) {
				meta[key] = value
					.slice(1, -1)
					.split(',')
					.map(s => s.trim());
			} else {
				meta[key] = value;
			}
		}
		return Object.keys(meta).length ? meta : null;
	} catch {
		return null;
	}
}

/** Install routing shared with continuumdao.org discovery files. */
function buildInstallNodeDiscovery(installMeta, provisionMeta) {
	const oneshotScript =
		typeof provisionMeta?.oneshot_script === 'string'
			? provisionMeta.oneshot_script
			: typeof installMeta?.oneshot_script === 'string'
				? installMeta.oneshot_script
				: 'https://raw.githubusercontent.com/ContinuumDAO/mpc-config/main/scripts/install-node-debian-ubuntu.sh';
	const oneshotGuide =
		typeof provisionMeta?.oneshot_doc === 'string'
			? provisionMeta.oneshot_doc
			: typeof installMeta?.oneshot_doc === 'string'
				? installMeta.oneshot_doc
				: 'https://github.com/ContinuumDAO/mpc-config/blob/main/docs/CREATE_NODE_ONESHOT.md';
	const agentsGuide =
		typeof provisionMeta?.agents_md === 'string'
			? provisionMeta.agents_md
			: typeof installMeta?.agents_md === 'string'
				? installMeta.agents_md
				: 'https://github.com/ContinuumDAO/mpc-config/blob/main/AGENTS.md';
	const agentPlaybook = `${DOCS_BASE_URL}/${AGENT_PROVISION_PATH}`;
	const agentPlaybookMd = `${agentPlaybook}.md`;

	return {
		task:
			typeof provisionMeta?.task === 'string'
				? provisionMeta.task
				: typeof installMeta?.task === 'string'
					? installMeta.task
					: 'install-mpa-node',
		summary:
			'Provision and configure a Multi-Party Agent Wallet node: topology first, then VPS oneshot (or human node-map / home PC), Path A MCP mesh, Group, and KeyGen.',
		defaultForHumans: MPA_NODE_MAP,
		canonicalDoc: `${DOCS_BASE_URL}/ContinuumDAO/MPAWallet/Install.md`,
		canonicalDocUrl: `${DOCS_BASE_URL}/ContinuumDAO/MPAWallet/Install`,
		canonicalAgentDoc: agentPlaybookMd,
		canonicalAgentDocUrl: agentPlaybook,
		agentsGuide,
		homeInstallJson: `${HOME_URL}/well-known/install-node.json`,
		docsInstallJson: `${DOCS_BASE_URL}/well-known/install-node.json`,
		avoidForAgents: `${DOCS_BASE_URL}/ContinuumDAO/RunningInstructions/NodeRunningInstruction.md`,
		agentAntiPatternsDoc: `${DOCS_BASE_URL}/${AGENT_ANTI_PATTERNS_PATH}.md`,
		agentAntiPatternsUrl: `${DOCS_BASE_URL}/${AGENT_ANTI_PATTERNS_PATH}`,
		verifyScript: VERIFY_SCRIPT_URL,
		agentAttachRules: {
			oneNodeAtATimeFromPc: true,
			loopbackPorts: {
				nodeApp: 3333,
				managementHttp: 8080,
				publicDiscovery: 18080,
				continuumMcp: 8446,
			},
			sshTunnelBind: '127.0.0.1',
			attachManagementUrl: '127.0.0.1:8080',
			peerPortNotForAttach: 8081,
			forbiddenForAgents: [
				'remap SSH -L to local ports other than 3333, 8080, 18080, 8446',
				'attach or MCP to 127.0.0.1:8081 (peer port, not management)',
				'two SSH tunnels or two attached nodes from one PC at once',
				'second MCP port (8447, 18446, etc.) to keep multiple nodes live',
			],
			doc: `${DOCS_BASE_URL}/${AGENT_ANTI_PATTERNS_PATH}.md#anti-pattern-5--wrong-ports-or-multiple-nodes-from-one-pc`,
		},
		agentForbiddenActions: [
			'manual git clone mpc-config on a greenfield Ubuntu/Debian VPS',
			'custom repo directory instead of /home/mpcnode/mpc-config',
			'docker compose up as root without running install-node-debian-ubuntu.sh one-shot',
			'piecemeal reimplementation of NodeRunningInstruction Quick Start for greenfield VPS',
			'install-node-docker-desktop.sh or WSL orchestration by an AI agent on Windows 11 home PC',
			'install-node-macos-docker-desktop.sh or desktop-local-orchestrate.sh --profile macos by an AI agent on macOS home PC',
			'declaring VPS install complete without verify-node-install.sh passing',
			'declaring macOS Docker Desktop install complete without verify-node-install-macos-desktop.sh passing',
			'SSH tunnel or attach using ports other than 3333, 8080, 18080, 8446 on loopback',
			'two nodes attached or two SSH tunnels from one PC at the same time',
		],
		agentPlatformRules: {
			'linux-vps': {
				agentMayInstall: true,
				onlyInstallCommand:
					'curl -fsSL https://raw.githubusercontent.com/ContinuumDAO/mpc-config/main/scripts/install-node-debian-ubuntu.sh | bash -s -- --node-mgt-key 0x... --ip VPS_IP',
				expectedUser: 'mpcnode',
				expectedRepoDir: '/home/mpcnode/mpc-config',
				verifyScript: VERIFY_SCRIPT_URL,
				playbook: agentPlaybookMd,
			},
			'windows-11': {
				agentMayInstall: false,
				agentRole: 'coach-human-via-node-map-and-docker-extension',
				nodeMap: MPA_NODE_MAP,
				guide:
					'https://github.com/ContinuumDAO/mpc-config/blob/main/docs/INSTALL_NODE_WINDOWS_DOCKER_DESKTOP.md',
				antiPatterns: `${DOCS_BASE_URL}/${AGENT_ANTI_PATTERNS_PATH}.md`,
				forbiddenScripts: [
					'install-node-docker-desktop.sh',
					'desktop-local-orchestrate.sh --profile wsl',
				],
				expectedRepoDir: '~/mpc-config (inside WSL)',
				attachMode: 'node-hosted-app-local-pc',
				humanPrerequisites: [
					'docker-desktop-windows-wsl2',
					'continuum-node-extension',
				],
			},
			macos: {
				agentMayInstall: false,
				agentRole: 'coach-human-via-node-map-and-docker-extension',
				nodeMap: MPA_NODE_MAP,
				coachDoc: INSTALL_MACOS_DOC,
				guide:
					'https://github.com/ContinuumDAO/mpc-config/blob/main/docs/INSTALL_NODE_MACOS_DOCKER_DESKTOP.md',
				antiPatterns: `${DOCS_BASE_URL}/${AGENT_ANTI_PATTERNS_PATH}.md`,
				forbiddenScripts: [
					'install-node-macos-docker-desktop.sh',
					'desktop-local-orchestrate.sh --profile macos',
				],
				expectedRepoDir: '~/mpc-config',
				verifyScript: VERIFY_MACOS_SCRIPT_URL,
				attachMode: 'node-hosted-app-local-pc',
				humanPrerequisites: [
					'docker-desktop-mac',
					'continuum-node-extension',
					'homebrew-optional-python-yq-wireguard-socat-bash',
					'passwordless-sudo-if-extension-prompts',
				],
				launchAgentLabel: 'com.continuumdao.mpc-auth-watcher',
			},
			'linux-pc': {
				agentMayInstall: false,
				agentRole: 'coach-human-via-node-map-or-docker-extension',
				nodeMap: MPA_NODE_MAP,
				doc: `${DOCS_BASE_URL}/ContinuumDAO/MPAWallet/Install.md`,
			},
		},
		agentMetadata: provisionMeta ?? installMeta ?? undefined,
		installMetadata: installMeta ?? undefined,
		routes: [
			{
				platform: 'linux-vps',
				when: 'Ubuntu or Debian VPS; AI agent provisions and configures (Path A MCP)',
				primary: 'agent-provision-playbook',
				playbook: agentPlaybookMd,
				script: oneshotScript,
				guide: oneshotGuide,
				fallback: MPA_NODE_MAP,
			},
			{
				platform: 'windows-11',
				when: 'Home or office Windows 11 PC; interactive user',
				primary: 'node-map-or-docker-extension',
				nodeMap: MPA_NODE_MAP,
				guide:
					'https://github.com/ContinuumDAO/mpc-config/blob/main/docs/INSTALL_NODE_WINDOWS_DOCKER_DESKTOP.md',
			},
			{
				platform: 'macos',
				when: 'Home or office Mac; interactive user',
				primary: 'node-map-or-docker-extension',
				nodeMap: MPA_NODE_MAP,
				guide:
					'https://github.com/ContinuumDAO/mpc-config/blob/main/docs/INSTALL_NODE_MACOS_DOCKER_DESKTOP.md',
			},
			{
				platform: 'linux-pc',
				when: 'Home Linux workstation or laptop',
				primary: 'node-map-or-docker-extension',
				nodeMap: MPA_NODE_MAP,
				doc: `${DOCS_BASE_URL}/ContinuumDAO/MPAWallet/Install.md`,
			},
		],
		afterInstall: [
			{
				step: 'attach-node',
				name: 'Attach your node in the browser',
				url: `${DOCS_BASE_URL}/ContinuumDAO/MPAWallet/AttachYourNode.md`,
			},
			{
				step: 'backup',
				name: 'Back up bootstrap key and encrypted database',
				url: `${DOCS_BASE_URL}/ContinuumDAO/MPAWallet/BackupAndRestoration.md`,
			},
			{
				step: 'peers-group-keygen',
				name: 'Configure peers / MQTT, create Group and KeyGen (prefer 2-of-3 across regions and providers)',
				url: agentPlaybookMd,
			},
			{
				step: 'ai-harness',
				name: 'Optional: configure the built-in AI harness',
				url: `${DOCS_BASE_URL}/ContinuumDAO/MPAWallet/AIHarness/Configure.md`,
			},
			{
				step: 'private-vpn',
				name: 'Optional: Private VPN (requires attached veCTM at voting-power threshold)',
				url: PRIVATE_VPN_DOC,
			},
		],
		keyFacts: [
			'AI agents: load AgentProvision.md first (search_continuum_docs → get_continuum_doc). NodeRunningInstruction.md is advanced manual — not the default greenfield VPS path.',
			'After VPS one-shot: run verify-node-install.sh before mesh setup. After Mac extension install: verify-node-install-macos-desktop.sh. Wrong installs: AgentInstallAntiPatterns.md.',
			'Ask topology before renting: standalone 2-of-3 (recommend), join existing relay, or become relay and invite. Prefer different regions and VPS providers.',
			'The one-shot script is install-only (root on Ubuntu/Debian). Mesh config is Path A MCP after the user tunnels continuum-mcp to 127.0.0.1:8446.',
			'One node alone cannot create a shared wallet address. 2/2 has no spare; loss-safety needs gate < N.',
			'For almost all human users, start at the node map + button. Home PCs need Docker Desktop, the Continuum Node extension, public WAN IP, and router port forwarding.',
			`LLM provider is a later step (AI Agent → Provider). External agents coach the operator — load ${CONFIGURE_PROVIDER_URL}. There is no MCP write tool for provider, model, or API key.`,
			`Private VPN (WireGuard through your node): ${PRIVATE_VPN_URL} — veCTM privilege, not a Linea subscription; MCP \`vpn\` server on continuum-mcp. External AI agents (Path A): ${PRIVATE_VPN_EXTERNAL_URL}`,
		],
	};
}

/** Machine-readable install router (mirrors llmld:getStarted; also published at /well-known/install-node.json). */
function buildInstallNodeJson(installDiscovery, generatedAt) {
	return {
		'@context': ['https://schema.org', 'https://llmld.org/v1'],
		'@type': 'llmld:InstallRouter',
		name: 'ContinuumDAO MPA node install router',
		url: installDiscovery.docsInstallJson,
		mirrorUrl: installDiscovery.homeInstallJson,
		generatedAt,
		summary: installDiscovery.summary,
		canonicalAgentDoc: installDiscovery.canonicalAgentDoc,
		canonicalAgentDocUrl: installDiscovery.canonicalAgentDocUrl,
		agentAntiPatternsDoc: installDiscovery.agentAntiPatternsDoc,
		verifyScript: installDiscovery.verifyScript,
		agentForbiddenActions: installDiscovery.agentForbiddenActions,
		agentAttachRules: installDiscovery.agentAttachRules,
		agentPlatformRules: installDiscovery.agentPlatformRules,
		routes: installDiscovery.routes,
		afterInstall: installDiscovery.afterInstall,
		advancedManualDoc: installDiscovery.avoidForAgents,
	};
}

/** @param {{ version: number, generatedAt: string, pages: DocPage[] }} index @param {ReturnType<typeof parseAgentMetadata>} antiPatternsMeta */
function buildLlmIndex(index, installDiscovery, antiPatternsMeta) {
	const grouped = groupPagesBySection(index.pages);
	return {
		'@context': ['https://schema.org', 'https://llmld.org/v1'],
		'@type': 'llmld:AIDocumentation',
		name: 'ContinuumDAO Documentation',
		url: `${DOCS_BASE_URL}/`,
		'llmld:summary': {
			one_liner:
				'Official ContinuumDAO documentation: MPC network, Multi-Party Agent Wallet, C3Caller cross-chain messaging, governance, and node operations.',
			key_facts: [
				'Docs are markdown source files served at stable URLs; append .md to any page path for raw content.',
				'search-index.json lists every page with titles, sections, headings, and excerpts for programmatic search.',
				'MPA wallet AI agents use search_continuum_docs and get_continuum_doc MCP tools backed by this index.',
				'AI agents provisioning a VPS: AgentProvision.md (topology, oneshot, Path A MCP). Humans: node-map + button or Install.md.',
				'Governance, C3Caller, MPC concepts, and node running guides are all indexed here.',
				`Private VPN on MPA nodes: ${PRIVATE_VPN_URL} — veCTM-gated WireGuard. External AI agents (SSH tunnel + MCP, Path A): ${PRIVATE_VPN_EXTERNAL_URL}`,
				`AI harness LLM Provider (coach the operator; no MCP write tool): ${CONFIGURE_PROVIDER_URL}`,
			],
		},
		'llmld:getStarted': installDiscovery,
		'llmld:agentTasks': [
			...(installDiscovery.agentMetadata
				? [
						{
							task: installDiscovery.task,
							source: installDiscovery.canonicalAgentDoc,
							...installDiscovery.agentMetadata,
						},
					]
				: []),
			...(installDiscovery.installMetadata
				? [
						{
							task: installDiscovery.installMetadata.task ?? 'create-mpc-node',
							source: installDiscovery.canonicalDoc,
							...installDiscovery.installMetadata,
						},
					]
				: []),
			privateVpnAgentTask,
			configureTask,
			...(antiPatternsMeta
				? [
						{
							task: antiPatternsMeta.task ?? 'agent-install-anti-patterns',
							source: installDiscovery.agentAntiPatternsDoc,
							...antiPatternsMeta,
						},
					]
				: []),
		],
		'llmld:searchIndex': `${DOCS_BASE_URL}/search-index.json`,
		'llmld:markdownSuffix': '.md',
		generatedAt: index.generatedAt,
		pageCount: index.pages.length,
		'llmld:sections': grouped.map(([section, pages]) => ({
			name: section,
			pages: pages.map(p => ({
				name: p.title,
				url: p.url,
				markdown: `${p.url}.md`,
				excerpt: p.excerpt?.slice(0, 200) ?? '',
			})),
		})),
	};
}

/** @param {{ pages: DocPage[] }} index @param {ReturnType<typeof buildInstallNodeDiscovery>} install */
function buildLlmsTxt(index, install) {
	const lines = [
		'# ContinuumDAO Documentation',
		'',
		'> Official documentation for ContinuumDAO — a public permissionless decentralized MPC network for cross-chain messaging, AI agentic wallets, and cross-chain governance.',
		'',
		'## Start here — install an MPA wallet node',
		'',
		'**For AI agents (Claude, Cursor, Grok):** if the user wants you to provision or configure a VPS node, load [Agent provision and configure](' +
			install.canonicalAgentDocUrl +
			') first (`search_continuum_docs` → `get_continuum_doc`). Ask topology before renting. The one-shot script is install only. **Private VPN (external agent, SSH tunnel to :8446):** [External AI agent (SSH tunnel + MCP)](' +
			PRIVATE_VPN_EXTERNAL_URL +
			') — agent-facing playbook; not human steps. **AI Agent → Provider (LLM):** [For AI agents — Provider](' +
			CONFIGURE_PROVIDER_URL +
			') — coach the operator; no MCP write tool.',
		'',
		`| User situation | Lead them to |`,
		`|----------------|--------------|`,
		`| AI agent — full VPS provision + configure | [Agent provision and configure](${install.canonicalAgentDocUrl}) |`,
		`| External AI agent — Private VPN (SSH tunnel + MCP) | [External AI agent section](${PRIVATE_VPN_EXTERNAL_URL}) |`,
		`| External AI agent — coach AI Agent Provider / LLM | [For AI agents — Provider](${CONFIGURE_PROVIDER_URL}) |`,
		`| Any human — easiest | [Node map + button](${install.defaultForHumans}) |`,
		`| Linux VPS — install containers only | [One-shot script](${install.routes[0].script}) + [CREATE_NODE_ONESHOT.md](${install.routes[0].guide}) + verify after install |`,
		`| AI agent — wrong install / recovery | [Agent install anti-patterns](${install.agentAntiPatternsUrl}) |`,
		`| Windows 11 home PC (human-led; agent coaches only) | [Install.md](${install.canonicalDoc}) + [Windows guide](${install.routes[1].guide}) |`,
		`| macOS home PC (human-led; agent coaches only) | [For AI agents — macOS](${INSTALL_MACOS_DOC}) + [macOS guide](${install.routes[2].guide}) |`,
		`| Linux home PC | [Install.md](${install.canonicalDoc}) or node-map + button |`,
		`| Advanced manual only | [NodeRunningInstruction.md](${install.avoidForAgents}) — not the default |`,
		`| Private VPN on your node (veCTM required, overview) | [Private VPN](${PRIVATE_VPN_URL}) |`,
		`| Uninstall / decommission a node | [Uninstall a node](${DOCS_BASE_URL}/ContinuumDAO/MPAWallet/Uninstall) |`,
		'',
		`**After install:** topology, peers, MQTT, Group, KeyGen (prefer 2-of-3) — [Agent provision and configure](${install.canonicalAgentDocUrl}). Humans: [Post install steps](${install.canonicalDocUrl}#post-install-steps).`,
		'',
		`- [Agent provision and configure](${install.canonicalAgentDocUrl})`,
		`- [Install a node (human guide)](${install.canonicalDocUrl})`,
		`- [Uninstall a node](${DOCS_BASE_URL}/ContinuumDAO/MPAWallet/Uninstall) — backup or eject first; TSS threshold risk`,
		`- [Private VPN — external AI agent (SSH tunnel + MCP)](${PRIVATE_VPN_EXTERNAL_URL}) — Path A; \`continuum\` + \`vpn\` MCP; agent playbook only`,
		`- [AI harness — For AI agents — Provider](${CONFIGURE_PROVIDER_URL}) — coach LLM provider / model / baseUrl / API key; no MCP write tool`,
		`- [Private VPN (overview)](${PRIVATE_VPN_URL}) — veCTM-gated WireGuard; built-in Agent chat steps for node harness`,
		`- [install-node.json (machine-readable router)](${install.docsInstallJson}) — mirror on home site: ${install.homeInstallJson}`,
		`- [Agent install anti-patterns](${install.agentAntiPatternsUrl})`,
		`- [mpc-config AGENTS.md](${install.agentsGuide})`,
		'',
		'## Machine-readable indexes (preferred for AI agents)',
		'',
		`- [search-index.json](${DOCS_BASE_URL}/search-index.json): Searchable index of all ${index.pages.length} pages with titles, sections, headings, and excerpts`,
		`- [llm-index.json](${DOCS_BASE_URL}/well-known/llm-index.json): LLMLD discovery index grouped by section`,
		`- [sitemap.xml](${DOCS_BASE_URL}/sitemap.xml): Full sitemap of documentation pages`,
		'',
		'Raw markdown for any page: append `.md` to the page URL (e.g. `ContinuumDAO/Introduction.md`).',
		'',
	];

	for (const [section, pages] of groupPagesBySection(index.pages)) {
		lines.push(`## ${section}`, '');
		for (const page of pages) {
			const excerpt = page.excerpt?.slice(0, 120).replace(/\s+/g, ' ').trim() ?? '';
			lines.push(`- [${page.title}](${page.url}): ${excerpt}`);
		}
		lines.push('');
	}

	return lines.join('\n');
}

/** @param {{ generatedAt: string, pages: DocPage[] }} index */
function buildSitemap(index) {
	const urls = index.pages
		.map(p => `  <url>\n    <loc>${escapeXml(p.url)}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>`)
		.join('\n');
	return [
		'<?xml version="1.0" encoding="UTF-8"?>',
		'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
		`  <url>\n    <loc>${DOCS_BASE_URL}/</loc>\n    <changefreq>weekly</changefreq>\n    <priority>1.0</priority>\n  </url>`,
		urls,
		'</urlset>',
	].join('\n');
}

/** @param {string} s */
function escapeXml(s) {
	return s
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}

function buildRobotsTxt() {
	return [
		'User-agent: *',
		'Allow: /',
		'',
		`Sitemap: ${DOCS_BASE_URL}/sitemap.xml`,
		'',
	].join('\n');
}

let index;
try {
	index = JSON.parse(readFileSync(INDEX_PATH, 'utf8'));
} catch {
	console.error('ERROR: search-index.json not found. Run build-search-index.mjs first.');
	process.exit(1);
}

if (!index?.pages?.length) {
	console.error('ERROR: search-index.json has no pages.');
	process.exit(1);
}

mkdirSync(join(root, 'well-known'), {recursive: true});

const provisionMeta = parseAgentMetadata(AGENT_PROVISION_MD_PATH);
const antiPatternsMeta = parseAgentMetadata(AGENT_ANTI_PATTERNS_MD_PATH);
const installMeta = parseAgentMetadata(INSTALL_MD_PATH);
const configureMeta = parseAgentMetadata(CONFIGURE_MD_PATH);
const installDiscovery = buildInstallNodeDiscovery(installMeta, provisionMeta);
const configureTask = {
	...configureHarnessAgentTask,
	...(configureMeta?.task ? {task: configureMeta.task} : {}),
	...(configureMeta?.audience ? {audience: configureMeta.audience} : {}),
	...(Array.isArray(configureMeta?.keywords) ? {keywords: configureMeta.keywords} : {}),
};

writeIfChanged(
	join(root, 'well-known', 'llm-index.json'),
	JSON.stringify(buildLlmIndex(index, installDiscovery, antiPatternsMeta), null, 2),
);
writeIfChanged(
	join(root, 'well-known', 'install-node.json'),
	JSON.stringify(buildInstallNodeJson(installDiscovery, index.generatedAt), null, 2),
);
writeIfChanged(join(root, 'llms.txt'), buildLlmsTxt(index, installDiscovery));
writeIfChanged(join(root, 'sitemap.xml'), buildSitemap(index));
writeIfChanged(join(root, 'robots.txt'), buildRobotsTxt());
