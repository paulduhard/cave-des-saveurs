export function slugify(text: string): string {
	return text
		.toString()
		.normalize('NFD')
		.replace(/[̀-ͯ]/g, '')
		.toLowerCase()
		.trim()
		.replace(/\s+/g, '-')
		.replace(/[^\w-]+/g, '')
		.replace(/--+/g, '-');
}

export function unslugify(slug: string): string {
	return slug.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
}
