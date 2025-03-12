/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
module.exports = {
  bracketSameLine: true,
  endOfLine: 'lf',
  importOrder: ['<BUILTIN_MODULES>', '', '<THIRD_PARTY_MODULES>'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: ['@ianvs/prettier-plugin-sort-imports'],
  printWidth: 110,
  proseWrap: 'always',
  quoteProps: 'consistent',
  semi: false,
  singleQuote: true,
  trailingComma: 'none'
}
