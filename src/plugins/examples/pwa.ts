import { Plugin } from '../types';
import { TemplateConfig } from '../../types';

export const pwaPlugin: Plugin = {
  name: 'pwa',
  version: '1.0.0',
  description: 'Adds Progressive Web App support',
  async apply(template: TemplateConfig): Promise<TemplateConfig> {
    const newTemplate = { ...template };

    // Add PWA dependencies
    if (template.type === 'frontend') {
      newTemplate.dependencies = {
        ...newTemplate.dependencies,
        'workbox-core': '^7.0.0',
        'workbox-precaching': '^7.0.0',
        'workbox-routing': '^7.0.0',
        'workbox-strategies': '^7.0.0'
      };

      // Add service worker
      newTemplate.files.push({
        path: 'public/sw.js',
        content: `import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';

precacheAndRoute(self.__WB_MANIFEST);

registerRoute(
  ({request}) => request.destination === 'image',
  new StaleWhileRevalidate({
    cacheName: 'images'
  })
);`
      });

      // Add manifest.json
      newTemplate.files.push({
        path: 'public/manifest.json',
        content: `{
  "short_name": "App",
  "name": "My Application",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    },
    {
      "src": "logo192.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "logo512.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#ffffff"
}`
      });
    }

    return newTemplate;
  }
};