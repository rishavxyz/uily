import type { SystemTheme } from '$lib/types/theme'
import type { Handle } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
	const cookies = event.cookies
	const theme = (cookies.get('theme') as SystemTheme) ?? 'light'
	const htmlThemeAttr = `data-theme`

	event.locals.theme = theme

	const response = await resolve(event, {
		transformPageChunk: ({ html }) => html.replace(htmlThemeAttr, htmlThemeAttr + '=' + theme),
		preload: ({ type }) => type == 'font'
	})
	return response
}
