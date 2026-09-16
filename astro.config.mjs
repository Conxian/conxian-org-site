// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://conxian.org',
	integrations: [
		starlight({
			title: 'Conxian Protocol',
			description: 'Hardware-secured, memory-safe sovereign infrastructure for Bitcoin L1, ISO 20022 banking, and AI settlement.',
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/Conxian' },
			],
			sidebar: [
				{
					label: 'Overview',
					items: [
						{ label: 'Sovereign Protocol Surface', slug: 'index' },
						{ label: 'Repository Status Matrix', slug: 'ecosystem' },
						{ label: 'Auditability & Transparency', slug: 'transparency' },
					],
				},
				{
					label: 'Architecture & Governance',
					items: [
						{ label: 'Master Architecture Review', slug: 'docs/architecture' },
						{ label: 'Domain Separation Firewall', slug: 'docs/domain-firewall' },
						{ label: 'Unified CLI Enclave Installer', slug: 'docs/cli-installer' },
					],
				},
				{
					label: 'Protocol Subsystem Reference',
					items: [
						{ label: 'conxius-enclave-sdk (sdk.conxian.org)', slug: 'docs/enclave-sdk' },
						{ label: 'conxian-gateway (gateway.conxian.org)', slug: 'docs/gateway' },
						{ label: 'conxian-nexus (nexus.conxian.org)', slug: 'docs/nexus' },
						{ label: 'conxius-platform (platform.conxian.org)', slug: 'docs/platform' },
						{ label: 'conxian_market (market.conxian.org)', slug: 'docs/market' },
					],
				},
			],
		}),
	],
});
