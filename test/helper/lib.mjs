import { execFile } from 'node:child_process';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

// @ts-ignore
import { fs, Text } from 'fs-chain';

const Exec = promisify(execFile);

const bin = 'dist/cli.mjs';

console.log('Bin:', bin);

function Read(path) {
  return new Text(import.meta.url).source(path);
}

function Copy(filename) {
  return Read(`../../fixture/source/${filename}`).output(`../temp/${filename}`);
}

function Run(filename) {
  return Exec('node', [bin, `test/helper/temp/${filename}`]).then(
    ({ stdout, stderr }) => {
      console.log(stdout);

      return { stdout, stderr };
    },
  );
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

function Delete(filename) {
  return fs
    .remove(fileURLToPath(join(import.meta.url, '../temp', filename)))
    .catch(console.warn);
}

export async function Test(t, filename) {
  // @ts-ignore
  await Copy(filename);

  await Run(filename);

  await Format(filename);

  // @ts-ignore
  const result = await Result(filename);

  t.snapshot(result.trim());

  if (t.passed) {
    await Delete(filename);
  }
}
