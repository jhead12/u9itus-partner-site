import { test } from 'node:test';
import assert from 'node:assert/strict';
import { pageUrl, targetFor } from '../target.mjs';

const env = { U9ITUS_PAGE_URL: 'https://u9itus.com/portal/music-social' };

test('the home page shows the published portal', () => {
  assert.equal(targetFor('/', '', env).href, 'https://u9itus.com/portal/music-social');
  assert.equal(targetFor('/', '?src=link', env).href, 'https://u9itus.com/portal/music-social?src=link');
});

test('other paths come from the same U9itus host', () => {
  assert.equal(targetFor('/build/assets/app.js', '', env).href, 'https://u9itus.com/build/assets/app.js');
  assert.equal(targetFor('/storage/logos/a.png', '?v=2', env).href, 'https://u9itus.com/storage/logos/a.png?v=2');
});

test('a trailing slash, query or hash on U9ITUS_PAGE_URL is ignored', () => {
  assert.equal(pageUrl({ U9ITUS_PAGE_URL: ' https://u9itus.com/portal/music-social/?t=x#a ' }).href, 'https://u9itus.com/portal/music-social');
});

test('a missing or wrong U9ITUS_PAGE_URL is refused', () => {
  for (const value of ['', 'not a url', 'http://u9itus.com/portal/x', 'https://u9itus.com/', 'https://u9itus.com/portal/x/claim', 'ftp://u9itus.com/portal/x']) {
    assert.equal(targetFor('/', '', { U9ITUS_PAGE_URL: value }), null, value);
  }
});

test('localhost over http works for trying it out', () => {
  assert.equal(targetFor('/', '', { U9ITUS_PAGE_URL: 'http://127.0.0.1:8010/portal/x' }).href, 'http://127.0.0.1:8010/portal/x');
});
