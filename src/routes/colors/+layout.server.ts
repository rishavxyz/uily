import db from '$lib/server/db'
import type { Color } from '$lib/types/result'

export async function load() {
	const { objects } = (await db.objects
		.find({ type: 'colors' })
		.props(['id', 'slug', 'title', 'metadata'])) as {
		objects: Color[]
	}
	return {
		allAvailableColors: objects
	}
}
