# Ops Knowledge Garden — Wiki Pass Undo Instructions

Date: 2026-08-14

## Safety summary

This work changes only the versioned Garden repository. It does not modify private Obsidian source notes. The published version can be reversed through Git without deleting history.

The recovery package preserves the exact local baseline, including the pre-existing uncommitted `ChatIR` to `chatIR` capitalization edits.

Recovery package:

`C:\Users\Humor\Documents\Garden Backups\2026-08-14 Ops Garden Wiki Pass`

## Safest complete undo

Use the recovery package only if the Garden repository has not received additional intentional edits after this pass:

1. Close any local Quartz development server.
2. Copy the ten Markdown files from `baseline\content\` back into `C:\Projects\ops-garden\content\`.
3. Restore these baseline files from `baseline\`:
   - `quartz.config.ts`
   - `quartz.layout.ts`
   - `quartz\components\ContentMeta.tsx`
   - `quartz\components\styles\contentMeta.scss`
4. Remove only the eight new public pages listed in the implementation report.
5. Remove the two wiki-pass report files from the repository root if desired.
6. Run `npx quartz build` from `C:\Projects\ops-garden` to regenerate `public\` and the Quartz cache from the restored source.

Do not use `git reset --hard`; the baseline already contained valuable uncommitted changes.

## Selective undo after later edits

If the Garden has been edited after this pass, do not replace the whole content directory. Compare the current file with `baseline\content\` and selectively reverse only the unwanted sections. The recovery package also contains the complete staged wiki-pass version for side-by-side comparison.

## Verification

After undo:

- `git diff -- content` should show the same `ChatIR` to `chatIR` capitalization-only source diff that existed before this pass.
- The eight new page filenames should no longer exist.
- A Quartz build should complete without unresolved-link warnings.

## Undoing the copy and voice correction pass

The second pass edits fourteen public Markdown files but does not modify private Obsidian notes, site configuration, or the recovery package described above.

Before publication, the correction pass can be reviewed with:

`git diff -- content`

The safest published undo is a new Git revert commit. Do not reset the repository or delete later work. The correction-pass commit is `ef2eb52`. Run:

`git revert ef2eb52`

Review the resulting diff before pushing. This reverses the published copy pass while preserving the project history and any later commits.

For selective undo, open the relevant file's history on GitHub and restore only the sentence or section you want back. The pre-correction public copy remains in the parent commit and the original private notes remain untouched.
