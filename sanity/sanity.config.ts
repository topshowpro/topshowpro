import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';
import { apiVersion, dataset, projectId } from './env';

export default defineConfig({
  name: 'top-show-pro',
  title: 'Top Show Pro CMS',
  projectId: projectId || 'placeholder',
  dataset,
  plugins: [structureTool(), visionTool({ defaultApiVersion: apiVersion })],
  schema: { types: schemaTypes },
});
