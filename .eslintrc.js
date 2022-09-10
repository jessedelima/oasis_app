module.exports = {
	env: {
		es2021: true
	},
	extends: [
		'plugin:react/recommended',
		'standard'
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		},
		ecmaVersion: 12,
		sourceType: 'module'
	},
	plugins: [
		'react',
		'@typescript-eslint'
	],
	rules: {
		indent: [2, 'tab', { SwitchCase: 1, VariableDeclarator: 1 }],
		'no-tabs': 0,
		'react/prop-types': 0,
		'react/jsx-indent': [2, 'tab'],
		'react/jsx-indent-props': [2, 'tab'],
		'no-use-before-define': 'off',
		'@typescript-eslint/no-use-before-define': ['error'],
		'react/display-name': 'off',
		camelcase: 'off',
		'@typescript-eslint/camelcase': ['off']
	}
}
