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
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Contenido')
          .items([
            S.listItem().title('⚙️ Configuración del sitio').child(S.document().schemaType('siteSettings').documentId('siteSettings')),
            S.listItem().title('🎬 Hero').child(S.document().schemaType('hero').documentId('hero')),
            S.listItem().title('🏠 Homepage').child(S.document().schemaType('homepage').documentId('homepage')),
            S.divider(),
            S.documentTypeListItem('event').title('🎭 Eventos'),
            S.documentTypeListItem('eventCategory').title('🏷️ Categorías de Eventos'),
            S.divider(),
            S.documentTypeListItem('service').title('🔧 Servicios'),
            S.documentTypeListItem('equipmentCategory').title('📦 Categorías de Equipamiento'),
            S.documentTypeListItem('equipmentItem').title('🔩 Ítems de Equipamiento'),
            S.divider(),
            S.documentTypeListItem('client').title('🏢 Clientes'),
            S.documentTypeListItem('brand').title('🎯 Marcas'),
            S.divider(),
            S.documentTypeListItem('contactCategory').title('📬 Categorías de Contacto'),
            S.documentTypeListItem('lead').title('📥 Consultas recibidas'),
            S.divider(),
            S.listItem().title('🔍 SEO Defaults').child(S.document().schemaType('seoDefaults').documentId('seoDefaults')),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  schema: { types: schemaTypes },
});
