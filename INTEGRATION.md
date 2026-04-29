# Integration Guide

How to integrate micro-tools into your website for maximum trust and SEO benefit.

## 1. Footer Badge

Add this badge to your tool's footer to signal open source transparency:

### HTML (simple)
```html
<a href="https://github.com/FlorianKip/micro-tools/tree/main/geg-heizungstausch" 
   target="_blank" 
   rel="noopener"
   class="oss-badge">
  Made with ❤️ and open source
</a>
```

### With Shield.io Badge
```html
<a href="https://github.com/FlorianKip/micro-tools/tree/main/geg-heizungstausch">
  <img src="https://img.shields.io/badge/Logic-Open%20Source-brightgreen" alt="Open Source Logic">
</a>
```

### Astro Component
```astro
---
interface Props {
  tool: string; // e.g., "geg-heizungstausch"
}
const { tool } = Astro.props;
const repoUrl = `https://github.com/FlorianKip/micro-tools/tree/main/${tool}`;
---
<a href={repoUrl} target="_blank" rel="noopener" class="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1">
  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
  Made with ❤️ and open source
</a>
```

## 2. "How is this calculated?" Link

Add next to your result for maximum trust impact:

```html
<div class="result-actions">
  <span class="result-value">Austauschpflicht bis 30.06.2026</span>
  <a href="https://github.com/FlorianKip/micro-tools/tree/main/geg-heizungstausch" 
     class="text-xs text-blue-600 hover:underline"
     target="_blank" 
     rel="noopener">
    Wie wird das berechnet?
  </a>
</div>
```

## 3. SoftwareSourceCode Schema (JSON-LD)

Add to your page's `<head>` for rich search results:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Heizungstausch-Pflicht-Rechner",
  "url": "https://heizungstausch-pflicht-rechner.de",
  "description": "Prüfe ob deine Heizung nach §72 GEG ausgetauscht werden muss",
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "EUR"
  },
  "sourceOrganization": {
    "@type": "Person",
    "name": "Florian Kiptschuk",
    "url": "https://github.com/FlorianKip"
  },
  "codeRepository": "https://github.com/FlorianKip/micro-tools/tree/main/geg-heizungstausch",
  "programmingLanguage": "TypeScript",
  "license": "https://opensource.org/licenses/MIT"
}
</script>
```

### Key fields for SEO:
- `codeRepository`: Links to your open source logic
- `license`: Shows it is MIT licensed
- `programmingLanguage`: Signals technical credibility

## 4. Combining with existing schemas

If you already have a `WebApplication` or `SoftwareApplication` schema, just add:

```json
"codeRepository": "https://github.com/FlorianKip/micro-tools/tree/main/{tool-slug}",
"isAccessibleForFree": true,
"license": "https://opensource.org/licenses/MIT"
```
