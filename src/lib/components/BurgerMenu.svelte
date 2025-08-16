<script lang="ts">
	import { PrismicLink } from '@prismicio/svelte';
	import type { Content } from '@prismicio/client';
	import type { RegionDocument, CouleurDocument } from '../../prismicio-types';
	import ExtLink from './ExtLink.svelte';
	import SearchIcon from './SearchIcon.svelte';

	export let settings: Content.SettingsDocument;
	export let regions: RegionDocument[] = [];
	export let colors: CouleurDocument[] = [];
	export let isActiveLink: (item: any) => boolean;
	export let isRegionActive: (region: any) => boolean;
	export let isColorActive: (color: any) => boolean;
	export let isCaveParentActive: boolean;
	export let onLinkClick: () => void;

	let isCaveExpanded = false;
	let isEpicerieExpanded = false;

	$: sortedColors = colors
		.slice()
		.sort((a, b) => (a.data.ordre_menu ?? 0) - (b.data.ordre_menu ?? 0));

	function toggleCave() {
		isCaveExpanded = !isCaveExpanded;
	}

	function toggleEpicerie() {
		isEpicerieExpanded = !isEpicerieExpanded;
	}
</script>

<nav
	class="fixed left-0 right-0 top-[85px] z-40 h-[calc(100vh-85px)] overflow-y-auto bg-secondary px-6 py-8 shadow-lg lg:hidden"
	aria-label="Burger Menu"
	style="background-color: var(--secondary);"
>
	<ul class="flex h-full flex-col gap-4">
		{#each settings.data.navigation as item, index (item.label)}
			{#if index === 1}
				<!-- Section LA CAVE -->
				<li>
					<button
						class="flex w-full items-center justify-between uppercase {isActiveLink(item) ||
						isCaveParentActive
							? 'font-bold text-primary'
							: ''}"
						on:click={toggleCave}
						aria-expanded={isCaveExpanded}
						aria-controls="cave-submenu"
					>
						{item.label}
						<svg
							class="h-4 w-4 transform transition-transform duration-300 {isCaveExpanded
								? 'rotate-180'
								: ''}"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M19 9l-7 7-7-7"
							/>
						</svg>
					</button>

					{#if isCaveExpanded}
						<div class="my-4 space-y-6" id="cave-submenu">
							<!-- Vins par région -->
							<div>
								<p class="mb-2 uppercase text-primary">Nos vins par région</p>
								<ul class="grid grid-cols-2 gap-y-2 text-sm font-light leading-none">
									{#each regions as region (region.id)}
										<li>
											<a
												href={`/cave/${region.uid === 'all' ? 'all-wines' : region.uid}`}
												class="hover:underline {isRegionActive(region)
													? 'font-bold text-primary'
													: ''}"
												on:click={onLinkClick}
											>
												{region.data.region}
											</a>
										</li>
									{/each}
								</ul>
							</div>

							<!-- Vins par couleur -->
							<div>
								<p class="mb-2 uppercase text-primary">Nos vins par couleur</p>
								<ul class="grid grid-cols-2 gap-y-2 text-sm font-light leading-none">
									{#each sortedColors as color (color.id)}
										<li>
											<a
												href={`/cave/${color.uid}`}
												class="hover:underline {isColorActive(color)
													? 'font-bold text-primary'
													: ''}"
												on:click={onLinkClick}
											>
												{color.data.couleur}
											</a>
										</li>
									{/each}
								</ul>
							</div>

							<!-- Alcools et spiritueux -->
							<div>
								<p class="mb-2 uppercase text-primary">Alcools et spiritueux</p>
								<ul class="grid grid-cols-2 gap-y-2 text-sm font-light leading-none">
									<li>Cognacs</li>
									<li>Armagnacs</li>
									<li>Whiskies</li>
									<li>Rhums</li>
									<li>Gin</li>
									<li>Eaux de vie et liqueurs</li>
									<li>Anisés</li>
									<li>Téquilas et Mezcals</li>
									<li>Apéritifs et mixologie</li>
									<li>Bières</li>
								</ul>
							</div>
						</div>
					{/if}
				</li>
			{:else if index === 2}
				<!-- Section L'ÉPICERIE -->
				<li>
					<button
						class="flex w-full items-center justify-between uppercase {isActiveLink(item)
							? 'font-bold text-primary'
							: ''}"
						on:click={toggleEpicerie}
						aria-expanded={isEpicerieExpanded}
						aria-controls="epicerie-submenu"
					>
						{item.label}
						<svg
							class="h-4 w-4 transform transition-transform duration-300 {isEpicerieExpanded
								? 'rotate-180'
								: ''}"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M19 9l-7 7-7-7"
							/>
						</svg>
					</button>

					{#if isEpicerieExpanded}
						<div class="my-4 space-y-6" id="epicerie-submenu">
							<ul class="grid grid-cols-2 gap-y-2 text-sm font-light leading-none">
								<li>Tartinable et apéritif</li>
								<li>Pâtés, rillettes et terrines</li>
								<li>Charcuterie</li>
								<li>Fromages</li>
							</ul>
						</div>
					{/if}
				</li>
			{:else}
				<li
					class="relative uppercase hover:underline {isActiveLink(item)
						? 'font-bold text-primary'
						: ''}"
				>
					{#if item.external_link}
						<PrismicLink
							field={item.link}
							class="flex items-center gap-2 hover:bg-secondary hover:text-primary"
							on:click={onLinkClick}
						>
							{item.label}
							<ExtLink />
							<span class="sr-only">External link</span>
						</PrismicLink>
					{:else}
						<PrismicLink
							field={item.link}
							class={isActiveLink(item) ? 'font-bold text-primary' : ''}
							on:click={onLinkClick}
						>
							{item.label}
						</PrismicLink>
					{/if}
				</li>
			{/if}
		{/each}

		<!-- Icône de recherche mobile -->
		<li class="border-b-[.5px] border-primary py-8">
			<button
				class="mx-auto flex items-center gap-3 uppercase transition-all duration-200"
				aria-label="Rechercher"
			>
				<SearchIcon class="h-8 w-8" />
			</button>
		</li>

		<!-- Informations de contact -->
		<li class="mt-auto pt-8 text-center">
			{#if settings.data.adresse}
				<p class="text-lg">Où nous trouver ?</p>
				<a
					href="https://maps.app.goo.gl/rpboHrYd2ha9ouip8"
					target="_blank"
					rel="noopener"
					class="text-sm transition-colors duration-200 hover:underline"
				>
					{settings.data.adresse}
				</a>
			{/if}
			{#if settings.data.telephone}
				<p class="mt-2 text-lg">Nous contacter</p>
				<a
					href="tel:{settings.data.telephone}"
					class="transition-colors duration-200 hover:underline"
				>
					{settings.data.telephone}
				</a>
			{/if}
			{#if settings.data.email}
				<p>
					<a
						href="mailto:{settings.data.email}"
						class="transition-colors duration-200 hover:underline"
					>
						{settings.data.email}
					</a>
				</p>
			{/if}
		</li>
	</ul>
</nav>
