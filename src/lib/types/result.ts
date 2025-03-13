export interface Result {
	id: string
	slug: string
	title: string
	created_at: string
	metadata: Metadata
}

export interface Metadata {
	description: string
	author: Author
	color: string
	category: Category
	files: File[]
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
	home_screen: HomeScreen
	lock_screen: LockScreen
}

export interface HomeScreen {
	url: string
	imgix_url: string
}

export interface LockScreen {
	url: string
	imgix_url: string
}
