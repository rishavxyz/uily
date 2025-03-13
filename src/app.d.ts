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
			NOTION_SECRET: string;
			DATABASE_ID: string;
			NEXT_PUBLIC_IK_PUBLIC_KEY: string;
			NEXT_PUBLIC_IK_URL_ENDPOINT: string;
			IK_PRIVATE_KEY: string;
		}
	}
}

export {};
