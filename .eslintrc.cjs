module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:astro/recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended'
  ],
  overrides: [
    {
      files: ['*.astro'],
      parser: 'astro-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro']
      },
      rules: {
        // Reglas específicas para archivos Astro
      }
    },
    {
      files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
      rules: {
        // Reglas específicas para archivos JavaScript/TypeScript
      }
    }
  ],
  settings: {
    react: {
      version: 'detect'
    }
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true
  },
  rules: {
    // Reglas globales
    'no-unused-vars': 'warn',
    'no-console': 'warn'
  }
};