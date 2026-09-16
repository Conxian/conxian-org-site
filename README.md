# Conxian Protocol Surface (`conxian.org`)

[![CI & Security Governance](https://github.com/Conxian/conxian-org-site/actions/workflows/ci.yml/badge.svg)](https://github.com/Conxian/conxian-org-site/actions/workflows/ci.yml)
[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](LICENSE)
[![Security Policy](https://img.shields.io/badge/Security-Gitleaks_Enforced-green.svg)](.github/workflows/ci.yml)

The official technical distribution, developer documentation, and public status portal for **Conxian** (`conxian.org`).

---

## Technical Overview & Operating Philosophy

Conxian is a pure **Deep-Tech B2B Infrastructure Vendor** specializing in hardware-secured, memory-safe, sovereign infrastructure for:
1. **Bitcoin Layer 1 & Layer 3 Settlement:** Native MuSig2 Schnorr multi-signatures and Discrete Log Contracts (DLCs).
2. **Legacy Banking Interoperability:** ISO 20022 XML financial messaging normalizers and OData v4 query callback interfaces.
3. **AI Settlement Enclaves:** Hardware-enclave-bound automated settlement engines executing within Trusted Execution Environments (TEEs - AWS Nitro, Intel SGX, AMD SEV).

> **Crucial Operating Policy:** Conxian does **NOT** operate public DeFi protocols, yield pools, token bridges, or public liquidity venues. We license stateless container images and hardware execution parameters for enterprise clients to run entirely within their own private cloud infrastructure or physical hardware enclaves.

---

## Domain Separation Firewall Routing

Conxian maintains a strict legal and architectural firewall separating the open-source **Protocol & Developer Surface** (`conxian.org`) from the corporate **Business & Operations Surface** (`conxian-labs.com`).

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
│           ├── ecosystem.mdx    # Repository Status Matrix (12 core repos)
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

* Node.js v22.x
* `pnpm` v10.x

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
