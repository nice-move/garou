import { execFile } from 'child_process';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { promisify } from 'util';

import { fs, Text } from 'fs-chain';
import { getPkg } from 'settingz';

const { source, main } = getPkg();

const Exec = promisify(execFile);

const bin = process.argv.includes('--build') ? main : source;

console.log('Bin:', bin);

function Read(path) {
  return new Text(import.meta.url).source(path);
}

function Copy(filename) {
  return Read(`../../fixture/source/${filename}`).output(`../temp/${filename}`);
}

function Run(filename) {
  return Exec('node', [bin, `test/helper/temp/${filename}`]);
}

const npx = process.platform.startsWith('win') ? 'npx.cmd' : 'npx';

function Format(filename) {
  return Exec(npx, [
    '--no-install',
    'prettier',
    `test/helper/temp/${filename}`,
    '-w',
    '-u',
  ]);
}

function Result(filename) {
  return Read(`../temp/${filename}`);
}

function Expected(filename) {
  return Read(`../../fixture/expected/${filename}`);
}

function Delete(filename) {
  return fs
    .remove(fileURLToPath(join(import.meta.url, '../temp', filename)))
    .catch(console.warn);
}

export async function Test(t, filename) {
  await Copy(filename);

  await Run(filename);

  await Format(filename);

  const expected = await Expected(filename);

  const result = await Result(filename);

  t.is(result.trim(), expected.trim());

  if (t.passed) {
    await Delete(filename);
  }
}
