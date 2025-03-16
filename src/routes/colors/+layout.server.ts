import db from '$lib/server/db'

export async function load() {
	const { objects } = (await db.objects.find({ type: 'colors' }).props(['id', 'slug'])) as {
		objects: { id: string; slug: string }[]
	}
	return {
		allAvailableColors: objects
	}
}
