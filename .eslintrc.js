module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint/eslint-plugin"],
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: [".eslintrc.js"],
  rules: {
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    semi: [2, "always"],
    quotes: [2, "single"],
    "arrow-parens": [2, "as-needed"],
    "arrow-body-style": [2, "as-needed"],
    "max-classes-per-file": [2, 1],
    "no-console": 2,
    "no-else-return": 2,
    "no-eval": 2,
    "no-magic-numbers": 0,
    "no-return-await": 2,
    "no-undef-init": 2,
    "no-unused-expressions": 2,
    "object-shorthand": 2,
    "object-curly-spacing": [2, "never"],
    "one-var": [2, {let: "never", const: "never"}],
    "padding-line-between-statements": [2, {blankLine: "always", prev: ["const", "let"], next: "*"}, {
      blankLine: "any",
      prev: ["const", "let"],
      next: ["const", "let"]
    }],
    "prefer-arrow-callback": [2, {allowNamedFunctions: true, allowUnboundThis: true}],
    "prefer-template": 2,
    "@typescript-eslint/adjacent-overload-signatures": 2,
    "@typescript-eslint/array-type": [2, {default: "array-simple"}],
    "@typescript-eslint/consistent-type-assertions": [2, {
      assertionStyle: "as",
      objectLiteralTypeAssertions: "allow-as-parameter"
    }],
    "@typescript-eslint/consistent-type-definitions": [2, "interface"],
    "@typescript-eslint/explicit-function-return-type": [2, {allowExpressions: true}],
    "@typescript-eslint/explicit-member-accessibility": [2, {
      accessibility: "explicit",
      overrides: {constructors: "off"}
    }],
    "@typescript-eslint/member-ordering": 2,
    "@typescript-eslint/method-signature-style": [2, "property"],
    "@typescript-eslint/naming-convention": [
      2,
      {format: ["PascalCase"], selector: ["class", "interface", "enum"]},
      {format: ["camelCase"], leadingUnderscore: "allow", selector: "variable"},
    ],
    "@typescript-eslint/no-empty-interface": 2,
    "@typescript-eslint/no-extraneous-class": [2, {
      allowConstructorOnly: true,
      allowEmpty: true,
      allowStaticOnly: true
    }],
    "@typescript-eslint/no-invalid-this": ["error"],
    "@typescript-eslint/no-magic-numbers": [1, {ignoreEnums: true}],
    "@typescript-eslint/no-namespace": 2,
    "@typescript-eslint/no-shadow": 2,
    "@typescript-eslint/prefer-for-of": 2,
    "@typescript-eslint/prefer-function-type": 2,
    "@typescript-eslint/prefer-namespace-keyword": 2,
    "@typescript-eslint/quotes": [2, "single", {avoidEscape: true}],
    "@typescript-eslint/typedef": [1, {propertyDeclaration: true}],
    "@typescript-eslint/unified-signatures": 2,
  },
  overrides: [
    {
      files: ["./**/*.spec.ts"],
      rules: {
        "@typescript-eslint/no-explicit-any": 0,
        "@typescript-eslint/no-magic-numbers": 0,
      },
    },
    {
      files: ["./**/*.html"],
      parser: "@angular-eslint/template-parser",
      extends: ['plugin:@angular-eslint/template/recommended'],
      plugins: ["@angular-eslint/template"],
      rules: { }
    }
  ],
};
