// @ts-ignore
import { exec } from 'node:child_process';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

import { fs, Text } from 'fs-chain';

const Exec = promisify(exec);

const bin = 'dist/cli.mjs';

console.log('Bin:', bin);

function Read(path) {
  return new Text(import.meta.url).source(path);
}

function Copy(filename) {
  return Read(`../../fixture/source/${filename}`).output(
    `../../fixture/temp/${filename}`,
  );
}

function Run(filename) {
  return Exec(`node ${bin} test/fixture/temp/${filename}`).then(
    ({ stdout, stderr }) => {
      console.log(stdout);

      return { stdout, stderr };
    },
  );
}

function Format(filename) {
  return Exec(`pnpm exec prettier -w -u "test/fixture/temp/${filename}"`).then(
    ({ stdout, stderr }) => {
      console.warn(stderr);

      return { stdout, stderr };
    },
  );
}

function Result(filename) {
  return Read(`../../fixture/temp/${filename}`);
}

function Delete(filename) {
  return fs
    .remove(
      fileURLToPath(join(import.meta.url, '../../fixture/temp', filename)),
    )
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
