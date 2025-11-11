# 📱 Sistema de SEO y Open Graph para Facebook

Este proyecto ahora incluye un sistema completo de SEO con **Open Graph meta tags** para que tus publicaciones se vean profesionales en Facebook, Twitter y otras redes sociales.

## 🎯 ¿Qué hace este sistema?

Cuando compartes un link de tu sitio en Facebook, automáticamente aparecerá con:

- ✅ Imagen destacada grande
- ✅ Título del artículo
- ✅ Descripción
- ✅ URL del sitio
- ✅ Información de autor y categoría

**Igual que en la publicación de "Promociones Aéreas" que viste.**

## 📁 Archivos Creados

### 1. `/lib/seo-config.ts`

Configuración central de SEO. Define los meta tags por defecto y la función para generar metadata dinámica.

**Variables importantes:**

```typescript
const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://viajerosmasayores.com';
```

⚠️ **IMPORTANTE:** Debes agregar esta variable en tu `.env.local`:

```bash
NEXT_PUBLIC_SITE_URL=https://tu-dominio.com
```

### 2. `/lib/server-data.ts`

Funciones para obtener datos desde Supabase en el servidor (para generar metadata).

### 3. Páginas actualizadas:

- `/app/blog/[slug]/page.tsx` - Genera metadata dinámica para artículos de blog
- `/app/news/[slug]/page.tsx` - Genera metadata dinámica para noticias

## 🚀 Cómo Funciona

### Para páginas existentes (Blog y Noticias)

Ya está configurado. Cada artículo automáticamente genera sus propios meta tags con:

- Título del artículo
- Descripción (summary)
- Imagen del artículo
- Fecha de publicación
- Autor
- Categoría

### Para agregar SEO a una nueva página

#### Opción 1: Metadata estática

```typescript
import type { Metadata } from 'next';
import { generateSEOMetadata } from '@/lib/seo-config';

export const metadata: Metadata = generateSEOMetadata({
  title: 'Mi Página',
  description: 'Descripción de mi página',
  image: '/images/mi-imagen.jpg',
  url: '/mi-pagina',
  type: 'website',
});

export default function MiPagina() {
  return <div>Contenido</div>;
}
```

#### Opción 2: Metadata dinámica (recomendado para contenido dinámico)

```typescript
import type { Metadata } from 'next';
import { generateSEOMetadata } from '@/lib/seo-config';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  // Obtén los datos desde tu base de datos
  const data = await getDataFromDB(params.slug);

  return generateSEOMetadata({
    title: data.title,
    description: data.description,
    image: data.imageUrl,
    url: `/ruta/${params.slug}`,
    type: 'article',
    publishedTime: data.createdAt,
    author: data.author.name,
    section: data.category,
    tags: [data.category, 'otros', 'tags'],
  });
}

export default function MiPagina() {
  return <div>Contenido</div>;
}
```

## 🧪 Cómo Probar

### 1. En desarrollo local:

1. Publica tu sitio en producción (Vercel, Netlify, etc.)
2. Crea un artículo de prueba
3. Ve a [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
4. Pega el URL de tu artículo
5. Haz clic en "Debug" o "Scrape Again"
6. Verás cómo se ve tu publicación

### 2. Verificar que los meta tags están en el HTML:

```bash
# Ver el HTML generado
curl https://tu-sitio.com/blog/tu-articulo | grep "og:"
```

Deberías ver algo como:

```html
<meta property="og:title" content="Tu Título | Viajeros Mayores" />
<meta property="og:description" content="Tu descripción..." />
<meta property="og:image" content="https://tu-sitio.com/imagen.jpg" />
<meta property="og:url" content="https://tu-sitio.com/blog/tu-articulo" />
<meta property="og:type" content="article" />
```

## 📸 Requisitos de Imágenes para Facebook

Para que las imágenes se vean perfectas en Facebook:

- **Tamaño recomendado:** 1200x630 pixels
- **Ratio:** 1.91:1
- **Formato:** JPG o PNG
- **Peso máximo:** 8 MB
- **Mínimo:** 600x315 pixels

## 🔄 Actualizar Open Graph después de editar

Facebook cachea las imágenes y metadata. Después de hacer cambios:

1. Ve a [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
2. Pega tu URL
3. Haz clic en "Scrape Again"
4. Facebook actualizará el caché

## 🎨 Personalización

### Cambiar el sitio base o nombre

Edita `/lib/seo-config.ts`:

```typescript
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tu-dominio.com';
const siteName = 'Tu Nombre de Sitio';
const defaultImage = `${baseUrl}/images/tu-logo.png`;
```

### Agregar más redes sociales

El sistema ya incluye Twitter Cards. Para agregar más:

```typescript
export const generateSEOMetadata = (config: SEOConfig): Metadata => {
  return {
    // ... código existente ...
    other: {
      'pinterest:description': config.description,
      'pinterest:media': fullImageUrl,
    },
  };
};
```

## ✅ Checklist

- [ ] Agregar `NEXT_PUBLIC_SITE_URL` en `.env.local`
- [ ] Asegurarte que todas las imágenes de artículos tengan buena resolución (1200x630)
- [ ] Probar un artículo en Facebook Sharing Debugger
- [ ] Verificar que los meta tags aparezcan en el HTML
- [ ] Compartir un artículo en Facebook para ver el resultado final

## 🤝 Cómo Publicar en Facebook

1. Crea tu artículo en el blog/noticias
2. Copia el URL completo del artículo
3. Ve a tu página de Facebook
4. Pega el link en el campo "Crear publicación"
5. Facebook automáticamente mostrará la vista previa con imagen, título y descripción
6. Puedes agregar texto adicional arriba del link preview
7. ¡Publica!

## 🐛 Troubleshooting

### La imagen no aparece en Facebook

- Verifica que la URL de la imagen sea absoluta (https://...)
- Asegúrate que la imagen sea accesible públicamente
- Usa Facebook Debugger para ver qué está detectando

### Los cambios no se reflejan

- Limpia el caché de Facebook con "Scrape Again"
- Verifica que el HTML generado contenga los meta tags (view source)
- Asegúrate de estar en producción (no localhost)

### El título se ve cortado

- Facebook muestra hasta 88 caracteres en desktop
- En móvil, hasta 82 caracteres
- Mantén los títulos concisos y descriptivos

## 📚 Recursos

- [Open Graph Protocol](https://ogp.me/)
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [Next.js Metadata](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
