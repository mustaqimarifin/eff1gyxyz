const config = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "next",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "react/react-in-jsx-scope": 0,
    "@typescript-eslint/no-unused-vars": 0,
    "@typescript-eslint/no-non-null-assertion": 0,
    "@typescript-eslint/no-var-requires": 0,
    "@typescript-eslint/no-empty-interface": 0,
    "react/prop-types": 0,
    "@typescript-eslint/ban-ts-comment": 0,
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      {
        prefer: "type-imports",
        fixStyle: "inline-type-imports",
      },
    ],

    "@typescript-eslint/no-unsafe-assignment": 0,
    "@typescript-eslint/no-unsafe-member-access": 0,
    "@typescript-eslint/restrict-template-expressions": 0,
    "@typescript-eslint/no-unsafe-call": 0,
    "@typescript-eslint/no-unsafe-return": 0,
    "@typescript-eslint/no-unsafe-argument": 0,
  },
};

module.exports = config;
