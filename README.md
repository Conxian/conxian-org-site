# Conxian Protocol Surface (`conxian.org`)

[![CI & Security Governance](https://github.com/Conxian/conxian-org-site/actions/workflows/ci.yml/badge.svg)](https://github.com/Conxian/conxian-org-site/actions/workflows/ci.yml)
[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](LICENSE)
[![Security Policy](https://img.shields.io/badge/Security-Gitleaks_Enforced-green.svg)](.github/workflows/ci.yml)

The official technical distribution, developer documentation, and public status portal for **Conxian** (`conxian.org`).

---

## Technical Overview & Operating Philosophy

This repository is the public protocol and developer documentation surface. Bitcoin L1 is the canonical trust/finality root for universal-chain infrastructure: external chains, networks, layers, and assets remain in scope. There is no native Conxian token, speculative tokenomics, or native staking incentive.

Public protocol contracts and developer references belong to `conxian.org`. Managed APIs, enterprise orchestration, SLAs, security auditing, and compliance integrations belong to `conxian-labs.com`. See [ARCHITECTURE.md](ARCHITECTURE.md) and the [capability evidence page](src/content/docs/docs/capability-evidence.mdx). Repository licenses remain authoritative; Nexus is BUSL-1.1 source available.

Hardware drivers and cryptographic interfaces have different evidence levels. Registry counts, build success, or mechanism metadata cannot establish live integrations, hardware provenance, independent custody, or production qualification.

---

## Domain Separation Firewall Routing

Proposed subsystem domains below are architectural references, not deployment claims. Conxian maintains an architectural boundary separating the public **Protocol & Developer Surface** (`conxian.org`) from the corporate **Business & Operations Surface** (`conxian-labs.com`).

| FQDN Subdomain | Surface Category | Service Description |
| :--- | :--- | :--- |
| **`conxian.org`** | Protocol Surface | Main Technical Developer Portal & Status Surface |
| **`nexus.conxian.org`** | Protocol Surface | Bitcoin L1/L3 DLC Engine & State Proof Solver |
| **`gateway.conxian.org`** | Protocol Surface | ISO 20022 XML Normalizer & OData v4 Callback Engine |
| **`sdk.conxian.org`** | Protocol Surface | Hardware Enclave SDK Drivers & MuSig2 Signer |
| **`platform.conxian.org`** | Protocol Surface | Sovereign Container Orchestration & Enclave Specs |
| **`market.conxian.org`** | Protocol Surface | Zero-Knowledge Auditability & Transparency Feed |
| **`bos.conxian-labs.com`** | Corporate Surface | B2B Sales Portal, Licensing Backend & Enterprise Agreements |
| **`www.conxian-labs.com`** | Corporate Surface | Conxian Labs Inc. Corporate Website |

---

## Project Structure & Technology Stack

* **Framework:** [Astro v7](https://astro.build/) with [Starlight](https://starlight.astro.build/)
* **Package Manager:** `pnpm`
* **Language:** TypeScript
* **Containerization:** Multi-stage `Dockerfile` with `nginx:1.27-alpine`
* **Security & CI/CD:** GitHub Actions CI workflow with Gitleaks secret scanner and strict `CODEOWNERS` policies.

```
conxian-org-site/
├── .github/
│   └── workflows/
│       └── ci.yml               # CI & Gitleaks workflow
├── caddy/
│   └── Caddyfile                # Automated TLS & reverse-proxy config
├── nginx/
│   └── nginx.conf               # Hardened NGINX reverse-proxy & CORS config
├── src/
│   └── content/
│       └── docs/
│           ├── index.mdx        # Homepage (Sovereign Technical Surface)
│           ├── ecosystem.mdx    # Portfolio navigation and evidence boundaries
│           ├── transparency.mdx # Auditability & ZK Proof summaries
│           └── docs/            # Developer Hub API reference pages
├── RECONNAISSANCE_AND_ARCHITECTURE_REVIEW.md # Master 5-Phase Architecture Review
├── CODEOWNERS                   # Governance review policies
├── Dockerfile                   # Production multi-stage Docker build
├── astro.config.mjs             # Starlight & site configuration
├── package.json                 # Node dependencies
└── README.md                    # Repository documentation
```

---

## Local Development & Build

### Prerequisites

* Node.js v24.x
* `pnpm` v10.28.0 (repository packageManager pin)

### Commands

```bash
# 1. Install dependencies
pnpm install

# 2. Run local development server
pnpm dev

# 3. Build static production bundle
pnpm build

# 4. Preview static production build
pnpm preview
```

---

## Sovereign Container Deployment

### Running with Docker

```bash
# Build multi-stage Docker image
docker build -t conxian-org-site:latest .

# Run container on port 80
docker run -d --name conxian_site -p 80:80 conxian-org-site:latest
```

---

## Governance & Security Policy

All code changes to `conxian.org` must pass the Gitleaks automated secret scanner and receive approval from assigned CODEOWNERS (`@Conxian/lead-systems-engineers` and `@Conxian/security-team`).

---

## Organizational Refinement & CXIP Proposal #1317

Conxian's organizational architecture aligns with **[Conxian Business Issue #1317](https://github.com/Conxian/conxian-business/issues/1317)** (*CXIP?:: Conxian org wide upgrade and refinement proposal*), driving:
* Complete auditability across all 12 core ecosystem repositories.
* Enforced legal domain separation between `conxian.org` (Protocol Surface) and `conxian-labs.com` (Corporate Surface).
* Pure hardware enclave (TEE) execution boundaries and memory-safe Rust primitives.
* Native ISO 20022 XML to Bitcoin Layer 1 DLC settlement mappings with OData v4 JSON query callbacks.


## Reproducible deployment builds

Use Node 24 and pnpm 10.28.0, as pinned in package.json and CI. Install with
`pnpm install --frozen-lockfile`; deployment must not regenerate the lockfile.
The workspace permits dependency scripts only for esbuild and sharp and keeps
strict dependency-build checking enabled, with a 24-hour minimum release age.
Review new script requirements explicitly when dependencies change.

`pnpm build` retains the Vercel adapter. For the Render Docker/Nginx deployment,
`DEPLOY_TARGET=static pnpm build` emits static assets in `dist` without the Vercel
adapter. CI builds both variants. Docker copies the workspace policy before the
install and excludes local dependencies, generated output, and environment files.

The October 13 repair was checked locally with a frozen install and both Astro
build variants. Docker engine validation and a live Render redeployment remain
separate release checks; a successful local build does not establish live status.
