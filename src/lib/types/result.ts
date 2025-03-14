export interface Result {
	id: string
	slug: string
	title: string
	created_at: string
	thumbnail: string
	metadata: Metadata
}

export interface Metadata {
	description: string | null
	author: Author
	category: Category
	files: File[]
	likes: number
	comment: string | null
	requirments: Requirment[]
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
	key: string
	value: string
}

export interface File {
	home_screen: ImageSources
	lock_screen: ImageSources
}

export interface ImageSources {
	url: string
	imgix_url: string
}

export interface Requirment {
	requirment: string
}
