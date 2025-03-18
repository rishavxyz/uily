import db, { objectKey } from '$lib/server/db'
import type { Result } from '$lib/types/result.js'

const props = `{
	slug
	title
	created_at
	thumbnail
	metadata {
		dominant_color
		colors {
			title
			slug
			metadata
		}
	}
}`

const query = (id: string[]) => ({
	type: objectKey,
	$and: [
		{
			'metadata.colors': {
				$in: id
			}
		}
	]
})

export async function load({ params, parent }) {
	const colors = params.slug.split('-')
	const ids: string[] = []
	const { allAvailableColors } = await parent()

	if (colors.length == 1) {
		for (const { slug, id } of allAvailableColors) {
			if (slug == colors[0]) {
				ids.push(id)
			}
		}
	} else {
		// TODO: implementation needed
	}

	if (ids.length == 0) {
		return {
			slug: params.slug,
			colors: [],
			results: [] as Result[]
		}
	}

	try {
		const result = await db.objects.find(query(ids)).props(props).depth(1)

		return {
			slug: params.slug,
			colors,
			results: result.objects || ([] as Result[])
		}
	} catch (e) {
		console.log(`error`, e)
	}
}
