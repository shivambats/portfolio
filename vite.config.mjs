import { cp } from 'node:fs/promises';
import { resolve } from 'node:path';

export default {
  build: {
    rollupOptions: {
      input: {
        home: resolve('index.html'),
        writing: resolve('blog.html'),
      },
    },
  },
  plugins: [{
    name: 'copy-static-content',
    async closeBundle() {
      for (const directory of ['data', 'posts', 'images']) {
        await cp(resolve(directory), resolve('dist', directory), { recursive: true });
      }
    },
  }],
};
