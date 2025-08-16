<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicRichText } from '@prismicio/svelte';

	export let slice: Content.NewsletterSignupSlice;

	let email = '';

	function handleSubmit() {
		if (email) {
			console.log('Newsletter signup submitted with email:', email);
			// TODO: Implement actual newsletter signup logic here (e.g., API call to your backend service)
			alert('Merci de vous être inscrit à notre newsletter!');
			email = ''; // Clear the input after submission
		} else {
			alert('Merci de saisir votre adresse email.');
		}
	}
</script>

<section
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
	class="bg-secondary py-12 text-center md:py-16"
>
	<div
		class="mx-auto max-w-4xl
 px-4 sm:px-6 md:flex md:flex-wrap md:items-center md:gap-4 lg:px-8"
	>
		{#if slice.primary.prompt_text}
			<div class="text-xl max-sm:mb-4 md:text-3xl">
				<PrismicRichText field={slice.primary.prompt_text} />
			</div>
		{/if}

		<form on:submit|preventDefault={handleSubmit} class="flex w-64 justify-center max-sm:mx-auto">
			<label for="email-input" class="sr-only">Email address</label>
			<div
				class="border-gray-300 bg-white focus-within:ring-indigo-500 focus-within:border-indigo-500 relative flex w-full max-w-md items-center border shadow-sm focus-within:ring-2"
			>
				<input
					id="email-input"
					type="email"
					bind:value={email}
					placeholder={slice.primary.placeholder_email || 'Enter your email'}
					aria-label="Your email address"
					required
					class="flex-grow rounded-l-md border-none bg-secondary px-4 py-2 focus:outline-none focus:ring-0"
				/>
				<button
					type="submit"
					aria-label={slice.primary.submit_action || 'Subscribe'}
					class="focus:indigo-500 flex-shrink-0 rounded-sm px-4 py-2 transition-all hover:translate-x-1 focus:outline-none focus:ring-2 focus:ring-offset-2"
				>
					<svg
						width="8"
						height="15"
						viewBox="0 0 8 15"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M0.999999 1L7 7.5L1 14"
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</button>
			</div>
		</form>
	</div>
</section>
