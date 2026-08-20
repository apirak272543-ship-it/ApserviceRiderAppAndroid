import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const nativeApi = fs.readFileSync(path.join(root, 'src', 'api.ts'), 'utf8');

assert.match(nativeApi, /action: "update_rider_presence"/, 'Rider Android shell must use the shared server-owned presence action');
assert.doesNotMatch(nativeApi, /rest\(`riders\?id=eq\.\$\{encodeURIComponent\(rider\.id\)\}`, session, \{ method: "PATCH"/, 'Rider Android shell must not direct-patch location or readiness');
console.log('rider APK presence contract: PASS');
