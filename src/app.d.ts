// See https://svelte.dev/docs/kit/types#app.d.ts

import type { SystemTheme } from '$lib/types/theme'

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			theme: SystemTheme
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
	namespace NodeJS {
		interface ProcessEnv {
			NOTION_SECRET: string
			DATABASE_ID: string

			IK_PUBLIC_KEY: string
			IK_URL_ENDPOINT: string
			IK_PRIVATE_KEY: string

			COSMIC_BUCKET_SLUG: string
			COSMIC_READ_KEY: string

			REDIS_HOST: string
			REDIS_PORT: string
			REDIS_USERNAME: string
			REDIS_PASSWORD: string
		}
	}
}

export {}
