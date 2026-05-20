# vyberoom-realty-demo

Target repository for the **Vyberoom investor demo** — a real-estate scaffold the
`@vybeteam-backend` agent edits live during the demo flow.

## What runs the demo

The agent receives a prompt in `demo.vyberoom.ai`, writes a `[VYBE_PATCH]`
block against this repo, the Vyberoom backend pushes it to a branch via the
`vyberoom-builder` GitHub identity, opens a PR, then the presenter switches
accounts and uses `vyberoom-admin` to approve + merge.

Branch protection on `main` enforces:

- ≥ 1 approving review
- Code-owner review required (`.github/CODEOWNERS` → `* @vyberoom-admin`)
- `test` workflow must pass

This means the **builder** account can push branches and open PRs but cannot
self-approve or merge — the **admin** account is required for the merge.

## Project layout

| Path | What |
|---|---|
| `src/lib/data/listings.ts` | The seed listings fixture the agent mutates during the demo. |
| `tests/listings.test.ts` | Asserts the fixture shape (≥3 featured, unique ids, required fields). |
| `.github/workflows/test.yml` | Runs `npm ci && npm test` on every push and PR to `main`. |
| `.github/CODEOWNERS` | Routes every PR to `@vyberoom-admin` for review. |

## Local

```bash
npm install
npm test
```
