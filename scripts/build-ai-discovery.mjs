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
const INDEX_PATH = join(root, 'search-index.json');

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

/** @param {{ version: number, generatedAt: string, pages: DocPage[] }} index */
function buildLlmIndex(index) {
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
				'Governance, C3Caller, MPC concepts, and node running guides are all indexed here.',
			],
		},
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

/** @param {{ pages: DocPage[] }} index */
function buildLlmsTxt(index) {
	const lines = [
		'# ContinuumDAO Documentation',
		'',
		'> Official documentation for ContinuumDAO — a public permissionless decentralized MPC network for cross-chain messaging, AI agentic wallets, and cross-chain governance.',
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

writeIfChanged(join(root, 'well-known', 'llm-index.json'), JSON.stringify(buildLlmIndex(index), null, 2));
writeIfChanged(join(root, 'llms.txt'), buildLlmsTxt(index));
writeIfChanged(join(root, 'sitemap.xml'), buildSitemap(index));
writeIfChanged(join(root, 'robots.txt'), buildRobotsTxt());
