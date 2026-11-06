// Release regression tests exercise every published catalog entry.
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync, readdirSync } from 'node:fs';
import { listPersonas, getPersona } from '../index.js';

test('all 72 catalogued profiles load, with consistent counts and clean text', () => {
  const catalog = JSON.parse(readFileSync(new URL('../catalog.json', import.meta.url)));
  const personas = listPersonas();
  assert.equal(personas.length, 72);
  assert.equal(catalog.totalPersonas, personas.length);
  assert.equal(new Set(personas.map(entry => entry.id)).size, personas.length);
  for (const category of catalog.categories) {
    assert.equal(category.count, category.personas.length);
    assert.equal(listPersonas(category.id).length, category.count);
    const files = readdirSync(new URL(`../profiles/${category.id}/`, import.meta.url));
    assert.deepEqual(files.sort(), category.personas.map(entry => entry.file).sort());
  }
  for (const entry of personas) {
    const profile = getPersona(entry.id);
    assert.ok(profile.prompt.startsWith('#'));
    assert.ok(profile.prompt.length > 100);
    assert.doesNotMatch(profile.prompt, /[\x00-\x08\x0b\x0c\x0e-\x1f]/);
    assert.doesNotMatch(profile.prompt, /로제|주인님|\bRose\b|[CD]:[\\/]/i);
  }
});

test('invalid and traversal identifiers cannot read arbitrary files', () => {
  for (const id of ['../LICENSE', '/etc/passwd', 'dev/../../LICENSE', 'dev\\web-frontend', '', 'missing']) {
    assert.throws(() => getPersona(id), RangeError);
  }
  assert.throws(() => getPersona(null), TypeError);
  assert.throws(() => listPersonas({}), TypeError);
  assert.deepEqual(listPersonas('unknown'), []);
});

test('callers cannot mutate future lookups through returned metadata', () => {
  const first = listPersonas()[0];
  const original = getPersona(first.id);
  first.tags.push('mutated');
  first.name = 'mutated';
  const second = getPersona(first.id);
  second.tags.push('mutated');
  assert.deepEqual(getPersona(first.id), original);
});
