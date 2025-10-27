import nextPlugin from 'eslint-plugin-next';
import js from '@eslint/js';

export default [
  js.configs.recommended,
  ...nextPlugin.configs['core-web-vitals'],
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
    ],
  },
];
