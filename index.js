// Read catalogued role prompts without changing the agent's identity or memory.
import { readFileSync } from 'node:fs';

const catalog = JSON.parse(readFileSync(new URL('./catalog.json', import.meta.url), 'utf8'));
const entries = new Map();
for (const category of catalog.categories) {
  if (!/^[a-z][a-z0-9-]*$/.test(category.id)) throw new Error('Invalid category identifier');
  for (const persona of category.personas) {
    if (!/^[a-z0-9][a-z0-9-]*\.md$/.test(persona.file)) throw new Error('Invalid profile filename');
    const id = `${category.id}/${persona.file.slice(0, -3)}`;
    if (entries.has(id)) throw new Error(`Duplicate profile identifier: ${id}`);
    entries.set(id, { id, category: category.id, name: persona.name, tags: [...persona.tags] });
  }
}

/** Return independent metadata objects that callers may safely modify. */
export function listPersonas(category) {
  if (category !== undefined && typeof category !== 'string') throw new TypeError('category must be a string');
  return [...entries.values()]
    .filter(entry => category === undefined || entry.category === category)
    .map(entry => ({ ...entry, tags: [...entry.tags] }));
}

/** Read a known profile by its stable category/name identifier. */
export function getPersona(id) {
  if (typeof id !== 'string') throw new TypeError('id must be a string');
  const entry = entries.get(id);
  if (!entry) throw new RangeError(`Unknown persona: ${id}`);
  const prompt = readFileSync(new URL(`./profiles/${id}.md`, import.meta.url), 'utf8');
  return { ...entry, tags: [...entry.tags], prompt };
}
