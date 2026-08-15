#!/usr/bin/env node
/**
 * Build search-index.json for docs.continuumdao.org and Continuum MCP doc tools.
 * Run from repo root: node scripts/build-search-index.mjs
 */
import {readFileSync, writeFileSync, readdirSync, statSync} from 'node:fs';
import {join, relative, dirname, extname} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const DOCS_BASE_URL = 'https://docs.continuumdao.org';
const EXCERPT_LEN = 300;

/** @param {string} path */
function isValidDocPath(path) {
	if (!path || path.includes('..')) {
		return false;
	}
	return /^[A-Za-z0-9_./-]+$/.test(path);
}

/** @typedef {{ path: string, title: string, section: string }} SidebarEntry */

/** @param {string} content @returns {SidebarEntry[]} */
function parseSidebar(content) {
	/** @type {Array<{ level: number, section: string }>} */
	const stack = [];
	/** @type {SidebarEntry[]} */
	const entries = [];
	for (const line of content.split('\n')) {
		const sectionOnly = line.match(/^(\s*)\*\s+([^[\].*][^*]*?)\s*$/);
		const link = line.match(/\[([^\]]+)\]\(([^)]+)\)/);
		if (sectionOnly && !link) {
			const level = sectionOnly[1].length;
			const section = sectionOnly[2].trim();
			while (stack.length > 0 && stack[stack.length - 1].level >= level) {
				stack.pop();
			}
			stack.push({level, section});
		} else if (link) {
			const title = link[1].trim();
			const href = link[2].trim();
			if (href.startsWith('http') || href.startsWith('#')) {
				continue;
			}
			const path = href.replace(/^\//, '').replace(/\.md$/i, '');
			if (!isValidDocPath(path)) {
				continue;
			}
			const section = stack.map(s => s.section).join(' > ');
			entries.push({path, title, section});
		}
	}
	return entries;
}

/** @param {string} md @returns {string[]} */
function extractHeadings(md) {
	/** @type {string[]} */
	const headings = [];
	for (const line of md.split('\n')) {
		const m = line.match(/^#{1,6}\s+(.+)/);
		if (m) {
			headings.push(m[1].trim());
		}
	}
	return headings;
}

/** @param {string} md @param {string} fallback */
function extractTitle(md, fallback) {
	for (const line of md.split('\n')) {
		const m = line.match(/^#\s+(.+)/);
		if (m) {
			return m[1].trim();
		}
	}
	return fallback;
}

/** @param {string} md */
function buildExcerpt(md) {
	const text = md
		.replace(/^#+\s.+$/gm, '')
		.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
		.replace(/[*_`>#|-]/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();
	return text.slice(0, EXCERPT_LEN);
}

/** @param {string} dir @param {string[]} acc */
function walkMarkdown(dir, acc = []) {
	for (const ent of readdirSync(dir)) {
		if (ent.startsWith('.') || ent === 'node_modules' || ent === 'scripts') {
			continue;
		}
		const full = join(dir, ent);
		const st = statSync(full);
		if (st.isDirectory()) {
			if (ent === '.obsidian') {
				continue;
			}
			walkMarkdown(full, acc);
		} else if (extname(ent) === '.md' && ent !== '_sidebar.md') {
			acc.push(relative(root, full).replace(/\\/g, '/').replace(/\.md$/i, ''));
		}
	}
	return acc;
}

const sidebarEntries = parseSidebar(readFileSync(join(root, '_sidebar.md'), 'utf8'));
/** @type {Map<string, SidebarEntry>} */
const sidebarByPath = new Map(sidebarEntries.map(e => [e.path, e]));

/** @type {Set<string>} */
const allPaths = new Set(walkMarkdown(root));
for (const entry of sidebarEntries) {
	allPaths.add(entry.path);
}

/** @type {Array<Record<string, unknown>>} */
const pages = [];
for (const path of [...allPaths].sort()) {
	if (path.includes('.obsidian') || !isValidDocPath(path)) {
		continue;
	}
	const filePath = join(root, `${path}.md`);
	let md;
	try {
		md = readFileSync(filePath, 'utf8');
	} catch {
		continue;
	}
	const sidebar = sidebarByPath.get(path);
	const title = extractTitle(md, sidebar?.title ?? path.split('/').pop() ?? path);
	pages.push({
		path,
		title,
		section: sidebar?.section ?? '',
		headings: extractHeadings(md).slice(0, 20),
		excerpt: buildExcerpt(md),
		url: `${DOCS_BASE_URL}/${path}`,
	});
}

const outPath = join(root, 'search-index.json');
let generatedAt = new Date().toISOString();
try {
	const existing = JSON.parse(readFileSync(outPath, 'utf8'));
	if (
		existing?.pages &&
		JSON.stringify(existing.pages) === JSON.stringify(pages)
	) {
		generatedAt = existing.generatedAt ?? generatedAt;
	}
} catch {
	// no existing index
}

const index = {
	version: 1,
	generatedAt,
	pages,
};

const outText = `${JSON.stringify(index, null, 2)}\n`;
try {
	if (readFileSync(outPath, 'utf8') === outText) {
		console.log(`search-index.json unchanged (${pages.length} pages)`);
	} else {
		writeFileSync(outPath, outText, 'utf8');
		console.log(`wrote search-index.json (${pages.length} pages)`);
	}
} catch {
	writeFileSync(outPath, outText, 'utf8');
	console.log(`wrote search-index.json (${pages.length} pages)`);
}
