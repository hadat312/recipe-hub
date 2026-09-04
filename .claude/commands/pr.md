---
description: Create a pull request (or draft PR) for the current branch, filled in from the team's PR template.
argument-hint: [draft]
---

Create a pull request for the changes on the current branch, in the current working directory's repo.

Pass `draft` as the argument (i.e. the command was invoked as `/pr draft`) to open it as a **draft** PR (`gh pr create --draft`); otherwise open it ready for review.

## Steps

1. Check for uncommitted changes (`git status`). If any exist, stage and commit them with a message that describes what changed and why — never commit silently without checking first.
2. Determine the base branch: this project uses git-flow — feature branches merge into `develop`, never directly into `main` (`main` is production/stable, only `develop` merges into it, and that's a separate, deliberate action). So the base is `develop` if it exists on the remote (`git ls-remote --heads origin develop`); only fall back to `main`/`master` if there's no `develop` branch. Never default to `main` when `develop` exists — if you're ever about to target `main`, stop and confirm with the user first.
3. Push the current branch to `origin` (`git push -u origin <branch>`).
4. Check whether a PR already exists for this branch: `gh pr list --head <branch>`. If one does, just push new commits and report its existing URL — do not create a duplicate, and leave its draft/ready state as-is.
5. Read the PR template at `../templates/pull_request_template.md` (relative to the repo root) and fill in **every** section based on the actual diff and commits on this branch (use `git log <base>..HEAD` and `git diff <base>...HEAD` to see what actually changed — don't guess):
   - **What Changed?** — concise, specific description of what changed and why.
   - **Screenshots/Videos** — if the change is visual (UI) and you verified it in a browser this session, note that visual verification happened; otherwise leave the placeholder comment as-is. Never fabricate or claim a screenshot that wasn't taken.
   - **Impact Area Identification** — honestly list what this branch touches and what else could be affected (shared components, config, other services). Only check a "Type of Impact" box if it genuinely applies — leave the rest unchecked.
   - **Type of Change** — check only the box(es) that actually apply to this diff.
   - **Related Documentation** — link anything relevant (design doc, issue, spec) if one exists; otherwise leave the placeholder.
   - **How to Test?** — concrete, step-by-step instructions a reviewer could actually follow to verify the change.
   - **Checklist** — check an item only if it's actually true for this session's work (e.g. don't check "All tests pass locally" unless tests were actually run; don't check "Added/updated tests" unless you did).
6. Create the PR with `gh pr create --title "[Claude Code] <title>" --body "<filled-in template>"` — always prefix the title with `[Claude Code]` so it's clear the PR was opened by Claude Code, adding `--base <base>` only if that base branch exists on origin, and `--draft` per the argument rule above.
7. Report the PR URL, and wrap it on its own line as: `<pr-created>URL</pr-created>`

Keep to the git safety rules already in effect: never force-push, never skip hooks, never commit `.env` or other secret files, and confirm before anything destructive.
