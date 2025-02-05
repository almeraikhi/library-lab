import { defineConfig, loadEnv, UserConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default ({ mode }: UserConfig) => {
  process.env = {
    ...process.env,
    ...loadEnv(mode ?? 'development', process.cwd()),
  };

  return defineConfig({
    plugins: [react()],
    resolve: {
      alias: {
        '~': path.resolve(__dirname, 'src'),
      },
    },
    define: {
      'process.env': process.env,
    },
  });
};
