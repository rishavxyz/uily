// export const prerender = false

import db, { props } from '$lib/db'
import type { Result } from '$lib/types/result'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ params }) => {
	const { object } = await db.objects
		.findOne({
			type: 'posts',
			slug: params.slug
		})
		.props(props)
		.depth(1)

	return {
		result: object as Result
	}
}
