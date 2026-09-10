import type {MetadataRoute} from 'next';

const routes = ['','/ritual','/trends','/chat','/my-numbers','/statistics','/community'];

export default function sitemap(): MetadataRoute.Sitemap {
 const base = 'https://lekdee.kan.bio';
 return routes.map(path=>({url:`${base}${path}`,lastModified:new Date(),changeFrequency:path==='/trends'||path==='/statistics'?'daily':'weekly',priority:path===''?1:0.7}));
}
