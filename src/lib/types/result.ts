export interface Result {
	id: string
	slug: string
	title: string
	created_at: string
	thumbnail: string | null
	metadata: Metadata
}

export interface Metadata {
	description: string | null
	author: Author
	categories: Category[]
	screenshots: Screenshot[]
	likes_count: number
	dominant_color: string
	notes: string | null
	steps_to_recreate: string | null
}

export interface Author {
	id: string
	slug: string
	title: string
	created_at: string
	metadata: AuthorMetadata
}

export interface AuthorMetadata {
	about: string
	themes_created: number
}

export interface Category {
	id: string
	slug: string
	title: string
	created_at: string
	metadata: CategoryMeta
}

export interface CategoryMeta {
	banner: ImageSource | null
	description: string
}

export interface Screenshot {
	screenshot: ImageSource
}

export interface ImageSource {
	imgix_url: string
}

export interface Requirment {
	requirment: string
}
