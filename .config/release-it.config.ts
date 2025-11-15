export default {
	ci: false,
	git: {
		requireBranch: 'next',
		tagName: 'v${version}',
		commitMessage: 'chore: release v${version}',
		requireCleanWorkingDir: true,
		requireUpstream: false,
		requireCommits: true,
		push: true,
		pushArgs: ['--follow-tags']
	},
	github: {
		release: true,
		releaseName: 'Release v${version}',
		releaseNotes: null,
		preRelease: false,
		draft: false,
		tokenRef: '${{ secrets.GITHUB_TOKEN }}'
	},
	npm: {
		publish: false
	},
	hooks: {
		'after:release': 'echo Successfully released ${name} v${version} to ${repo.repository}.'
	},
	plugins: {
		'@release-it/conventional-changelog': {
			infile: '../CHANGELOG.md',
			header: '# Changelog',
			preset: {
				name: 'conventionalcommits',
				types: [
					{ type: 'feat', section: 'Features' },
					{ type: 'fix', section: 'Bug Fixes' },
					{ type: 'perf', section: 'Performance Improvements' },
					{ type: 'revert', section: 'Reverts' },
					{ type: 'docs', section: 'Documentation' },
					{ type: 'style', section: 'Styles' },
					{ type: 'refactor', section: 'Code Refactoring' },
					{ type: 'test', section: 'Tests' },
					{ type: 'build', section: 'Builds' },
					{ type: 'ci', section: 'Continuous Integrations' },
					{ type: 'chore', section: 'Chores' },
					{ type: 'config', section: 'Configuration' }
				]
			}
		}
	}
}