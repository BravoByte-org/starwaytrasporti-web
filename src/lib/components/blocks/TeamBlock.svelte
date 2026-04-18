<script lang="ts">
	type TeamMember = {
		name: string;
		role?: string;
		photo?: string;
		bio?: string;
	};

	let { data }: { data: Record<string, unknown> } = $props();

	let title = $derived((data.title as string | null | undefined) ?? null);
	let members = $derived((data.members as TeamMember[] | undefined) ?? []);
</script>

<section class="team-block">
	<div class="team-block__inner">
		{#if title}
			<h2 class="team-block__title">{title}</h2>
		{/if}
		<div class="team-block__grid">
			{#each members as member, i (`member-${i}-${member.name}`)}
				<div class="team-block__member">
					{#if member.photo}
						<div class="team-block__avatar">
							<img src={member.photo} alt={member.name} class="team-block__avatar-image" />
						</div>
					{:else}
						<div class="team-block__avatar team-block__avatar--placeholder">
							<span class="team-block__initial">{member.name[0]}</span>
						</div>
					{/if}
					<h3 class="team-block__name">{member.name}</h3>
					{#if member.role}
						<p class="team-block__role">{member.role}</p>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</section>

<style lang="postcss">
	@reference "../../../app.css";

	.team-block {
		@apply bg-gray-50 py-16 dark:bg-gray-900;
	}

	.team-block__inner {
		@apply mx-auto max-w-7xl px-4 sm:px-6 lg:px-8;
	}

	.team-block__title {
		@apply mb-12 text-center text-3xl font-bold text-gray-900 dark:text-white;
	}

	.team-block__grid {
		@apply grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4;
	}

	.team-block__member {
		@apply text-center;
	}

	.team-block__avatar {
		@apply mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700;
	}

	.team-block__avatar--placeholder {
		@apply flex items-center justify-center;
	}

	.team-block__avatar-image {
		@apply h-full w-full object-cover;
	}

	.team-block__initial {
		@apply text-2xl text-gray-400;
	}

	.team-block__name {
		@apply font-semibold text-gray-900 dark:text-white;
	}

	.team-block__role {
		@apply text-sm text-gray-500 dark:text-gray-400;
	}
</style>
