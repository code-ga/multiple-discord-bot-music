import sapphirePrettierConfig from '@sapphire/prettier-config';

/** @type {import('prettier').Config} */
export default {
	// ...sapphirePrettierConfig,
	// overrides: [
	// 	...sapphirePrettierConfig.overrides,
	// 	{
	// 		files: ['README.md'],
	// 		options: {
	// 			tabWidth: 2,
	// 			useTabs: false,
	// 			printWidth: 120,
	// 			proseWrap: 'always'
	// 		}
	// 	}
	// ]

	arrowParens: 'always',
	bracketSameLine: false,
	objectWrap: 'preserve',
	bracketSpacing: true,
	semi: true,
	experimentalOperatorPosition: 'end',
	experimentalTernaries: false,
	singleQuote: false,
	jsxSingleQuote: false,
	quoteProps: 'as-needed',
	trailingComma: 'all',
	singleAttributePerLine: false,
	htmlWhitespaceSensitivity: 'css',
	vueIndentScriptAndStyle: false,
	proseWrap: 'preserve',
	insertPragma: false,
	printWidth: 70,
	requirePragma: false,
	tabWidth: 2,
	useTabs: true,
	embeddedLanguageFormatting: 'auto'
};
