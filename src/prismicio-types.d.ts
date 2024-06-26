// Code generated by Slice Machine. DO NOT EDIT.

import type * as prismic from '@prismicio/client';

type Simplify<T> = { [KeyType in keyof T]: T[KeyType] };

/**
 * Content for Contact documents
 */
interface ContactDocumentData {
	/**
	 * E-mail field in *Contact*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: contact.email
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/field#key-text
	 */
	email: prismic.KeyTextField;

	/**
	 * Téléphone field in *Contact*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: contact.telephone
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/field#key-text
	 */
	telephone: prismic.KeyTextField;

	/**
	 * Adresse field in *Contact*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: contact.adresse
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/field#rich-text-title
	 */
	adresse: prismic.RichTextField;

	/**
	 * GoogleMap field in *Contact*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: contact.googlemap
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/field#key-text
	 */
	googlemap: prismic.KeyTextField /**
	 * Logo Header field in *Contact*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: contact.logo_header
	 * - **Tab**: Logo
	 * - **Documentation**: https://prismic.io/docs/field#image
	 */;
	logo_header: prismic.ImageField<never>;

	/**
	 * Logo Footer field in *Contact*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: contact.logo_footer
	 * - **Tab**: Logo
	 * - **Documentation**: https://prismic.io/docs/field#image
	 */
	logo_footer: prismic.ImageField<never>;
}

/**
 * Contact document from Prismic
 *
 * - **API ID**: `contact`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type ContactDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<
	Simplify<ContactDocumentData>,
	'contact',
	Lang
>;

/**
 * Item in *Navigation → Links*
 */
export interface NavigationDocumentDataLinksItem {
	/**
	 * Link field in *Navigation → Links*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: navigation.links[].link
	 * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
	 */
	link: prismic.LinkField;

	/**
	 * Label field in *Navigation → Links*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: navigation.links[].label
	 * - **Documentation**: https://prismic.io/docs/field#key-text
	 */
	label: prismic.KeyTextField;
}

/**
 * Content for Navigation documents
 */
interface NavigationDocumentData {
	/**
	 * Links field in *Navigation*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: navigation.links[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/field#group
	 */
	links: prismic.GroupField<Simplify<NavigationDocumentDataLinksItem>>;
}

/**
 * Navigation document from Prismic
 *
 * - **API ID**: `navigation`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type NavigationDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<
	Simplify<NavigationDocumentData>,
	'navigation',
	Lang
>;

type PageDocumentDataSlicesSlice =
	| SpacerSlice
	| ProduitsSlice
	| BannerReviewSlice
	| BannerSocialSlice
	| BannerEventSlice
	| HeroSlice
	| RichTextSlice;

/**
 * Content for Page documents
 */
interface PageDocumentData {
	/**
	 * Title field in *Page*
	 *
	 * - **Field Type**: Title
	 * - **Placeholder**: *None*
	 * - **API ID Path**: page.title
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/field#rich-text-title
	 */
	title: prismic.TitleField;

	/**
	 * Slice Zone field in *Page*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: page.slices[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/field#slices
	 */
	slices: prismic.SliceZone<PageDocumentDataSlicesSlice> /**
	 * Meta Title field in *Page*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A title of the page used for social media and search engines
	 * - **API ID Path**: page.meta_title
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/field#key-text
	 */;
	meta_title: prismic.KeyTextField;

	/**
	 * Meta Description field in *Page*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A brief summary of the page
	 * - **API ID Path**: page.meta_description
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/field#key-text
	 */
	meta_description: prismic.KeyTextField;

	/**
	 * Meta Image field in *Page*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: page.meta_image
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/field#image
	 */
	meta_image: prismic.ImageField<never>;
}

/**
 * Page document from Prismic
 *
 * - **API ID**: `page`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type PageDocument<Lang extends string = string> = prismic.PrismicDocumentWithUID<
	Simplify<PageDocumentData>,
	'page',
	Lang
>;

export type AllDocumentTypes = ContactDocument | NavigationDocument | PageDocument;

/**
 * Primary content in *Evenements → Primary*
 */
export interface BannerEventSliceDefaultPrimary {
	/**
	 * Text field in *Evenements → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: banner_event.primary.text
	 * - **Documentation**: https://prismic.io/docs/field#rich-text-title
	 */
	text: prismic.RichTextField;

	/**
	 * Link field in *Evenements → Primary*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: banner_event.primary.link
	 * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
	 */
	link: prismic.LinkField;

	/**
	 * Label field in *Evenements → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: banner_event.primary.label
	 * - **Documentation**: https://prismic.io/docs/field#key-text
	 */
	label: prismic.KeyTextField;
}

/**
 * Standard variation for Evenements Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type BannerEventSliceDefault = prismic.SharedSliceVariation<
	'default',
	Simplify<BannerEventSliceDefaultPrimary>,
	never
>;

/**
 * Primary content in *Evenements → Primary*
 */
export interface BannerEventSliceBannerEventXlPrimary {
	/**
	 * Text field in *Evenements → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: banner_event.primary.text
	 * - **Documentation**: https://prismic.io/docs/field#rich-text-title
	 */
	text: prismic.RichTextField;

	/**
	 * Link field in *Evenements → Primary*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: banner_event.primary.link
	 * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
	 */
	link: prismic.LinkField;

	/**
	 * Label field in *Evenements → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: banner_event.primary.label
	 * - **Documentation**: https://prismic.io/docs/field#key-text
	 */
	label: prismic.KeyTextField;
}

/**
 * Large variation for Evenements Slice
 *
 * - **API ID**: `bannerEventXl`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type BannerEventSliceBannerEventXl = prismic.SharedSliceVariation<
	'bannerEventXl',
	Simplify<BannerEventSliceBannerEventXlPrimary>,
	never
>;

/**
 * Slice variation for *Evenements*
 */
type BannerEventSliceVariation = BannerEventSliceDefault | BannerEventSliceBannerEventXl;

/**
 * Evenements Shared Slice
 *
 * - **API ID**: `banner_event`
 * - **Description**: BannerEvent
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type BannerEventSlice = prismic.SharedSlice<'banner_event', BannerEventSliceVariation>;

/**
 * Primary content in *Newsletter → Primary*
 */
export interface BannerNewsletterSliceDefaultPrimary {
	/**
	 * Text field in *Newsletter → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: banner_newsletter.primary.text
	 * - **Documentation**: https://prismic.io/docs/field#rich-text-title
	 */
	text: prismic.RichTextField;
}

/**
 * Default variation for Newsletter Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type BannerNewsletterSliceDefault = prismic.SharedSliceVariation<
	'default',
	Simplify<BannerNewsletterSliceDefaultPrimary>,
	never
>;

/**
 * Slice variation for *Newsletter*
 */
type BannerNewsletterSliceVariation = BannerNewsletterSliceDefault;

/**
 * Newsletter Shared Slice
 *
 * - **API ID**: `banner_newsletter`
 * - **Description**: BannerNewsletter
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type BannerNewsletterSlice = prismic.SharedSlice<
	'banner_newsletter',
	BannerNewsletterSliceVariation
>;

/**
 * Primary content in *Avis → Primary*
 */
export interface BannerReviewSliceDefaultPrimary {
	/**
	 * Title field in *Avis → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: banner_review.primary.title
	 * - **Documentation**: https://prismic.io/docs/field#rich-text-title
	 */
	title: prismic.RichTextField;

	/**
	 * Link field in *Avis → Primary*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: banner_review.primary.link
	 * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
	 */
	link: prismic.LinkField;

	/**
	 * Label field in *Avis → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: banner_review.primary.label
	 * - **Documentation**: https://prismic.io/docs/field#key-text
	 */
	label: prismic.KeyTextField;
}

/**
 * Primary content in *Avis → Items*
 */
export interface BannerReviewSliceDefaultItem {
	/**
	 * Subtitle field in *Avis → Items*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: banner_review.items[].subtitle
	 * - **Documentation**: https://prismic.io/docs/field#rich-text-title
	 */
	subtitle: prismic.RichTextField;

	/**
	 * Text field in *Avis → Items*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: banner_review.items[].text
	 * - **Documentation**: https://prismic.io/docs/field#rich-text-title
	 */
	text: prismic.RichTextField;
}

/**
 * Default variation for Avis Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type BannerReviewSliceDefault = prismic.SharedSliceVariation<
	'default',
	Simplify<BannerReviewSliceDefaultPrimary>,
	Simplify<BannerReviewSliceDefaultItem>
>;

/**
 * Slice variation for *Avis*
 */
type BannerReviewSliceVariation = BannerReviewSliceDefault;

/**
 * Avis Shared Slice
 *
 * - **API ID**: `banner_review`
 * - **Description**: BannerReview
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type BannerReviewSlice = prismic.SharedSlice<'banner_review', BannerReviewSliceVariation>;

/**
 * Primary content in *Reseaux → Primary*
 */
export interface BannerSocialSliceDefaultPrimary {
	/**
	 * Text field in *Reseaux → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: banner_social.primary.text
	 * - **Documentation**: https://prismic.io/docs/field#rich-text-title
	 */
	text: prismic.RichTextField;
}

/**
 * Primary content in *Reseaux → Items*
 */
export interface BannerSocialSliceDefaultItem {
	/**
	 * Icon field in *Reseaux → Items*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: banner_social.items[].icon
	 * - **Documentation**: https://prismic.io/docs/field#image
	 */
	icon: prismic.ImageField<never>;

	/**
	 * Link field in *Reseaux → Items*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: banner_social.items[].link
	 * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
	 */
	link: prismic.LinkField;
}

/**
 * Default variation for Reseaux Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type BannerSocialSliceDefault = prismic.SharedSliceVariation<
	'default',
	Simplify<BannerSocialSliceDefaultPrimary>,
	Simplify<BannerSocialSliceDefaultItem>
>;

/**
 * Slice variation for *Reseaux*
 */
type BannerSocialSliceVariation = BannerSocialSliceDefault;

/**
 * Reseaux Shared Slice
 *
 * - **API ID**: `banner_social`
 * - **Description**: BannerSocial
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type BannerSocialSlice = prismic.SharedSlice<'banner_social', BannerSocialSliceVariation>;

/**
 * Primary content in *Hero → Primary*
 */
export interface HeroSliceDefaultPrimary {
	/**
	 * Image field in *Hero → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hero.primary.image
	 * - **Documentation**: https://prismic.io/docs/field#image
	 */
	image: prismic.ImageField<never>;

	/**
	 * Title field in *Hero → Primary*
	 *
	 * - **Field Type**: Title
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hero.primary.title
	 * - **Documentation**: https://prismic.io/docs/field#rich-text-title
	 */
	title: prismic.TitleField;

	/**
	 * Text field in *Hero → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hero.primary.text
	 * - **Documentation**: https://prismic.io/docs/field#rich-text-title
	 */
	text: prismic.RichTextField;

	/**
	 * Link field in *Hero → Primary*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hero.primary.link
	 * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
	 */
	link: prismic.LinkField;

	/**
	 * Label field in *Hero → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hero.primary.label
	 * - **Documentation**: https://prismic.io/docs/field#key-text
	 */
	label: prismic.KeyTextField;
}

/**
 * HeroImage variation for Hero Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type HeroSliceDefault = prismic.SharedSliceVariation<
	'default',
	Simplify<HeroSliceDefaultPrimary>,
	never
>;

/**
 * Primary content in *Hero → Primary*
 */
export interface HeroSliceHeroTextOnlyPrimary {
	/**
	 * Title field in *Hero → Primary*
	 *
	 * - **Field Type**: Title
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hero.primary.title
	 * - **Documentation**: https://prismic.io/docs/field#rich-text-title
	 */
	title: prismic.TitleField;

	/**
	 * Text field in *Hero → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hero.primary.text
	 * - **Documentation**: https://prismic.io/docs/field#rich-text-title
	 */
	text: prismic.RichTextField;
}

/**
 * HeroTexte variation for Hero Slice
 *
 * - **API ID**: `heroTextOnly`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type HeroSliceHeroTextOnly = prismic.SharedSliceVariation<
	'heroTextOnly',
	Simplify<HeroSliceHeroTextOnlyPrimary>,
	never
>;

/**
 * Slice variation for *Hero*
 */
type HeroSliceVariation = HeroSliceDefault | HeroSliceHeroTextOnly;

/**
 * Hero Shared Slice
 *
 * - **API ID**: `hero`
 * - **Description**: Hero
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type HeroSlice = prismic.SharedSlice<'hero', HeroSliceVariation>;

/**
 * Primary content in *Produits → Primary*
 */
export interface ProduitsSliceDefaultPrimary {
	/**
	 * Image field in *Produits → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: produits.primary.image
	 * - **Documentation**: https://prismic.io/docs/field#image
	 */
	image: prismic.ImageField<never>;

	/**
	 * Link field in *Produits → Primary*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: produits.primary.link
	 * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
	 */
	link: prismic.LinkField;

	/**
	 * Label field in *Produits → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: produits.primary.label
	 * - **Documentation**: https://prismic.io/docs/field#key-text
	 */
	label: prismic.KeyTextField;

	/**
	 * Image 2 field in *Produits → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: produits.primary.image_2
	 * - **Documentation**: https://prismic.io/docs/field#image
	 */
	image_2: prismic.ImageField<never>;

	/**
	 * Link 2 field in *Produits → Primary*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: produits.primary.link_2
	 * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
	 */
	link_2: prismic.LinkField;

	/**
	 * Label 2 field in *Produits → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: produits.primary.label_2
	 * - **Documentation**: https://prismic.io/docs/field#key-text
	 */
	label_2: prismic.KeyTextField;

	/**
	 * Title field in *Produits → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: produits.primary.title
	 * - **Documentation**: https://prismic.io/docs/field#rich-text-title
	 */
	title: prismic.RichTextField;

	/**
	 * Text field in *Produits → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: produits.primary.text
	 * - **Documentation**: https://prismic.io/docs/field#rich-text-title
	 */
	text: prismic.RichTextField;
}

/**
 * Default variation for Produits Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type ProduitsSliceDefault = prismic.SharedSliceVariation<
	'default',
	Simplify<ProduitsSliceDefaultPrimary>,
	never
>;

/**
 * Slice variation for *Produits*
 */
type ProduitsSliceVariation = ProduitsSliceDefault;

/**
 * Produits Shared Slice
 *
 * - **API ID**: `produits`
 * - **Description**: Produits
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type ProduitsSlice = prismic.SharedSlice<'produits', ProduitsSliceVariation>;

/**
 * Primary content in *Texte → Primary*
 */
export interface RichTextSliceDefaultPrimary {
	/**
	 * Content field in *Texte → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Lorem ipsum...
	 * - **API ID Path**: rich_text.primary.content
	 * - **Documentation**: https://prismic.io/docs/field#rich-text-title
	 */
	content: prismic.RichTextField;
}

/**
 * Default variation for Texte Slice
 *
 * - **API ID**: `default`
 * - **Description**: RichText
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type RichTextSliceDefault = prismic.SharedSliceVariation<
	'default',
	Simplify<RichTextSliceDefaultPrimary>,
	never
>;

/**
 * Slice variation for *Texte*
 */
type RichTextSliceVariation = RichTextSliceDefault;

/**
 * Texte Shared Slice
 *
 * - **API ID**: `rich_text`
 * - **Description**: RichText
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type RichTextSlice = prismic.SharedSlice<'rich_text', RichTextSliceVariation>;

/**
 * Primary content in *Espace → Primary*
 */
export interface SpacerSliceDefaultPrimary {
	/**
	 * Choix field in *Espace → Primary*
	 *
	 * - **Field Type**: Select
	 * - **Placeholder**: *None*
	 * - **Default Value**: Petit
	 * - **API ID Path**: spacer.primary.size
	 * - **Documentation**: https://prismic.io/docs/field#select
	 */
	size: prismic.SelectField<'Petit' | 'Moyen' | 'Grand', 'filled'>;
}

/**
 * Espace variation for Espace Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type SpacerSliceDefault = prismic.SharedSliceVariation<
	'default',
	Simplify<SpacerSliceDefaultPrimary>,
	never
>;

/**
 * Slice variation for *Espace*
 */
type SpacerSliceVariation = SpacerSliceDefault;

/**
 * Espace Shared Slice
 *
 * - **API ID**: `spacer`
 * - **Description**: Spacer
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type SpacerSlice = prismic.SharedSlice<'spacer', SpacerSliceVariation>;

declare module '@prismicio/client' {
	interface CreateClient {
		(
			repositoryNameOrEndpoint: string,
			options?: prismic.ClientConfig
		): prismic.Client<AllDocumentTypes>;
	}

	namespace Content {
		export type {
			ContactDocument,
			ContactDocumentData,
			NavigationDocument,
			NavigationDocumentData,
			NavigationDocumentDataLinksItem,
			PageDocument,
			PageDocumentData,
			PageDocumentDataSlicesSlice,
			AllDocumentTypes,
			BannerEventSlice,
			BannerEventSliceDefaultPrimary,
			BannerEventSliceBannerEventXlPrimary,
			BannerEventSliceVariation,
			BannerEventSliceDefault,
			BannerEventSliceBannerEventXl,
			BannerNewsletterSlice,
			BannerNewsletterSliceDefaultPrimary,
			BannerNewsletterSliceVariation,
			BannerNewsletterSliceDefault,
			BannerReviewSlice,
			BannerReviewSliceDefaultPrimary,
			BannerReviewSliceDefaultItem,
			BannerReviewSliceVariation,
			BannerReviewSliceDefault,
			BannerSocialSlice,
			BannerSocialSliceDefaultPrimary,
			BannerSocialSliceDefaultItem,
			BannerSocialSliceVariation,
			BannerSocialSliceDefault,
			HeroSlice,
			HeroSliceDefaultPrimary,
			HeroSliceHeroTextOnlyPrimary,
			HeroSliceVariation,
			HeroSliceDefault,
			HeroSliceHeroTextOnly,
			ProduitsSlice,
			ProduitsSliceDefaultPrimary,
			ProduitsSliceVariation,
			ProduitsSliceDefault,
			RichTextSlice,
			RichTextSliceDefaultPrimary,
			RichTextSliceVariation,
			RichTextSliceDefault,
			SpacerSlice,
			SpacerSliceDefaultPrimary,
			SpacerSliceVariation,
			SpacerSliceDefault
		};
	}
}
