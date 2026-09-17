# CONXIAN MASTER RECONNAISSANCE & ARCHITECTURE REVIEW

**Document Version:** 1.0.0
**Status:** Approved Lead Systems Engineering Reference
**Author:** Lead Systems Engineer (Jules AI / Conxian Engineering)
**Classification:** Confidential - Internal & Partner Distribution Only

---

## EXECUTIVE DIRECTIVE & ARCHITECTURAL PHILOSOPHY

Conxian operates as a pure **Deep-Tech B2B Infrastructure Vendor**. We engineer hardware-secured, memory-safe, sovereign infrastructure designed specifically for:
1. **Bitcoin Layer 1 & Layer 3 Settlement:** Utilizing native MuSig2 multi-signatures and Discrete Log Contracts (DLCs).
2. **Legacy Banking Interoperability:** Native ISO 20022 XML financial messaging normalizers and OData v4 query callback interfaces.
3. **AI Settlement Enclaves:** Hardware-enclave-bound automated settlement engines executing within Trusted Execution Environments (TEEs).

**Crucial Non-Goal Statement:** Conxian does **NOT** operate public DeFi protocols, yield pools, token bridges, or public smart contract liquidity venues. We license stateless container images and hardware execution parameters for enterprise clients (tier-1 banks, sovereign treasuries, and enterprise AI node operators) to execute strictly inside their own private cloud infrastructures or physical hardware enclaves.

---

## REQUIRED READING: STRICT DOMAIN SEPARATION & FIREWALL ROUTING

Conxian maintains a strict legal, architectural, and network firewall separating the open-source **Protocol & Developer Surface** (`conxian.org`) from the corporate **Business & Operations Surface** (`conxian-labs.com`).

```
                              +-------------------------------------------+
                              |         ENTERPRISE CLIENT INGRESS          |
                              +--------------------+----------------------+
                                                   |
                         +-------------------------+-------------------------+
                         |                                                   |
                         v                                                   v
        +---------------------------------+                 +---------------------------------+
        |  PROTOCOL & DEV SURFACE         |                 |  CORPORATE & GOVERNANCE SURFACE |
        |  (conxian.org)                  |                 |  (conxian-labs.com)             |
        |  Pure Tech Distribution & Docs  |                 |  B2B Sales, Legal, Operations   |
        +----------------+----------------+                 +----------------+----------------+
                         |                                                   |
        +----------------+----------------+                 +----------------+----------------+
        | - nexus.conxian.org             |                 | - bos.conxian-labs.com          |
        | - gateway.conxian.org           |                 | - www.conxian-labs.com          |
        | - sdk.conxian.org               |                 +---------------------------------+
        | - platform.conxian.org          |
        | - market.conxian.org            |
        +---------------------------------+
```

### Domain Routing & Service Matrix

| Repository Name | Target Subdomain / FQDN | Surface Category | Architectural Responsibility |
| :--- | :--- | :--- | :--- |
| `conxian-nexus` | `nexus.conxian.org` | Protocol (`conxian.org`) | Bitcoin L1/L3 DLC contract engine & state proof solver |
| `conxian-gateway` | `gateway.conxian.org` | Protocol (`conxian.org`) | ISO 20022 XML normalizer & OData v4 callback engine |
| `conxius-enclave-sdk` | `sdk.conxian.org` | Protocol (`conxian.org`) | TEE drivers (AWS Nitro, Intel SGX, AMD SEV) & MuSig2 signer |
| `conxius-platform` | `platform.conxian.org` | Protocol (`conxian.org`) | Sovereign container orchestration & enclave runner specs |
| `conxian_market` | `market.conxian.org` | Protocol (`conxian.org`) | Zero-knowledge settlement auditability & transparency feed |
| `conxian-org-site` | `conxian.org` | Protocol (`conxian.org`) | Technical distribution, developer docs & status portal |
| `conxian-business` | `bos.conxian-labs.com` | Corporate (`conxian-labs.com`) | B2B sales portal, license verification & client agreements |
| `conxian-labs-site` | `www.conxian-labs.com` | Corporate (`conxian-labs.com`) | Corporate marketing, investor relations & company news |

---

## PHASE 1: REPOSITORY SYNC & BASELINE INDEXING

A organization-wide synchronization (`git fetch --all -p` and `git submodule update --init --recursive`) was conducted to index all 12 core repositories within the Conxian ecosystem.

### Core Repository Inventory Matrix

| # | Repository | Core Language / Tech | Primary Architectural Purpose | Baseline Status |
| :-: | :--- | :--- | :--- | :--- |
| 1 | `lib-conxian-core` | Rust (`no_std`) | Memory-safe cryptographic primitives, MuSig2, Schnorr, DLC state models | Active Baseline |
| 2 | `conxian-nexus` | Rust | Bitcoin L1 anchor builder, DLC settlement engine, state proof verifier | Active Baseline |
| 3 | `conxian-gateway` | Rust / Tokio | ISO 20022 XML message parser (pacs.008, camt.053), OData v4 callback handler | Active Baseline |
| 4 | `conxius-enclave-sdk` | C / Rust | Hardware enclave abstraction layer (Nitro, SGX, SEV), attestation generator | Active Baseline |
| 5 | `conxius-platform` | Rust / K8s / Docker | Stateless container orchestration, enclave parameter validator | Active Baseline |
| 6 | `conxian_market` | Rust / TypeScript | Zero-knowledge transparency proofs, audit data feed generator | Active Baseline |
| 7 | `conxian-business` | TypeScript / React | Enterprise portal, licensing backend, client contract management | Active Baseline |
| 8 | `conxian-labs-site` | Next.js / React | Corporate site for Conxian Labs Inc. (`www.conxian-labs.com`) | Active Baseline |
| 9 | `conxian-org-site` | Astro / Starlight | Open-source developer docs & protocol hub (`conxian.org`) | Active / Scaffolded |
| 10 | `.github` | YAML | Organization-wide security policy, Gitleaks workflows, CODEOWNERS governance | Active Baseline |
| 11 | `conxian-cli` | Rust | Unified client CLI installer & hardware enclave parameter pre-flight check | Specification Stage |
| 12 | `conxian-spec` | JSON Schema / Protobuf | Canonical schemas for ISO 20022 XML to Bitcoin DLC mappings | Specification Stage |

---

## PHASE 2: ORG-WIDE PLATFORM REVIEW & CRUFT PURGE

### Architectural Dependency Map

```
                                +---------------------------+
                                |     conxius-platform      |
                                | (Orchestration & Enclave) |
                                +-------------+-------------+
                                              |
                     +------------------------+------------------------+
                     |                                                 |
                     v                                                 v
        +-------------------------+                       +-------------------------+
        |     conxian-gateway     |                       |      conxian-nexus      |
        |  (ISO 20022 Normalizer) |                       | (Bitcoin L1/L3 DLCs)    |
        +------------+------------+                       +------------+------------+
                     |                                                 |
                     +------------------------+------------------------+
                                              |
                                              v
                                +---------------------------+
                                |    conxius-enclave-sdk    |
                                |  (Hardware Enclave / TEE) |
                                +-------------+-------------+
                                              |
                                              v
                                +---------------------------+
                                |     lib-conxian-core      |
                                |  (Rust Primitives/MuSig2) |
                                +---------------------------+
```

### Deprecated Dependency Purge Audit

To enforce strict sovereignty and security, all legacy Web3, altcoin, and public DeFi dependencies have been audited and purged across all repositories:

1. **Purged Components:**
   - **EVM / Ethereum / Solidity dependencies:** Removed `@ethersproject`, `web3.js`, `solc`, and EVM RPC hooks.
   - **Altcoin Networks:** Removed Solana, Cosmos, and EVM chain adapters.
   - **Public DeFi Protocols:** Removed automated market maker (AMM) routing, yield pool adapters, and public liquidity bridge contracts.
2. **Standardized Infrastructure Focus:**
   - **Bitcoin L1 & L3:** Exclusively native Bitcoin Schnorr signatures, MuSig2 aggregation (`BIP-340`, `BIP-341`, `BIP-342`), and Discrete Log Contracts (`BIP-175`).
   - **Banking Messaging:** Standardized on ISO 20022 XML formats (`pacs.008.001.10`, `pacs.009.001.10`, `camt.053.001.10`) and OData v4 JSON query models.
   - **Memory-Safe Execution:** 100% Rust memory safety (`#![deny(unsafe_code)]` in non-SDK crates) executing inside audited TEE enclaves.

---

## PHASE 3: B2B CLIENT DEPLOYMENT SIMULATION

### 1. Purchase & Licensing Flow
Enterprise clients license stateless container images directly via the `conxian-business` platform (`bos.conxian-labs.com`).
* Upon contract execution, the client receives a cryptographically signed **Hardware Enclave License Token (HELT)**.
* Container images are pulled from `registry.conxian.org` using mutual TLS (mTLS) authenticated via the HELT and the hardware enclave's remote attestation key pair.

### 2. Setup & Environment Parameter Specification (`.env`)

Enterprise clients populate the following immutable environment configuration prior to container boot:

```ini
# ==============================================================================
# CONXIAN SOVEREIGN INFRASTRUCTURE ENTERPRISE CONFIGURATION
# ==============================================================================

# ------------------------------------------------------------------------------
# 1. HARDWARE ENCLAVE & TEE DRIVER CONFIGURATION
# ------------------------------------------------------------------------------
TEE_PROVIDER=aws_nitro                   # Options: aws_nitro | intel_sgx | amd_sev | mock_dev
TEE_ATTESTATION_DOC_PATH=/var/run/enclave/attestation.bin
TEE_ENCLAVE_CID=16
TEE_ENCLAVE_MEMORY_MB=8192
TEE_ENCLAVE_CPU_COUNT=4
HELT_LICENSE_TOKEN=<YOUR_HELT_LICENSE_TOKEN>

# ------------------------------------------------------------------------------
# 2. BITCOIN L1 / L3 SETTLEMENT NODE (NEXUS)
# ------------------------------------------------------------------------------
BITCOIN_NETWORK=mainnet                  # Options: mainnet | testnet4 | signet
BITCOIN_RPC_URL=https://node.internal.bank.com:8332
BITCOIN_RPC_USER=conxian_settlement
BITCOIN_RPC_PASS_FILE=/etc/conxian/secrets/btc_rpc_pass
BITCOIN_MUSIG2_PUBKEY_PREFIX=02a1b2c3d4e5f6...
NEXUS_DLC_ORACLE_URL=https://oracle.internal.bank.com/v1
NEXUS_STATE_DB_PATH=/var/lib/conxian/nexus_state.lmdb

# ------------------------------------------------------------------------------
# 3. ISO 20022 BANKING GATEWAY (GATEWAY)
# ------------------------------------------------------------------------------
GATEWAY_LISTEN_PORT=8443
GATEWAY_MTLS_CERT_PATH=/etc/conxian/certs/gateway_tls.crt
GATEWAY_MTLS_KEY_PATH=/etc/conxian/certs/gateway_tls.key
GATEWAY_ISO20022_SCHEMA_DIR=/opt/conxian/schemas/iso20022/
GATEWAY_ODATA_CALLBACK_URL=https://corebanking.internal.bank.com/odata/v4/Settlements

# ------------------------------------------------------------------------------
# 4. MARKET & AUDIT PROOF ENGINE
# ------------------------------------------------------------------------------
MARKET_AUDIT_LOG_DIR=/var/log/conxian/audit
MARKET_ZK_PROOF_GENERATE=true
```

### 3. End-to-End Execution Trace

```
 +------------------------+      +------------------------+      +------------------------+
 |  ISO 20022 XML Input   | ---> |    conxian-gateway     | ---> |  conxius-enclave-sdk   |
 |  (pacs.008 payment)    |      | (Normalizer & Parser)  |      |  (TEE MuSig2 Signing)  |
 +------------------------+      +------------------------+      +-----------+------------+
                                                                             |
 +------------------------+      +------------------------+                  |
 |  conxian_market Audit  | <--- |     conxian-nexus      | <----------------+
 | (Zero-Knowledge Proof) |      | (Bitcoin DLC L1 Anchor)|
 +------------------------+      +------------------------+
```

1. **Ingress:** Bank Core transmits ISO 20022 `pacs.008` XML wire message over mTLS to `conxian-gateway` (`gateway.conxian.org`).
2. **Normalization:** `conxian-gateway` validates XML schema, normalizes payment instruction into an OData v4 structure, and forwards to `conxius-enclave-sdk`.
3. **Hardware Enclave Signing:** `conxius-enclave-sdk` verifies hardware attestation, loads private key shares into Nitro/SGX secure memory, and executes MuSig2 nonce generation and partial signature calculation (`BIP-340`).
4. **L1 Anchor Execution:** `conxian-nexus` builds Discrete Log Contract (DLC) funding/execution transactions and broadcasts the L1 anchor transaction to the client's internal Bitcoin node.
5. **Callback & Audit:** `conxian-nexus` fires OData v4 settlement callbacks to the bank core and posts zero-knowledge audit proofs to `conxian_market`.

### 4. Installer Efficacy & Unified CLI Spec (`conxian-cli`)

A unified pre-flight CLI installer (`conxian-cli`) is required to validate host environment flags before spinning up container workloads:
* **Hardware Validation:** Checks `/dev/nitro_enclaves`, CPU flags (`SEV-SNP`, `SGX2`), hugepages allocation, and kernel lock status (`kernel.lockdown`).
* **Environment Validation:** Verifies `.env` parameters, testnet/mainnet RPC connectivity, and ISO 20022 schema integrity.
* **Command Spec:** `conxian-cli preflight --config /etc/conxian/.env --enclave-check`

---

## PHASE 4: ISSUE MAPPING & GAP ANALYSIS

Cross-referencing codebase state against open organization issues reveals 6 critical gap candidates:

### Criticality Scoring Matrix

| Gap ID | Category | Subsystem | Description & Criticality | Proposed Candidate Solution |
| :--- | :--- | :--- | :--- | :--- |
| **GAP-SEC-01** | Security | Enclave SDK | **Critical (S1):** TEE attestation document freshness check missing revocation list validation. | Implement OCSP/CRL verification inside `conxius-enclave-sdk` attestation verifier. |
| **GAP-SEC-02** | Security | Core Cryptography | **Critical (S1):** MuSig2 partial signature nonce reuse protection lacks explicit state lock file. | Add atomic file locks & persistent counter in `lib-conxian-core` state machine. |
| **GAP-ROUT-01** | Enterprise Routing | Gateway | **Major (R1):** ISO 20022 XML parsing fallback lacks XML Bomb / Entity Expansion (XXE) defense. | Restrict libxml2 / quick-xml parser entity resolution in `conxian-gateway`. |
| **GAP-ROUT-02** | Enterprise Routing | Platform | **Major (R2):** Missing unified CORS and domain proxy configs for `conxian.org` vs `conxian-labs.com`. | Deploy standardized NGINX and Caddy configs enforcing strict origin headers. |
| **GAP-UX-01** | UI / UX | Org Site | **Moderate (U1):** Public documentation missing developer hub pages for ISO 20022 & CLI installer. | Build Astro/Starlight Developer Hub in `conxian-org-site`. |
| **GAP-UX-02** | UI / UX | Market | **Minor (U2):** Zero-knowledge proof status dashboard lacks real-time socket refresh. | Implement WebSocket event listener for `conxian_market` status portal. |

---

## PHASE 5: END-TO-END CYCLE MAINTENANCE & NEXT CODE TASKS

### Summary of Completed Milestones
1. Full organizational synchronization across all 12 core repositories completed.
2. Complete purge of deprecated Web3, EVM, and public DeFi dependencies verified.
3. End-to-end client installation journey and ISO 20022 -> Bitcoin DLC execution path fully traced and documented.
4. Architecture specification for `conxian-cli` pre-flight hardware enclave validator finalized.
5. Strict domain firewall specifications for `conxian.org` (Protocol) vs `conxian-labs.com` (Corporate) formulated and ready for NGINX/Caddy deployment.

### Immediate Code-Generation Tasks
1. **Task 1 (`conxian-org-site`):** Build Astro + Starlight technical protocol portal featuring sovereign design, Repository Status Matrix, Developer Hub (`sdk`, `gateway`, `nexus`, `platform`, `market`, `cli`), and domain firewall specs.
2. **Task 2 (`conxian-org-site`):** Provide production NGINX (`nginx/nginx.conf`) and Caddy (`caddy/Caddyfile`) reverse-proxy configurations enforcing legal domain separation.
3. **Task 3 (`conxian-org-site`):** Provide Docker multi-stage build setup (`Dockerfile`) and GitHub Actions security workflow (`.github/workflows/ci.yml`).

---
*End of Master Reconnaissance & Architecture Review.*
