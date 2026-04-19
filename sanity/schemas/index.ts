import siteSettings from './singletons/siteSettings';
import hero from './singletons/hero';
import homepage from './singletons/homepage';
import seoDefaults from './singletons/seoDefaults';
import event from './documents/event';
import eventCategory from './documents/eventCategory';
import service from './documents/service';
import equipmentCategory from './documents/equipmentCategory';
import equipmentItem from './documents/equipmentItem';
import brand from './documents/brand';
import client from './documents/client';
import contactCategory from './documents/contactCategory';
import lead from './documents/lead';
import seoFields from './objects/seoFields';
import ctaBlock from './objects/ctaBlock';
import mediaPicker from './objects/mediaPicker';

export const schemaTypes = [
  // singletons
  siteSettings, hero, homepage, seoDefaults,
  // documents
  event, eventCategory, service, equipmentCategory, equipmentItem, brand, client, contactCategory, lead,
  // objects
  seoFields, ctaBlock, mediaPicker,
];
