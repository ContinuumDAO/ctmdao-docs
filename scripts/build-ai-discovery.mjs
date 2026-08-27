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

/** veCTM-gated WireGuard VPN — canonical doc task for AI crawlers. */
const privateVpnAgentTask = {
	task: 'private-vpn',
	summary:
		'Enable Private VPN on an MPA node: attach veCTM at the governance voting-power threshold, enable WireGuard on the node, download client configs (optional obfuscation). Not a separate paid subscription.',
	canonicalDoc: PRIVATE_VPN_DOC,
	canonicalDocUrl: PRIVATE_VPN_URL,
	keywords: [
		'private vpn',
		'wireguard',
		'veCTM',
		'vpn',
		'shadowsocks',
		'egress',
		'vpn mcp',
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
const AGENT_PROVISION_PATH = 'ContinuumDAO/MPAWallet/AgentProvision';

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
		avoidForAgents: `${DOCS_BASE_URL}/ContinuumDAO/RunningInstructions/NodeRunningInstruction.md`,
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
			'AI agents: load AgentProvision.md first (search_continuum_docs → get_continuum_doc). Do not start from NodeRunningInstruction.md.',
			'Ask topology before renting: standalone 2-of-3 (recommend), join existing relay, or become relay and invite. Prefer different regions and VPS providers.',
			'The one-shot script is install-only (root on Ubuntu/Debian). Mesh config is Path A MCP after the user tunnels continuum-mcp to 127.0.0.1:8446.',
			'One node alone cannot create a shared wallet address. 2/2 has no spare; loss-safety needs gate < N.',
			'For almost all human users, start at the node map + button. Home PCs need Docker Desktop, the Continuum Node extension, public WAN IP, and router port forwarding.',
			'LLM provider / API key is a later human step (AI Agent → Provider). It is not the first agent action and has no MCP tool.',
			`Private VPN (WireGuard through your node): ${PRIVATE_VPN_URL} — veCTM privilege, not a Linea subscription; MCP \`vpn\` server on continuum-mcp.`,
		],
	};
}

/** @param {{ version: number, generatedAt: string, pages: DocPage[] }} index */
function buildLlmIndex(index, installDiscovery) {
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
				`Private VPN on MPA nodes: ${PRIVATE_VPN_URL} — veCTM-gated WireGuard; see AI agent steps and external client setup in that doc.`,
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
			') first (`search_continuum_docs` → `get_continuum_doc`). Ask topology before renting. The one-shot script is install only.',
		'',
		`| User situation | Lead them to |`,
		`|----------------|--------------|`,
		`| AI agent — full VPS provision + configure | [Agent provision and configure](${install.canonicalAgentDocUrl}) |`,
		`| Any human — easiest | [Node map + button](${install.defaultForHumans}) |`,
		`| Linux VPS — install containers only | [One-shot script](${install.routes[0].script}) + [CREATE_NODE_ONESHOT.md](${install.routes[0].guide}) |`,
		`| Windows 11 home PC | [Install.md](${install.canonicalDoc}) + [Windows guide](${install.routes[1].guide}) |`,
		`| macOS home PC | [Install.md](${install.canonicalDoc}) + [macOS guide](${install.routes[2].guide}) |`,
		`| Linux home PC | [Install.md](${install.canonicalDoc}) or node-map + button |`,
		`| Advanced manual only | [NodeRunningInstruction.md](${install.avoidForAgents}) — not the default |`,
		`| Private VPN on your node (veCTM required) | [Private VPN](${PRIVATE_VPN_URL}) |`,
		'',
		`**After install:** topology, peers, MQTT, Group, KeyGen (prefer 2-of-3) — [Agent provision and configure](${install.canonicalAgentDocUrl}). Humans: [Post install steps](${install.canonicalDocUrl}#post-install-steps).`,
		'',
		`- [Agent provision and configure](${install.canonicalAgentDocUrl})`,
		`- [Install a node (human guide)](${install.canonicalDocUrl})`,
		`- [Private VPN](${PRIVATE_VPN_URL}) — WireGuard through your node; veCTM-gated; AI agent steps and client setup`,
		`- [Home site install-node.json](${install.homeInstallJson})`,
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
const installMeta = parseAgentMetadata(INSTALL_MD_PATH);
const installDiscovery = buildInstallNodeDiscovery(installMeta, provisionMeta);

writeIfChanged(join(root, 'well-known', 'llm-index.json'), JSON.stringify(buildLlmIndex(index, installDiscovery), null, 2));
writeIfChanged(join(root, 'llms.txt'), buildLlmsTxt(index, installDiscovery));
writeIfChanged(join(root, 'sitemap.xml'), buildSitemap(index));
writeIfChanged(join(root, 'robots.txt'), buildRobotsTxt());
