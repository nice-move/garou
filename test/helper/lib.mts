import { exec } from 'node:child_process';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

import type { ExecutionContext } from 'ava';
// @ts-expect-error ----------------
import { fs, Text } from 'fs-chain';

const Exec = promisify(exec);

const bin = 'lib/cli.mjs';

console.log('Bin:', bin);

function Read(path: string) {
  return new Text(import.meta.url).source(path);
}

function Copy(filename: string) {
  return Read(`../../fixture/source/${filename}`).output(
    `../../fixture/temp/${filename}`,
  );
}

function Run(filename: string) {
  return Exec(`node ${bin} test/fixture/temp/${filename}`).then(
    ({ stdout, stderr }) => {
      console.log(stdout);

      return { stdout, stderr };
    },
  );
}

function Format(filename: string) {
  return Exec(`pnpm exec prettier -w -u "test/fixture/temp/${filename}"`).then(
    ({ stdout, stderr }) => {
      console.warn(stderr);

      return { stdout, stderr };
    },
  );
}

function Result(filename: string) {
  return Read(`../../fixture/temp/${filename}`);
}

function Delete(filename: string) {
  return fs
    .remove(
      join(fileURLToPath(import.meta.url), '../../fixture/temp', filename),
    )
    .catch(console.warn);
}

export async function Test(t: ExecutionContext, filename: string) {
  await Copy(filename);

  await Run(filename);
  await Run(filename);

  await Format(filename);

  const result = await Result(filename);

  t.snapshot(result.trim());

  if (t.passed) {
    await Delete(filename);
  }
}
