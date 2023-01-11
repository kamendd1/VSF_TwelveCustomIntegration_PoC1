import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';
import { generateBaseConfig } from '../../rollup.base.config';

const server = {
  input: 'src/index.server.ts',
  output: [
    {
      file: pkg.server,
      format: 'cjs',
      sourcemap: true
    }
  ],
  external: [
    '@apollo/client/utilities',
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {})
  ],
  plugins: [
    nodeResolve({
      extensions: ['.ts', '.graphql', '.js']
    }),
    typescript()
  ]
};

export default [
  generateBaseConfig(pkg),
  server
];
