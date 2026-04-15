<script lang="ts">
	type TeamMember = {
		name: string;
		role?: string;
		photo?: string;
		bio?: string;
	};

	let { data }: { data: Record<string, unknown> } = $props();

	const title = data.title as string | null;
	const members = (data.members as TeamMember[]) ?? [];
</script>

<section class="py-16 bg-gray-50 dark:bg-gray-900">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		{#if title}
			<h2 class="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">{title}</h2>
		{/if}
		<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
			{#each members as member, i (`member-${i}-${member.name}`)}
				<div class="text-center">
					{#if member.photo}
						<div class="w-24 h-24 mx-auto rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden mb-4">
							<img src={member.photo} alt={member.name} class="w-full h-full object-cover" />
						</div>
					{:else}
						<div class="w-24 h-24 mx-auto rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mb-4">
							<span class="text-2xl text-gray-400">{member.name[0]}</span>
						</div>
					{/if}
					<h3 class="font-semibold text-gray-900 dark:text-white">{member.name}</h3>
					{#if member.role}
						<p class="text-sm text-gray-500 dark:text-gray-400">{member.role}</p>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</section>
