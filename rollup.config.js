/* eslint-disable import/no-default-export */
/* eslint-disable import/no-named-as-default */
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
// import terser from '@rollup/plugin-terser';
import {defineConfig} from 'rollup';
import dts from 'rollup-plugin-dts';

export default defineConfig([
  ...[
    ['index', ['./globalThis/index.js', './websocket.js']],
    ['websocket', ['./websocket-constructor/index.js']],
    ['globalThis/index', []],
    ['globalThis/browser', []],
    ['websocket-constructor/index', ['ws']],
    ['websocket-constructor/browser', ['../globalThis/index.js']],
  ].reduce(
    (prev, [name, external]) =>
      prev
        .concat({
          input: `src/${name}.ts`,
          output: [
            {
              file: `dist/cjs/${name}.js`,
              format: 'cjs',
              sourcemap: true,
            },
            {
              file: `dist/esm/${name}.js`,
              format: 'esm',
              sourcemap: true,
            },
          ],
          plugins: [
            resolve(),
            commonjs(),
            // terser(),
            typescript(),
            babel({babelHelpers: 'bundled'}),
            json(),
          ],
          external,
        })
        .concat({
          input: `src/${name}.ts`,
          output: {
            format: 'esm',
            file: `dist/esm/${name}.d.ts`,
          },
          plugins: [dts()],
          external,
        }),
    []
  ),
]);
