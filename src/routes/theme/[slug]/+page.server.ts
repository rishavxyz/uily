// export const prerender = false

import db, { objectKey } from '$lib/server/db'
import type { Result } from '$lib/types/result'

const props = `{
	title
	created_at
	metadata {
		slug
		author {
			slug
			title
		}
		categories {
			slug
			title
		}
		screenshots {
			screenshot {
				imgix_url
			}
		}
		dominant_color
		colors
		steps_to_recreate
		notes
		likes_count
	}
}`

export async function load({ params, locals }) {
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
