// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
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
		}
	}
}

export {}
