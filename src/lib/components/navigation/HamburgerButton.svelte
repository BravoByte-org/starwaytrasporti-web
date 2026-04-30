<script lang="ts">
	type Props = {
		open: boolean;
		controls: string;
		onclick: () => void;
	};

	let { open, controls, onclick }: Props = $props();
</script>

<button
	type="button"
	class="hamburger-button"
	class:hamburger-button--open={open}
	aria-expanded={open}
	aria-controls={controls}
	aria-label={open ? 'Chiudi menu' : 'Apri menu'}
	{onclick}
>
	<span class="hamburger-button__box" aria-hidden="true">
		<span class="hamburger-button__line"></span>
		<span class="hamburger-button__line"></span>
		<span class="hamburger-button__line"></span>
	</span>
</button>

<style lang="postcss">
	@reference '../../../app.css';

	.hamburger-button {
		@apply relative inline-flex h-10 w-10 items-center justify-center rounded-md text-fg-inverse transition-colors md:hidden;

		&:hover {
			@apply bg-fg-inverse/10;
		}

		&:focus-visible {
			@apply ring-2 ring-accent outline-none;
		}
	}

	.hamburger-button__box {
		@apply relative block h-4 w-6;
	}

	.hamburger-button__line {
		@apply absolute left-0 block h-0.5 w-full rounded-full bg-current transition-all duration-200 ease-in-out;

		&:nth-child(1) {
			top: 0;
		}

		&:nth-child(2) {
			top: 50%;
			transform: translateY(-50%);
		}

		&:nth-child(3) {
			bottom: 0;
		}
	}

	.hamburger-button--open .hamburger-button__line:nth-child(1) {
		top: 50%;
		transform: translateY(-50%) rotate(45deg);
	}

	.hamburger-button--open .hamburger-button__line:nth-child(2) {
		@apply opacity-0;
	}

	.hamburger-button--open .hamburger-button__line:nth-child(3) {
		bottom: 50%;
		transform: translateY(50%) rotate(-45deg);
	}
</style>
