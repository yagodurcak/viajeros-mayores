---
name: hoteles-ofertas
description: Busca y selecciona las 4 mejores ofertas de hoteles all inclusive publicadas en promociones-aereas.com.ar (sección Hoteles). Usá esta skill SIEMPRE que el usuario pida "buscar ofertas de hoteles", "actualizar cards de hoteles", "mejores hoteles all inclusive", "ofertas de hoteles", "novedades de hoteles", o cualquier variante relacionada con mostrar o publicar ofertas de hoteles en viajerosmayores.com. La skill devuelve los datos listos para renderizar como cards.
---

# Skill: Búsqueda de Ofertas de Hoteles All Inclusive

## Objetivo
Extraer las **4 mejores** ofertas de hoteles all inclusive publicadas en promociones-aereas.com.ar (sección Hoteles), seleccionarlas con criterio senior 60+, y devolver los datos estructurados listos para cards.

## Fuente
**Blog**: `https://promociones-aereas.com.ar/`
**Categoría principal**: Hoteles — múltiples subcategorías por destino.

## Paso a paso

### PASO 1 — Descubrir posts recientes de la categoría Hoteles

Ejecutá estas búsquedas para encontrar los posts más recientes:

```
web_search: site:promociones-aereas.com.ar hotel all inclusive 2026
web_search: site:promociones-aereas.com.ar hoteles descuento cuotas 2026
```

De los resultados, recolectá todas las URLs de posts individuales (formato `/YYYY/MM/slug.html`).
Usá también la tabla de "Posts conocidos" al final de esta skill como seed inicial.

### PASO 2 — Fetch de cada post

Hacé `web_fetch` directamente a las URLs de los posts más relevantes (la API WP requiere auth).

**Fallback**: Si la página no muestra contenido útil, usá los datos del resumen de búsqueda (precio desde, descuento, hotel, destino) que Google ya extrae.

### PASO 3 — Extracción de datos por oferta

De cada post extraé:
- `titulo`: título del artículo (limpio, sin emojis excesivos)
- `hotel`: nombre del hotel o resort si se menciona (ej: "Riu Palace Aruba", "Impressive Punta Cana")
- `destino`: destino exacto (ej: "Punta Cana, Rep. Dominicana", "Aruba", "Maragogi, Brasil")
- `descuento`: porcentaje o beneficio principal (ej: "50% OFF", "Desde USD 160", "Tarifa flexible")
- `cuotas`: info de financiación si aplica (ej: "3 cuotas sin interés", "hasta 3 cuotas antes del viaje")
- `precio_desde`: precio de referencia en USD si se menciona
- `estrellas`: categoría del hotel (ej: "5 estrellas")
- `highlights`: array de hasta 3 bullets clave del post
- `url`: URL directa al post del blog
- `fecha_publicacion`: fecha del post (YYYY-MM-DD)
- `etiqueta`: badge (ej: "50% OFF", "DESDE USD 160", "3 CUOTAS", "ALL INCLUSIVE", "TARIFA FLEX")
- `cupon`: código de cupón si está mencionado explícitamente

### PASO 4 — Criterios de selección de las 4 mejores para viajerosmayores.com

Priorizá posts que cumplan (en orden de importancia):

1. **All Inclusive confirmado**: hotel con todas las comidas incluidas — ideal para 60+
2. **Descuento real o precio competitivo**: % de descuento, cuotas sin interés, o tarifa desde USD verificado
3. **Destinos accesibles para argentinos**: Caribe (Punta Cana, Aruba, Cancún), Brasil (Maragogi, Praia do Forte, Florianópolis)
4. **Reciente**: publicado en los últimos 60 días tiene prioridad
5. **Categoría 5 estrellas**: preferida sobre 4 estrellas para el segmento premium senior

Si no hay 4 posts con all inclusive confirmado, completá con los hoteles más convenientes disponibles.

### PASO 5 — Formato de salida

Devolvé **exactamente** este JSON con las **4 ofertas** seleccionadas:

```json
{
  "actualizado": "FECHA_HOY",
  "fuente": "promociones-aereas.com.ar",
  "hoteles": [
    {
      "id": 1,
      "titulo": "5 Hoteles All Inclusive 5⭐ más baratos de Punta Cana desde USD 160",
      "hotel": "Impressive Punta Cana / Catalonia / Bahia Principe",
      "destino": "Punta Cana, Rep. Dominicana",
      "descuento": "Desde USD 160",
      "cuotas": "Opciones en cuotas",
      "precio_desde": 160,
      "estrellas": "5 estrellas",
      "highlights": [
        "All Inclusive: comidas y bebidas incluidas",
        "Playa privada con acceso directo",
        "Actividades y entretenimiento incluidos"
      ],
      "url": "https://promociones-aereas.com.ar/2026/03/los-hoteles-all-inclusive-mas-baratos-de-punta-cana-hay-tarifas-ho-p.html",
      "fecha_publicacion": "2026-03-19",
      "etiqueta": "DESDE USD 160"
    }
  ]
}
```

### PASO 6 — Nota de curación

Después del JSON, incluí una sección breve:

```
## Por qué estas 4 ofertas para viajerosmayores.com

[Una línea por cada oferta explicando por qué es relevante para el segmento 60+]

## Aviso importante para las cards
Los precios son de referencia y pueden variar según fechas y disponibilidad.
Siempre indicar al usuario que consulte directamente en el enlace para obtener precio actualizado.
```

### PASO 7 — Actualizar las cards en OfertasClient.tsx

Una vez obtenidas las **4 ofertas**, **editá automáticamente** el archivo `app/ofertas/OfertasClient.tsx` reemplazando el bloque `// Hoteles recomendados` dentro del array `OFERTAS`.

**IMPORTANTE**: el bloque debe contener exactamente **4 objetos** con ids `'h1'`, `'h2'`, `'h3'`, `'h4'`.

**Mapeo de campos JSON → propiedades del objeto Oferta:**

```ts
{
  id: 'h1',                          // 'h1', 'h2', 'h3', 'h4'
  tipo: 'hotel',
  imagen: '<imagen Unsplash temática>',
  badge: etiqueta,                   // ej: 'DESDE USD 160', '50% OFF', 'ALL INCLUSIVE'
  badgeBg: '<color Tailwind>',
  descuento: <número>,               // 0 si no hay descuento verificado
  titulo: `${hotel} — ${destino}`,
  ubicacion: destino,
  duracion: `All Inclusive · ${estrellas}`,
  descripcion: '<frase corta y atractiva para el senior>',
  features: highlights,
  precioOriginal: <número>,          // precio sin descuento, igual a precio si no hay descuento
  precio: precio_desde,
  moneda: 'USD',
  url: url,
}
```

**Reglas de imagen Unsplash a usar según destino:**
- Punta Cana / Caribe: `https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=500&fit=crop&auto=format`
- Aruba / Islas: `https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=500&fit=crop&auto=format`
- Brasil / Nordeste: `https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=500&fit=crop&auto=format`
- Cancún / México: `https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=800&h=500&fit=crop&auto=format`
- Europa / Ciudad: `https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&h=500&fit=crop&auto=format`
- Resort / Pool genérico: `https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=500&fit=crop&auto=format`

**Color del badge según tipo:**
- Precio muy bajo / desde → `bg-green-600`
- Descuento porcentual alto → `bg-red-500`
- All inclusive destacado → `bg-blue-600`
- Tarifa flexible / cancelación → `bg-teal-600`
- Lujo / Premium → `bg-amber-600`

Después de editar el archivo, confirmá con un mensaje breve indicando cuántas cards se actualizaron y desde qué fuente.

## Datos del sitio (referencia actualizada — mar 2026)

Posts recientes conocidos de la categoría Hoteles en el sitio:

| Fecha | Título | URL |
|---|---|---|
| Mar 2026 | 5 Hoteles All Inclusive 5⭐ más baratos de Punta Cana desde USD 160 | `/2026/03/los-hoteles-all-inclusive-mas-baratos-de-punta-cana-hay-tarifas-ho-p.html` |
| Mar 2026 | Hasta 15% descuento hoteles Brasil con tarjetas seleccionadas | `/2026/03/hasta-descuento-para-hoteles-de-brasil-con-tarjetas-seleccionadas-ho-p.html` |
| Mar 2026 | Hoteles 4⭐ Buenos Aires hasta 49% descuento + cuotas | `/2026/03/hoteles-en-buenos-aires-con-descuento-en-un-pago-excelente-ubicacion-y-cuotas-ho-p-2.html` |
| Mar 2026 | Hoteles EE.UU. hasta 10% descuento + 3 cuotas | `/2026/03/hoteles-de-estados-unidos-con-descuento-cuotas-con-tarjetas-seleccionadas-ho-p.html` |
| Feb 2026 | Hasta 50% OFF Hoteles All Inclusive 5⭐ Aruba en 3 cuotas | `/2026/02/off-en-hoteles-all-inclusive-en-aruba-con-opciones-en-hasta-cuotas-ho-p-2.html` |
| Feb 2026 | Hoteles All Inclusive Maragogi / Praia do Forte 3 cuotas tarifa flex | `/2026/02/hoteles-all-inclusive-maragogi-o-praia-do-forte-en-cuotas-y-tarifa-flexible-ho-p.html` |
| Feb 2026 | Paquetes All Inclusive Nordeste Brasil o Caribe | `/2026/02/paquetes-all-inclusive-al-nordeste-de-brasil-o-al-caribe-las-mejores-opciones-para-los-proximos-meses-pa-p.html` |
| Feb 2026 | Hasta 45% OFF Hoteles All Inclusive 5⭐ Aruba en 3 cuotas | `/2026/02/hasta-off-en-hoteles-all-inclusive-en-aruba-con-opciones-en-hasta-cuotas-ho-p-2.html` |
| Feb 2026 | Hoteles Nueva York 10% descuento + 3 cuotas | `/2026/02/hoteles-nueva-york-tienen-de-descuento-cuotas-con-tarjetas-seleccionadas-ho-p.html` |

URLs completas: anteponé `https://promociones-aereas.com.ar` a cada path.

## Manejo de errores

- Si la API WordPress devuelve 401 → usá el fallback de fetch directo a las URLs de la tabla
- Si un post no tiene precio concreto → igualmente incluilo si tiene descuento o beneficio claro, y poné `precio_desde: 0` y en el card mostrá el badge de la oferta
- Si no hay 4 ofertas all inclusive → completá con los hoteles más convenientes con descuento verificado
- Precios cambian con disponibilidad → siempre indicar "Cotizar en el enlace" como aviso

## Perfil del usuario final

Las cards son para **viajerosmayores.com**, dirigido a viajeros hispanohablantes de **60+**. Priorizá:
- **All Inclusive** es el formato ideal para mayores: sin preocuparse por comidas, presupuesto controlado
- Destinos con clima cálido y cómodo: Caribe, Brasil — evitar destinos con mucha caminata
- Hoteles con accesibilidad mencionada (rampa, ascensor, baño adaptado) son un plus
- Cadenas conocidas (Riu, Iberostar, Bahia Principe, Club Med) generan más confianza
- Cuotas sin interés: muy valorado por audiencia argentina
- NO incluyas hostels, apartamentos o alojamientos sin servicio completo
