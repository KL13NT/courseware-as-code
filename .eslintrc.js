module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es6: true,
		node: true,
		'jest/globals': true,
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:jsx-a11y/recommended',
		'plugin:jest/style',
	],
	parser: '@babel/eslint-parser',
	parserOptions: {
		ecmaVersion: 2020,
		ecmaFeatures: {
			jsx: true,
			modules: true,
			experimentalObjectRestSpread: true,
		},
		requireConfigFile: false,
		babelOptions: {
			presets: [
				[
					'@babel/preset-react',
					{
						runtime: 'automatic',
					},
				],
			],
		},
	},
	plugins: ['react', 'jsx-a11y', 'jest'],
	rules: {
		indent: 0,
		'linebreak-style': 0,
		'react/react-in-jsx-scope': 0,
		'react-hooks/exhaustive-deps': 0,
		'react/no-unescaped-entities': 0,
		'react/jsx-curly-spacing': 0,
		'react/prop-types': 0,
		'jest/no-disabled-tests': 'warn',
		'jest/no-focused-tests': 'error',
		'jest/no-identical-title': 'error',
		'jest/prefer-to-have-length': 'warn',
		'jest/valid-expect': 'error',
		'no-mixed-spaces-and-tabs': 0,
		'prefer-rest-params': 0,
		'no-whitespace-before-property': 2,
		'object-curly-spacing': ['error', 'always'],
		semi: ['error', 'never'],
		'block-spacing': [2, 'always'],
		'arrow-spacing': [
			'error',
			{
				before: true,
				after: true,
			},
		],
		quotes: [
			'error',
			'single',
			{
				avoidEscape: true,
			},
		],
		'no-unused-vars': [
			'error',
			{
				varsIgnorePattern: 'Fragment',
			},
		],
		'quote-props': [
			'error',
			'as-needed',
			{
				keywords: false,
			},
		],
		'space-unary-ops': [
			2,
			{
				words: true,
				nonwords: false,
				overrides: {
					new: true,
					'=': true,
				},
			},
		],
		'prefer-destructuring': [
			'error',
			{
				array: true,
				object: true,
			},
			{
				enforceForRenamedProperties: false,
			},
		],
		'prefer-const': [
			'error',
			{
				destructuring: 'any',
				ignoreReadBeforeAssign: false,
			},
		],
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
	},
}
