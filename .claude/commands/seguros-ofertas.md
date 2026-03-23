---
name: seguros-ofertas
description: Busca y selecciona las 3 mejores ofertas de asistencia al viajero (seguros de viaje) publicadas en promociones-aereas.com.ar, filtrando por la categoría Asistencia. Usá esta skill SIEMPRE que el usuario pida "buscar ofertas de seguros", "actualizar cards de asistencia", "mejores seguros de viaje", "ofertas de asistencia al viajero", "novedades de seguros", o cualquier variante relacionada con mostrar o publicar ofertas de seguros/asistencia en viajerosmayores.com. La skill devuelve los datos listos para renderizar como cards.
---

# Skill: Búsqueda de Ofertas de Asistencia al Viajero

## Objetivo
Extraer las **3 mejores** ofertas de asistencia al viajero publicadas en promociones-aereas.com.ar (sección Asistencia), seleccionarlas con criterio senior 60+, y devolver los datos estructurados listos para cards.

## Fuente
**Blog**: `https://promociones-aereas.com.ar/`
**Categoría**: "Asistencia" — filtro shuffle con IDs de posts en el atributo:
`data-shuffle-filter-latest-posts-ids`

## Paso a paso

### PASO 1 — Descubrir posts recientes de la categoría Asistencia

Ejecutá estas búsquedas para encontrar los posts más recientes:

```
web_search: site:promociones-aereas.com.ar asistencia al viajero 2026
web_search: site:promociones-aereas.com.ar asistencia descuento cuotas 2026
```

De los resultados, recolectá todas las URLs de posts individuales (formato `/YYYY/MM/slug.html`).
Usá también la tabla de "Posts conocidos" al final de esta skill como seed inicial.

### PASO 2 — Obtener los IDs actualizados vía WordPress REST API

**Para obtener los IDs actualizados**, usá la WordPress REST API:
```
web_fetch: https://promociones-aereas.com.ar/wp-json/wp/v2/posts?categories=asistencia&per_page=10&orderby=date&order=desc
```

Si eso no devuelve resultados útiles, buscá el ID de la categoría primero:
```
web_fetch: https://promociones-aereas.com.ar/wp-json/wp/v2/categories?search=asistencia
```

Y luego usalo en:
```
web_fetch: https://promociones-aereas.com.ar/wp-json/wp/v2/posts?categories=ID_ENCONTRADO&per_page=10
```

**Nota**: el ID de categoría "Asistencia al Viajero" es **60284** (verificado mar 2026).

**Fallback**: Si la API no responde (401), hacé `web_fetch` directamente a las URLs de los posts más recientes del PASO 1 o de la tabla de posts conocidos.

### PASO 3 — Fetch de cada post

Con los IDs obtenidos, consultá los primeros 8 posts:
```
web_fetch: https://promociones-aereas.com.ar/wp-json/wp/v2/posts?include=ID1,ID2,ID3,ID4,ID5,ID6,ID7,ID8&_fields=id,title,link,excerpt,date,featured_media_src_url,content
```

**Fallback individual**: Si la API falla, hacé `web_fetch` directamente a las URLs de los posts más recientes encontrados en el PASO 1 o en la tabla de posts conocidos.

### PASO 4 — Extracción de datos por oferta

De cada post extraé:
- `titulo`: título del artículo (limpio, sin emojis excesivos)
- `compania`: nombre de la aseguradora mencionada (Assist Card, Universal Assistance, Assist 365, etc.)
- `descuento`: porcentaje o beneficio principal (ej: "30% OFF", "2x1", "35% OFF + cuotas", "Anual por precio de 1 viaje")
- `cobertura`: monto de cobertura médica si se menciona (ej: "USD 60.000", "USD 1.000.000")
- `cuotas`: info de financiación si aplica (ej: "3 cuotas sin interés")
- `destino`: destino o alcance de la cobertura (ej: "Internacional", "Europa/Schengen", "EE.UU.", "Cualquier destino")
- `highlights`: array de hasta 3 bullets clave del post
- `precio_referencia`: precio en ARS si se menciona en el artículo (con fecha de referencia)
- `url`: URL directa al post del blog
- `imagen_url`: URL de la imagen destacada del post si está disponible, sino `null`
- `fecha_publicacion`: fecha del post (YYYY-MM-DD)
- `etiqueta`: badge si aplica (ej: "DESCUENTO", "2x1", "ANUAL", "SCHENGEN", "EE.UU.")
- `cupon`: código de cupón si está mencionado explícitamente en el post (ej: "PROMOS20OFF")

### PASO 5 — Criterios de selección de las 3 mejores para viajerosmayores.com

Priorizá posts que cumplan (en orden de importancia):

1. **Descuento real y vigente**: tiene % de descuento, cuotas sin interés, 2x1 u otro beneficio concreto
2. **Compañías conocidas**: Assist Card, Universal Assistance, Assist 365 — marcas que la audiencia reconoce
3. **Reciente**: publicado en los últimos 60 días tiene prioridad

Si no hay 3 posts que cumplan los 3 criterios, completá con los más recientes disponibles.

### PASO 6 — Formato de salida

Devolvé **exactamente** este JSON con las **3 ofertas** seleccionadas:

```json
{
  "actualizado": "FECHA_HOY",
  "fuente": "promociones-aereas.com.ar",
  "seguros": [
    {
      "id": 1,
      "titulo": "30% OFF + 3 cuotas sin interés en Asistencia al Viajero",
      "compania": "Assist Card",
      "descuento": "30% OFF",
      "cobertura": "USD 60.000 – USD 3.000.000",
      "cuotas": "3 cuotas sin interés",
      "destino": "Internacional",
      "highlights": [
        "Atención médica 24/7 en español",
        "Cubre enfermedades y accidentes",
        "Repatriación sanitaria incluida"
      ],
      "precio_referencia": "AR$ 145.478 por 15 días a EE.UU. (referencia mar 2026)",
      "cupon": "PROMOS20OFF",
      "url": "https://promociones-aereas.com.ar/2026/03/...",
      "imagen_url": null,
      "fecha_publicacion": "2026-03-01",
      "etiqueta": "30% OFF"
    }
  ]
}
```

### PASO 7 — Nota de curación

Después del JSON, incluí una sección breve:

```
## Por qué estas 3 ofertas para viajerosmayores.com

[Una línea por cada oferta explicando por qué es relevante para el segmento 60+]

## Aviso importante para las cards
Los precios en ARS de los artículos tienen fecha de referencia. Siempre indicar al usuario
que cotice directamente en el enlace para obtener el precio actualizado.
```

### PASO 8 — Actualizar las cards en OfertasClient.tsx

Una vez obtenidas las **3 ofertas**, **editá automáticamente** el archivo `app/ofertas/OfertasClient.tsx` reemplazando el bloque `// Seguros` dentro del array `OFERTAS`.

**IMPORTANTE**: el bloque debe contener exactamente **3 objetos** con ids `'s1'`, `'s2'`, `'s3'`.

**Mapeo de campos JSON → propiedades del objeto Oferta:**

```ts
{
  id: 's1',                          // 's1', 's2', 's3'
  tipo: 'seguro',
  imagen: '<imagen Unsplash temática>',  // usar URL de Unsplash temática
  badge: etiqueta,                   // ej: '30% OFF', '2x1', 'ANUAL'
  badgeBg: '<color Tailwind>',       // rojo=descuento alto, ámbar=anual, azul=cobertura especial
  descuento: <número>,               // 0 si no hay descuento verificado
  titulo: titulo,
  ubicacion: destino,
  duracion: `${compania} · ${cuotas || 'Pago único'}`,
  descripcion: '<frase corta y atractiva para el senior>',
  features: highlights,              // array de 3 items
  precioOriginal: <número>,          // igual a precio si no hay descuento
  precio: <número>,                  // precio como número sin símbolo
  moneda: 'USD',
  url: url,                          // URL real al post
}
```

**Reglas de imagen Unsplash a usar según tipo de cobertura:**
- Internacional / General: `https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=500&fit=crop&auto=format`
- Europa / Schengen: `https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&h=500&fit=crop&auto=format`
- EE.UU. / Norteamérica: `https://images.unsplash.com/photo-1485738422979-f5c462d49f04?w=800&h=500&fit=crop&auto=format`
- Caribe / Playas: `https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=500&fit=crop&auto=format`
- Plan Anual / Multi-viaje: `https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=800&h=500&fit=crop&auto=format`
- Equipaje / Protección: `https://images.unsplash.com/photo-1553531384-cc64ac80f931?w=800&h=500&fit=crop&auto=format`

**Color del badge según tipo:**
- Descuento porcentual alto → `bg-red-500`
- Cuotas sin interés → `bg-green-600`
- Plan anual / multi-viaje → `bg-amber-600`
- Cobertura especial (Schengen, EE.UU.) → `bg-blue-600`
- Guía informativa → `bg-teal-600`

Después de editar el archivo, confirmá con un mensaje breve indicando cuántas cards se actualizaron y desde qué fuente.

## Datos del sitio (referencia actualizada — mar 2026)

Posts recientes conocidos de la categoría Asistencia en el sitio:

| Fecha | Título | URL |
|---|---|---|
| Mar 2026 | Hasta 60% OFF + Cuotas Sin Interés | `/2026/03/asistencia-al-viajero-en-cuotas-sin-interes-av-p-4.html` |
| Mar 2026 | 50% OFF + 20% Extra + cupón PROMOS20OFF | `/2026/03/asistencia-al-viajero-cuotas-sin-interes-2-av-p-4.html` |
| Mar 2026 | Últimos días 45% OFF + 20% Extra + cuotas | `/2026/03/extra-en-asistencias-al-viajero-av-p.html` |
| Mar 2026 | Plan Anual — ahorrá más de AR$ 40.000 en 3 cuotas | `/2026/03/ahorra-en-tu-asistencia-al-viajero-por-un-ano-y-pagala-en-cuotas-av-p.html` |
| Mar 2026 | Equipaje + doble descuento | `/2026/03/sabias-que-con-tu-asistencia-al-viajero-tambien-podes-proteger-tu-equipaje-av-p.html` |
| Mar 2026 | 30% OFF + 3 cuotas sin interés - Assist Card | `/2026/03/te-contamos-como-contratar-tu-asistencia-al-viajero-en-cuotas-y-con-un-cupon-de-descuento-av-p.html` |
| Mar 2026 | Doble descuento 45% OFF + 20% Extra + 3 cuotas | `/2026/03/doble-descuento-en-asistencia-al-viajero-cuotas-sin-interes-av-p-3.html` |
| Feb 2026 | Promo anual 50% OFF + 20% Extra + cuotas | `/2026/02/promo-en-asistencia-al-viajero-anual-cuotas-sin-interes-av-p.html` |

Usá esta tabla como seed para hacer fetch de los posts si la API no responde.
URLs completas: anteponé `https://promociones-aereas.com.ar` a cada path.

ID de categoría "Asistencia al Viajero": **60284** (slug: `asistencia-al-viajero`)

## Manejo de errores

- Si la API WordPress devuelve 401 → usá el fallback de fetch directo a las URLs de la tabla
- Si un post no tiene precio concreto → igualmente incluilo si tiene descuento o beneficio claro, y poné `precio_referencia: "Cotizar en el enlace"`
- Si no hay 3 ofertas con descuento activo → completá con los posts más útiles e informativos para el segmento senior, marcándolos con `etiqueta: "GUÍA"`
- Precios en ARS cambian frecuentemente → siempre incluí la fecha de referencia del artículo

## Perfil del usuario final

Las cards son para **viajerosmayores.com**, dirigido a viajeros hispanohablantes de **60+**. Priorizá:
- Coberturas altas (USD 150.000+) para destinos caros como EE.UU. o Europa
- Mención de preexistencias cuando aparezca
- Cuotas sin interés (muy valorado por audiencia argentina)
- Compañías conocidas y con atención en español
- NO incluyas ofertas que solo sirvan para menores de 30 o estudiantes/mochileros
