import db, { objectKey } from '$lib/server/db'
import type { SystemTheme } from '$lib/types/theme.js'
import type { Result } from '$lib/types/result'

const props = `{
	slug
	title
	created_at
	thumbnail
	metadata {
		categories {
			slug
			title
		}
		dominant_color
	}
}`

export const actions = {
	'set-theme'({ cookies, locals, url }) {
		let theme = url.searchParams.get('theme') as SystemTheme | null
		theme = theme ?? 'light'
		cookies.set('theme', theme, { path: '/' })
		locals.theme = theme
	}
}

export const load = async () => {
	const { objects } = await db.objects
		.find({
			type: objectKey
		})
		.props(props)
		.depth(1)

	return {
		results: objects as Result[]
	}
}
