// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

export default defineConfig({
	site: 'https://conxian.org',
	adapter: vercel({
		webAnalytics: { enabled: true }
	}),
	vite: {
		plugins: [tailwindcss()],
	},
	integrations: [
		starlight({
			title: 'Conxian Protocol Surface',
			description: 'Public-safe documentation for Conxian protocol infrastructure, Conxius developer tooling, and ecosystem evidence.',
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/Conxian' },
			],
			customCss: ['./src/styles/tailwind.css'],
			sidebar: [
				{
					label: 'Overview',
					items: [
						{ label: 'Protocol Surface', slug: 'index' },
						{ label: 'Repository Status Matrix', slug: 'ecosystem/status' },
						{ label: 'Auditability & Transparency', slug: 'transparency' },
					],
				},
				{
					label: 'Guides',
					items: [
						{ label: 'Getting Started', slug: 'guides/getting-started' },
					],
				},
				{
					label: 'Architecture & Governance',
					items: [
						{ label: 'Portfolio Boundaries', slug: 'docs/architecture' },
						{ label: 'Domain Separation', slug: 'docs/domain-firewall' },
						{ label: 'CLI Installer', slug: 'docs/cli-installer' },
					],
				},
				{
					label: 'Subsystem References',
					items: [
						{ label: 'Enclave SDK', slug: 'docs/enclave-sdk' },
						{ label: 'Gateway Middleware', slug: 'docs/gateway' },
						{ label: 'Nexus State Infrastructure', slug: 'docs/nexus' },
						{ label: 'Conxius Platform', slug: 'docs/platform' },
						{ label: 'Market Research Surface', slug: 'docs/market' },
					],
				},
			],
		}),
	],
});
