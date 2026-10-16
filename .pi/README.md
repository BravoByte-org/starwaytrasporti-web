# pi config — pointer

Skills and extensions are **not** defined in this repo. `settings.json` here
points at the canonical copies in `bravobyte-ai`:

```json
{
	"skills": ["../../../core/bravobyte-ai/.pi/skills"],
	"extensions": ["../../../core/bravobyte-ai/.pi/extensions"]
}
```

Paths resolve relative to this `.pi/` directory, so `../../` climbs out of
`.pi/` and out of this repo, landing in the `BravoByte/` parent alongside
`bravobyte-ai/`. This pointer is required because pi reads
`.pi/settings.json` only from the exact working directory (verified in the
0.85.1 source; it does not walk up to the git root) — without it, a pi session
started here sees no BravoByte skills at all. Launch pi from the repo root.
(`AGENTS.md`, by contrast, is discovered by walking up.)

To add or change a skill, edit it in `bravobyte-ai/.pi/skills/` — not here.
Persona content itself lives one level further up, in
`bravobyte-ai/commands/*.md`.

Anything genuinely specific to this delivery repo belongs in its own `.ai/`
directory (this repo already has `.ai/rules/starway-project.md` and
`.ai/rules/coding-standards.md`), not in a local skill override.
