// export const prerender = false

import db, { props } from '$lib/db'
import { client } from '$lib/db/redis'
import type { Result } from '$lib/types/result'

const key = 'thumbnails'
const redis = await client()

export const load = async ({ setHeaders }) => {
	redis.on('error', (err) => console.error(`Redis error:`, err))

	const cache = await redis.get(key)

	if (!cache) {
		console.log(`cache miss`)

		const { objects } = await db.objects
			.find({
				type: key
			})
			.props(props)
			.depth(1)
		redis.set(key, JSON.stringify(objects))

		return {
			results: objects as Result[]
		}
	}
	console.log(`cache hit`)

	const ttl = await redis.ttl(key)
	setHeaders({ 'cache-control': `max-age=${ttl}` })

	return {
		results: JSON.parse(cache) as Result[]
	}
}
