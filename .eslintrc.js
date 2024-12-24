// module.exports = {
//     root: true,
//     parserOptions: {
//       ecmaVersion: 2020,
//       sourceType: 'module',
//       ecmaFeatures: {
//         jsx: true,
//       },
//     },
//     env: {
//       browser: true,
//       node: true,
//       es6: true,
//     },
//     settings: {
//       react: {
//         version: 'detect',
//       },
//     },
//     extends: [
//       'eslint:recommended',
//       'plugin:react/recommended',
//       'plugin:jsx-a11y/recommended',
//       'plugin:@next/next/recommended',
//     ],
//     rules: {
//       'react/react-in-jsx-scope': 'off',
//       'jsx-a11y/anchor-is-valid': [
//         'error',
//         {
//           components: ['Link'],
//           specialLink: ['hrefLeft', 'hrefRight'],
//           aspects: ['invalidHref', 'preferButton'],
//         },
//       ],
//     },
//   };





module.exports = {
    root: true,
    parser: '@typescript-eslint/parser', // Use TypeScript parser
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
      project: './tsconfig.json', // Link ESLint with your TypeScript config
    },
    env: {
      browser: true,
      node: true,
      es6: true,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:jsx-a11y/recommended',
      'plugin:@next/next/recommended',
      'plugin:@typescript-eslint/recommended', // Add TypeScript rules
      'prettier', // Prettier integration for code formatting
      'next/core-web-vitals'
    ],
    rules: {
      'react/react-in-jsx-scope': 'off', // React 17+ doesn't need React in scope
      'jsx-a11y/anchor-is-valid': [
        'error',
        {
          components: ['Link'],
          specialLink: ['hrefLeft', 'hrefRight'],
          aspects: ['invalidHref', 'preferButton'],
        },
      ],
      '@typescript-eslint/no-unused-vars': ['warn'], // Warn about unused variables
      '@typescript-eslint/explicit-module-boundary-types': 'off', // Optional for simplicity
      '@typescript-eslint/no-var-requires': 'off', // Allow `require` statements
    },
  };
