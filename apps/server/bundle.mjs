import * as esbuild from 'esbuild';

await esbuild.build({
  entryPoints: ['src/index.ts'],
  // loader: { '.node': 'file' },
  bundle: true,
  platform: 'node',
  external: ['sharp'],
  outfile: 'dist/index.js',
});
