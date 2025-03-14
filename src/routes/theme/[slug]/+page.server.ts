// export const prerender = false

import db from '$lib/db'
import type { Result } from '$lib/types/result'
import type { PageServerLoad } from './$types'

const props = `{
	id
	slug
	title
	created_at
	metadata {
		author {
			id
			slug
			title
		}
		description
		color
		files
	}
}`

export const load: PageServerLoad = async ({ params }) => {
	const { object } = await db.objects
		.findOne({
			type: 'thumbnails',
			slug: params.slug
		})
		.props(props)
		.depth(1)

	return {
		result: object as Result
	}
}
