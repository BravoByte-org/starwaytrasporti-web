# Technical Constraints
Follow responseive design - must work on desktop and mobile web

## Tech Stack
- Sveltekit
    - Frontend Framework
	- Deps (already in package.json)
	    - "svelte": "^5.38.0"
		- "svelte-check": "^4.3.1"
	    - "@sveltejs/adapter-vercel": "^5.8.2"
		- "@sveltejs/kit": "^2.27.3"
		- "@sveltejs/vite-plugin-svelte": "^6.1.1"
- Vite
    - App Bundler/Compiler
	- Deps (already in package.json)
	    - "vite": "^7.1.1"
		- "vite-plugin-devtools-json": "^0.2.1"
		- "vitest": "^3.2.4"
		- "vitest-browser-svelte": "^0.1.0"
		- "@vitest/browser": "^3.2.4"
- Storybook
    - CDD (Component Driven Development) & Unit Testing
	- A standalone/isolated component playground to build and test components individually
	- Deps (already in package.json)
		- "@chromatic-com/storybook": "^4.1.0"
		- "storybook": "^9.1.1"
	    - "@storybook/addon-a11y": "^9.1.1"
		- "@storybook/addon-docs": "^9.1.1"
		- "@storybook/addon-svelte-csf": "^5.0.7"
		- "@storybook/addon-vitest": "^9.1.1"
		- "@storybook/sveltekit": "^9.1.1"
- PlayWright
    - JS/TS-based E2E testing library
	- Deps (already in package.json)
	    - "playwright": "^1.54.2"
		- "@playwright/test": "^1.54.2"
- Tailwind
    - CSS Styling Library
	- Deps (already in package.json)
	    - "tailwindcss": "^4.1.11"
		- "@tailwindcss/forms": "^0.5.10"
		- "@tailwindcss/typography": "^0.5.16"
		- "@tailwindcss/vite": "^4.1.11"
- Drizzle
    - Database ORM
	- Useful for authentication
	- Deps (already in package.json)
	    - "drizzle-kit": "^0.30.6"
		- "drizzle-orm": "^0.40.1"
		- "postgres": "^3.4.7"
- Paraglide-js
    - Localization
	- Internationalizes project
	- Deps
	    - "@inlang/paraglide-js": "^2.2.0"

## Architecture
The desired architecture is already structured in the project and follows a modular hierarchy. 

Each component in `.src/lib/components` is self-contained; meaning they have their main `.svelte` file that has the logic (js) and styling (tailwind css) already built-in (additional js/css file optional) and sub-directories, `__STORIES__` for Storybook related files and `__TESTS__` for PlayWright related files for testing. 

The `.src/lib/layouts` directory houses the page template/layout types, such as `article`, `form` and `homepage` templates. 

The `.src/lib/pages` directory only serves as the testing ground for `.src/routes` so that we can utilize Storybook for pages and variations before officially registering them as a route.

## Performance/Scalability
For the MVP, it is not anticipated to have beyond 2000 visitors per month. Only two CMS logins will be needed, for the client (the content editor) and the developer (the compoany building this application). 

The site should be static as data from CMS should be cached and not realtime unless reasonably cheap and efficient to do so via Sanity.io CMS. 

## Design and UX
- Take inspiration from other transport business' websites
    - https://trasportiromagna.com
	    - features a serious professional tone while featuring some animation and media to keep visitors engaged
	    - Buttons and text are large and legible 
		- The top navigation is sticky, so users are able to access the nav on any page as they browse the content
		- Thumbnail animation for grid items is a nice touch as static media transitions into a video (if available), or another image
		- There is a nice balance between media and text content that changes based on the section content (e.g. in one section there are two vertically stacked images on the right, and a short paragraph on the left)