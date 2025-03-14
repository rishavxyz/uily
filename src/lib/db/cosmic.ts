import { COSMIC_BUCKET_SLUG, COSMIC_READ_KEY } from '$env/static/private'
import { createBucketClient } from '@cosmicjs/sdk'

export const cosmic = createBucketClient({
	bucketSlug: COSMIC_BUCKET_SLUG,
	readKey: COSMIC_READ_KEY
})

export const props = `{
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
}`
