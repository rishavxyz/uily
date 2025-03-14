// export const prerender = false

import db, { objectKey, props } from '$lib/db'
import { client } from '$lib/db/redis'
import type { Result } from '$lib/types/result'

const redis = await client()

export const load = async ({ setHeaders }) => {
	redis.on('error', (err) => console.error(`Redis error:`, err))

	const cache = await redis.get(objectKey)

	if (!cache) {
		console.log(`cache miss`)

		const { objects } = await db.objects
			.find({
				type: objectKey
			})
			.props(props)
			.depth(1)
		redis.set(objectKey, JSON.stringify(objects))

		return {
			results: objects as Result[]
		}
	}
	console.log(`cache hit`)

	const ttl = await redis.ttl(objectKey)
	setHeaders({ 'cache-control': `max-age=${ttl}` })

	return {
		results: JSON.parse(cache) as Result[]
	}
}
