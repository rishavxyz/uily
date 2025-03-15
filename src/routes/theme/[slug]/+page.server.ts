// export const prerender = false

import db, { objectKey } from '$lib/db'
import type { Result } from '$lib/types/result'
import type { PageServerLoad } from './$types'

const props = `{
  title
  created_at
  metadata {
	author {
	  slug
	  title
	}
    description
	requirments
	notes
	files
	likes
}`

export const load: PageServerLoad = async ({ params, locals }) => {
	const { object } = await db.objects
		.findOne({
			type: objectKey,
			slug: params.slug
		})
		.props(props)
		.depth(1)

	return {
		result: object as Result,
		theme: locals.theme
	}
}
