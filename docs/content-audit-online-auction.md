# Online-Auction claim-to-evidence audit

Audit date: 2026-11-08. Source: public repository `ngothoaidev/Online-Auction`, branch `feature/auction-upgrade`, pinned commit `303ae3348c8456fc4b5f83fe850b2b14db80a688`. Never substituted main. All links below use that immutable commit.

Base evidence URL: https://github.com/ngothoaidev/Online-Auction/tree/303ae3348c8456fc4b5f83fe850b2b14db80a688

## Matrix (written before case-study narrative)

| Claim | Source path / symbol | Tests / evidence inspected | Qualification | Publish decision |
| --- | --- | --- | --- | --- |
| React/Vite SPA, Express, PostgreSQL/Drizzle, separate worker | docs/architecture.md sections 1–3; frontend/package.json; backend/package.json; backend/worker.js | Worker imports jobs without HTTP app | Source inspection, not deployed topology verification | Publish as implementation architecture |
| Bids serialized per auction; DB clock evaluated after lock | backend/services/auctionCommands.js: lockAuction, dbClock, placeBid | backend/tests/integration/bidding.test.js: 50 concurrent bids, deadline lock wait, replay cases | Integration test source inspected, NOT executed in this audit | Publish mechanism; do not claim an independently passed concurrency suite |
| Private proxy maxima and integer money | backend/domain/bidding.js; backend/domain/money.js | backend/tests/unit/bidding.test.js | Scoped pure bidding/order suite independently run: 19 pass | Publish algorithm/rule evidence; no ownership attribution |
| Idempotency in the business transaction | backend/services/idempotency.js: runIdempotent; auctionCommands.js: placeBid | bidding.test.js: network retries and changed payload conflicts | No key means no idempotency; keyed calls only | Publish with explicit optional-key condition |
| Worker settlement and uniqueness | backend/services/settlement.js: settleOne; backend/db/schema.js: orders; worker.js | settlement.test.js: two workers / 30 lots, retries, deadline extension | Code/test-source corroborated, not independently database-tested | Publish design intent and safeguards; avoid unqualified exactly-once guarantee |
| Transactional outbox leases, retries, fencing | backend/services/outbox.js: enqueue, claim, dispatch | outbox.test.js: rollback, expiry, stale dispatcher; faults.test.js process-kill cases | At-least-once; no ordering guarantee across retries; email can duplicate after crash | Publish with trade-off |
| SSE replays committed public events | backend/services/realtime.js: streamAuction, startCursor | realtime.test.js; docs/architecture.md section 5 | Multi-instance behavior reasoned in source, not measured | Publish mechanism, qualify scale |
| Pure order state machine; manual/mock payment boundary | backend/domain/orderTransitions.js: planTransition; backend/services/orderCommands.js | Independently run orderTransitions.test.js; payments.test.js inspected | No real payment-provider validation; no real money claim | Publish explicit boundary |
| Reported hot-lot p95 549ms / 67 req/s | docs/validation/report-t23.md sections 1,5; docs/validation/load-t23.json phases.contendedBidding | Raw JSON agrees with report; 50 bidders, 20s phase, same-machine API/worker/DB/generator | Reported historical run, NOT reproduced; Ryzen 7 8845H, 14GB RAM, Windows 11, Node24.18, PG16.14 Docker; rules refused many bids | Publish only as repository-reported lab baseline with caveats |
| Historical full suite 154 integration tests / Lighthouse | docs/validation/report-t23.md | Report read; not a fresh independent run | README/report cannot prove current pass, production capacity or field CWV | Do not promote counts/scores as newly verified results |
| Public demo | README URL https://online-auction-1-a3t4.onrender.com/ | Web tool could not access; direct HTTP GET returned 200 on 2026-11-08 | No uptime/working-demo promise | Publish cold-start-labelled demo link; HTTP 200 is not deployment/flow validation |
| Screenshots | docs/validation/screenshots/after-t23/detail-1280-light.jpg, report screenshot section | Inspected seeded lot screenshot, with placeholder product imagery and demo account | Existing repository artifact; exact reproduction permission not separately established | Do not copy screenshot; use authored architecture figure, not a product screenshot |
| AI Listing Copilot | No implemented evidence established by this audit | Not present in audited feature matrix as a shipped capability | No completed/deployed feature evidence | Omit |
| Personal authorship | Repository ownership and one shallow commit cannot establish full contribution scope | Owner directed codebase review, did not identify a personal scope | Do not infer sole authorship or job experience | Publish an impersonal source-audited engineering study; role labelled source analysis, no personal achievement language |

## Independent execution vs source assertions

An initial full `node --test backend/tests/unit/*.test.js` attempt passed 22 tests but failed three test files because this isolated audit checkout has no drizzle-orm/postgres/zod dependencies installed. This is an environment/dependency failure, not evidence that the complete unit suite passed or that business assertions failed.

Then executed only dependency-free suites: `node --test backend/tests/unit/bidding.test.js backend/tests/unit/orderTransitions.test.js`: **19 tests passed, 0 failed**. Real PostgreSQL integration, E2E, load and Lighthouse were not re-executed. No database was provisioned or modified. The case study must keep this boundary explicit.

## Publication scope

The user requested an evidence-backed case study and directed review of the public codebase. The narrative attributes mechanisms to the inspected implementation, not to an unconfirmed sole author. No personal role, employer, dates, ownership percentage or improved performance is inferred. Development status remains in-progress; publishing the study does not mark the product complete.
