import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: 'var(--color-accent)',
          text: '#FFFFFF',
        },
        background: {
          DEFAULT: 'var(--color-background)',
          paper: 'var(--color-background-paper)',
        },
        text: {
          DEFAULT: 'var(--color-text)',
        },
        primary: {
          DEFAULT: '#4D80F0',
          contrastText: '#FFFFFF',
        },
      },
    },
  },
};
export default config;
