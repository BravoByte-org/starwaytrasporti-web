// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		interface GlobalData {
			title: string;
			description: string;
		}
		interface HomepageData {
			pages: {
				id: number;
				slug: string;
				status: string;
				page_name: string;
			}[];
		}
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
