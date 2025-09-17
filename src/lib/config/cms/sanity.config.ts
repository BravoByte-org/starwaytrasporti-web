import { PUBLIC_SANITY_API_DATASET, PUBLIC_SANITY_API_PROJECT_ID } from '$env/static/public';

/*--------------------------------- PLUGINS ---------------------------------*/
import { visionTool } from '@sanity/vision';
import { structureTool } from 'sanity/structure';
/*---------------------------------------------------------------------------*/

/*--------------------------------- SCHEMAS ---------------------------------*/
import { schemaTypes } from './schemaTypes';
/*---------------------------------------------------------------------------*/

/*--------------------------------- CONFIG ---------------------------------*/
export default {
	basePath: '/studio',
	projectId: PUBLIC_SANITY_API_PROJECT_ID,
	dataset: PUBLIC_SANITY_API_DATASET,
	plugins: [visionTool(), structureTool()],
	schema: { types: [...schemaTypes] },
	title: 'StarwayTrasporti - CMS'
};