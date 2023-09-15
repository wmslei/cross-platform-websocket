/* eslint-disable no-undef */
import {readFileSync, writeFileSync} from 'node:fs';

function copy() {
  const pkg = JSON.parse(readFileSync(`${process.cwd()}/package.json`));

  for (const [prefix, type] of [
    ['./dist/esm/', 'module'],
    ['./dist/cjs/', 'commonjs'],
  ]) {
    writeFileSync(
      `${process.cwd()}${prefix.slice(1)}package.json`,
      JSON.stringify(
        {
          name: pkg.name,
          type,
          browser: Object.entries(pkg.browser).reduce(
            (prev, [key, value]) =>
              key.startsWith(prefix)
                ? {
                    ...prev,
                    [key.replace(prefix, './')]: value.replace(prefix, './'),
                  }
                : prev,
            {}
          ),
        },
        null,
        2
      )
    );
  }
}

copy();
