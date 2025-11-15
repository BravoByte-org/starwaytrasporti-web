const Configuration = {
  extends: ['@commitlint/config-conventional'],
  rules: {
	'type-enum': [2, 'always', ['feat', 'fix', 'docs', 'style', 'refactor', 'perf', 'test', 'chore', 'revert', 'ci']],
	'subject-case': [2, 'always', ['sentence-case', 'start-case', 'pascal-case', 'upper-case', 'lower-case']],
  },
};

export default Configuration;