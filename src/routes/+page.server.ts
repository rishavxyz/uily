import { NOTION_SECRET, DATABASE_ID } from '$env/static/private'
import { Client } from '@notionhq/client'
import type { Result } from '$lib/types/db'

export const load = async () => {
	const client = new Client({
		auth: NOTION_SECRET
	})
	const { results } = await client.databases.query({
		database_id: DATABASE_ID,
		sorts: [{ direction: 'ascending', timestamp: 'created_time' }]
	})

	return {
		results: results as Result[]
	}
}
