export interface Result {
	object: string
	id: string
	created_time: string
	last_edited_time: string
	created_by: CreatedBy
	last_edited_by: LastEditedBy
	cover: string | null
	icon: string | null
	parent: Parent
	archived: boolean
	in_trash: boolean
	properties: Properties
	url: string
	public_url: string | null
}

export interface CreatedBy {
	object: string
	id: string
}

export interface LastEditedBy {
	object: string
	id: string
}

export interface Parent {
	type: string
	database_id: string
}

export interface Properties {
	ID: Id
	Description: Description
	Category: Category
	Author: Author
	Thumbnails: Thumbnails
	Created_Time: CreatedTime
	Name: Name
}

export interface Id {
	id: string
	type: string
	unique_id: UniqueId
}

export interface UniqueId {
	prefix: string | null
	number: number
}

export interface Description {
	id: string
	type: string
	rich_text: RichText[]
}

export interface RichText {
	type: string
	text: Text
	annotations: Annotations
	plain_text: string
	href: string | null
}

export interface Text {
	content: string
	link: string | null
}

export interface Annotations {
	bold: boolean
	italic: boolean
	strikethrough: boolean
	underline: boolean
	code: boolean
	color: string
}

export interface Category {
	id: string
	type: string
	select: string | null
}

export interface Author {
	id: string
	type: string
	created_by: {
		object: string
		id: string
		name: string
		avatar_url: string | null
		type: string
		person: Person
	}
}

export interface Person {
	email: string
}

export interface Thumbnails {
	id: string
	type: string
	files: File[]
}

export interface File {
	name: string
	type: string
	file: {
		url: string
		expiry_time: string
	}
}

export interface CreatedTime {
	id: string
	type: string
	created_time: string
}

export interface Name {
	id: string
	type: string
	title: Title[]
}

export interface Title {
	type: string
	text: {
		content: string
		link: string | null
	}
	annotations: {
		bold: boolean
		italic: boolean
		strikethrough: boolean
		underline: boolean
		code: boolean
		color: string
	}
	plain_text: string
	href: string | null
}
