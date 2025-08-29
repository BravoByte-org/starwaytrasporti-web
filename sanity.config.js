import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemaTypes/index.js';
import { previewPlugin } from './sanity/plugins/previewPlugin.js';

export default defineConfig([
	// Production dataset configuration
	{
		name: 'production',
		title: 'StarwayTrasporti (Production)',
		subtitle: 'Live website content',
		basePath: '/production',

		projectId: '2z040zj1',
		dataset: 'production',

		plugins: [structureTool(), visionTool(), previewPlugin],

		schema: {
			types: schemaTypes
		}
	},
	// Preview dataset configuration
	{
		name: 'preview',
		title: 'StarwayTrasporti (Preview)',
		subtitle: 'Draft and preview content',
		basePath: '/preview',

		projectId: '2z040zj1',
		dataset: 'preview',

		plugins: [structureTool(), visionTool(), previewPlugin],

		schema: {
			types: schemaTypes
		}
	}
]);
