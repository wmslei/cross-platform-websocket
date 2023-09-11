/* eslint-disable no-undef */
import {readFileSync, writeFileSync} from 'node:fs';

function copy() {
  const pkg = JSON.parse(readFileSync(`${process.cwd()}/package.json`));
  const content = {
    name: pkg.name,
    version: pkg.version,
    description: pkg.description,
    author: pkg.author,
    contributors: pkg.contributors,
    license: pkg.license,
    type: 'module',
    main: 'index.js',
    types: 'index.d.ts',
    exports: {
      types: './index.d.ts',
      import: './index.js',
      require: './index.cjs',
    },
    homepage: pkg.homepage,
    repository: pkg.repository,
    keywords: pkg.keywords,
    dependencies: pkg.dependencies,
  };
  writeFileSync(
    `${process.cwd()}/dist/package.json`,
    JSON.stringify(content, null, 2)
  );
}

copy();
