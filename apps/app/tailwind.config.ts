import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--red)',
          contrastText: 'var(--white)',
        },
        background: {
          DEFAULT: 'var(--grey-500)',
          paper: 'var(--white)',
        },
        text: {
          DEFAULT: 'var(--black)',
        },
      },
    },
  },
};
export default config;
