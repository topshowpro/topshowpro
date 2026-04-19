import imageUrlBuilder from '@sanity/image-url';
import { projectId, dataset } from '../env';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const builder = imageUrlBuilder({ projectId: projectId || 'placeholder', dataset });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlForImage(source: any) {
  return builder.image(source).auto('format').quality(80);
}
