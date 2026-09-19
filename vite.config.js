import { cpSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    {
      name: 'copy-article-assets',
      closeBundle() {
        const outDir = resolve('dist');
        cpSync(resolve('app.js'), resolve(outDir, 'app.js'));
        cpSync(resolve('article-local.html'), resolve(outDir, 'article-local.html'));
        cpSync(resolve('assets'), resolve(outDir, 'assets'), { recursive: true });
      },
    },
  ],
});
