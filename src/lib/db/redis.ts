import { REDIS_HOST, REDIS_PASSWORD, REDIS_PORT, REDIS_USERNAME } from '$env/static/private'
import { createClient } from 'redis'

export const client = async () =>
	await createClient({
		username: REDIS_USERNAME,
		password: REDIS_PASSWORD,
		socket: {
			host: REDIS_HOST,
			port: +REDIS_PORT
		}
	}).connect()
