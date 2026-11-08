[Back to the getting-started guide](../README.md)

# N2 Personas

72 reusable role prompts in 10 categories for AI applications. A small Node.js loader provides stable identifiers and profile metadata. The Markdown profiles can also be used directly in other languages.

[한국어 안내](reference.ko.md)

## Install

Requires Node.js 20 or later. Install the tagged GitHub release.

```sh
npm install github:choihyunsus/n2-personas#v1.0.0
```

## Use

```js
import { listPersonas, getPersona } from 'n2-personas';

const available = listPersonas('dev');
const profile = getPersona('dev/web-frontend');
console.log(available.map(item => item.id));
console.log(profile.prompt);
```

Append the selected prompt to the task's instructions while retaining the application's identity, permissions and memory scope. Profile text describes a requested role. Measure the model's output on your own tasks before relying on its advice. Version-specific technology references in profiles should be checked against the target project's dependencies.

`listPersonas(category?)` returns `{ id, category, name, tags }` records. An unknown category returns an empty array. `getPersona(id)` adds `prompt` and throws `RangeError` for an unknown identifier. Both functions return independent metadata objects.

## Categories

| Category | Profiles |
|---|---:|
| dev | 14 |
| design | 8 |
| content | 8 |
| writing | 7 |
| media | 6 |
| business | 9 |
| data | 5 |
| education | 4 |
| automation | 5 |
| support | 6 |

## Soul integration

This read-only catalog needs no database. The host application owns memory and can record a selection through Soul 9.2's existing `n2_kv_save` MCP tool. Use the caller's actual agent and project scope. These field names match the published Soul tool.

```json
{
  "agent": "example-agent",
  "project": "example-project",
  "summary": "Selected n2-personas dev/web-frontend for a frontend review.",
  "decisions": ["Use profile dev/web-frontend from n2-personas 1.0.0."],
  "todo": []
}
```

The host sends this object to `n2_kv_save` and checks the returned result. Standalone profile loading requires no Soul connection. Profile selection does not automatically write or modify memories.

## Verification

```sh
npm test
npm pack --dry-run
```

Tests load every catalogued profile, validate category counts, reject invalid identifiers and check returned metadata isolation. Model quality and expertise remain application-level evaluation responsibilities.

## Origin and license

Extracted from N2 Daebung's generic persona catalog. The distribution includes catalogued profiles, the loader, documentation and tests. MIT license, copyright 2026 N2 AI Family.
