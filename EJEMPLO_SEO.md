# 📖 Ejemplo Práctico: Agregar SEO a una Nueva Página

## Escenario: Crear una página de "Destinos" con SEO

Supongamos que quieres crear una página `/destinos/[slug]` donde cada destino tenga su propia metadata para Facebook.

## Paso 1: Crear la estructura de archivos

```
app/
  destinos/
    [slug]/
      _components/
        DestinoClient.tsx  ← Componente client
      page.tsx            ← Página con metadata (server)
```

## Paso 2: Crear el componente client

```typescript
// app/destinos/[slug]/_components/DestinoClient.tsx
'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export const DestinoClient = () => {
  const params = useParams();
  const slug = params.slug as string;
  const [destino, setDestino] = useState(null);

  // Tu lógica para obtener datos...

  return (
    <div>
      <h1>{destino?.nombre}</h1>
      <p>{destino?.descripcion}</p>
    </div>
  );
};
```

## Paso 3: Crear función para obtener datos (server-side)

Agrega esta función en `/lib/server-data.ts`:

```typescript
export const getDestinoBySlug = async (slug: string) => {
  try {
    const { data, error } = await supabase
      .from('destinos')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error || !data) return null;

    return {
      id: data.id,
      nombre: data.nombre,
      descripcion: data.descripcion,
      imagen: data.imagen_url,
      pais: data.pais,
      createdAt: data.created_at,
    };
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};
```

## Paso 4: Crear la página con metadata dinámica

```typescript
// app/destinos/[slug]/page.tsx
import type { Metadata } from 'next';
import { getDestinoBySlug } from '@/lib/server-data';
import { generateSEOMetadata } from '@/lib/seo-config';
import { DestinoClient } from './_components/DestinoClient';

interface DestinoPageProps {
  params: {
    slug: string;
  };
}

// 🎯 Esta función genera la metadata para Facebook
export async function generateMetadata({
  params,
}: DestinoPageProps): Promise<Metadata> {
  const destino = await getDestinoBySlug(params.slug);

  if (!destino) {
    return {
      title: 'Destino no encontrado | Viajeros Mayores',
      description: 'El destino que buscas no existe.',
    };
  }

  return generateSEOMetadata({
    title: `${destino.nombre} - Destino Accesible`,
    description: destino.descripcion,
    image: destino.imagen,
    url: `/destinos/${params.slug}`,
    type: 'article',
    publishedTime: destino.createdAt,
    section: destino.pais,
    tags: ['destinos', 'viajes', destino.pais, 'accesible'],
  });
}

export default function DestinoPage() {
  return <DestinoClient />;
}
```

## Paso 5: Probar en Facebook

1. Crea un destino en tu base de datos con todos los campos necesarios
2. Despliega tu sitio a producción (Vercel/Netlify)
3. Ve a [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
4. Pega: `https://tu-sitio.com/destinos/paris`
5. Haz clic en "Debug"

## 📱 Resultado en Facebook

Tu publicación se verá así:

```
┌─────────────────────────────────────────┐
│                                         │
│  [IMAGEN GRANDE DEL DESTINO]           │
│                                         │
├─────────────────────────────────────────┤
│ TU-SITIO.COM                           │
│                                         │
│ París - Destino Accesible | Viajeros   │
│ Mayores                                 │
│                                         │
│ Descubre París con accesibilidad...    │
└─────────────────────────────────────────┘

[Me gusta] [Comentar] [Compartir]
```

## 🎨 Personalización Avanzada

### Agregar autor específico
```typescript
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const destino = await getDestinoBySlug(params.slug);

  return generateSEOMetadata({
    title: destino.nombre,
    description: destino.descripcion,
    image: destino.imagen,
    url: `/destinos/${params.slug}`,
    type: 'article',
    author: 'Juan Pérez', // ← Autor específico
    publishedTime: destino.createdAt,
    section: 'Destinos',
    tags: ['viajes', 'accesibilidad'],
  });
}
```

### Múltiples imágenes
```typescript
return {
  title: destino.nombre,
  description: destino.descripcion,
  openGraph: {
    title: destino.nombre,
    description: destino.descripcion,
    images: [
      {
        url: destino.imagenPrincipal,
        width: 1200,
        height: 630,
        alt: destino.nombre,
      },
      {
        url: destino.imagenSecundaria,
        width: 1200,
        height: 630,
        alt: `${destino.nombre} - Vista 2`,
      },
    ],
  },
};
```

## 💡 Tips

### 1. Títulos Efectivos
```typescript
// ❌ Malo
title: 'París'

// ✅ Bueno
title: 'París - Guía Completa de Viaje Accesible | Viajeros Mayores'

// ✅ Muy bueno (con emoji)
title: '✈️ París - Guía de Viaje para Adultos Mayores | Viajeros Mayores'
```

### 2. Descripciones Atractivas
```typescript
// ❌ Malo
description: 'París es una ciudad en Francia.'

// ✅ Bueno
description: 'Descubre París con nuestra guía completa de accesibilidad. Hoteles adaptados, atracciones accesibles y consejos para viajeros mayores.'
```

### 3. Imágenes Optimizadas
- Usa imágenes de alta calidad (1200x630px)
- Asegúrate que el texto en la imagen sea legible
- Evita imágenes con mucho texto (Facebook las penaliza)
- Usa colores vibrantes y contrastantes

## 🔄 Flujo Completo

```
1. Usuario crea contenido → Base de datos
                                ↓
2. Next.js genera página → generateMetadata()
                                ↓
3. Meta tags en HTML ← Open Graph tags
                                ↓
4. Usuario comparte link → Facebook scraper
                                ↓
5. Facebook muestra vista previa → ¡Publicación profesional!
```

## 📊 Campos Open Graph Generados

Cada vez que usas `generateSEOMetadata()`, se crean estos meta tags:

```html
<!-- Básicos -->
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
<meta property="og:url" content="..." />
<meta property="og:site_name" content="Viajeros Mayores" />
<meta property="og:locale" content="es_AR" />

<!-- Imagen -->
<meta property="og:image" content="..." />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="..." />

<!-- Tipo de contenido -->
<meta property="og:type" content="article" />

<!-- Para artículos -->
<meta property="article:published_time" content="..." />
<meta property="article:modified_time" content="..." />
<meta property="article:author" content="..." />
<meta property="article:section" content="..." />
<meta property="article:tag" content="..." />

<!-- Twitter Cards -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="..." />
<meta name="twitter:description" content="..." />
<meta name="twitter:image" content="..." />

<!-- Canonical -->
<link rel="canonical" href="..." />
```

## ✅ Checklist por Página

Cuando agregues SEO a una nueva página:

- [ ] Crear función `get[Entity]BySlug()` en `server-data.ts`
- [ ] Implementar `generateMetadata()` en `page.tsx`
- [ ] Usar `generateSEOMetadata()` con todos los campos
- [ ] Verificar que la imagen sea accesible públicamente
- [ ] Probar en Facebook Sharing Debugger
- [ ] Verificar en Twitter Card Validator (si aplica)
- [ ] Hacer un test de compartir real en redes sociales

## 🚀 Siguiente Nivel

### Schema.org / JSON-LD
Para SEO aún más avanzado, puedes agregar JSON-LD:

```typescript
export default function DestinoPage({ params }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    name: 'París',
    description: 'Guía de viaje accesible...',
    image: 'https://...',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DestinoClient />
    </>
  );
}
```

Este JSON-LD ayuda a Google a entender mejor tu contenido y puede aparecer en rich snippets.

