// export const prerender = false

import { COSMIC_BUCKET_SLUG, COSMIC_READ_KEY } from '$env/static/private'
import type { Result } from '$lib/types/result'
import { createBucketClient } from '@cosmicjs/sdk'
import type { PageServerLoad } from './$types'

const cosmic = createBucketClient({
	bucketSlug: COSMIC_BUCKET_SLUG,
	readKey: COSMIC_READ_KEY
})

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
	const { object } = await cosmic.objects
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
