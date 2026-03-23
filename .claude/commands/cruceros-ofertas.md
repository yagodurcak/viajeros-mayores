---
name: cruceros-ofertas
description: Busca y selecciona las 4 mejores ofertas de cruceros actuales para viajeros mayores hispanohablantes, scrapeando MSC Cruceros Argentina y Costa Cruceros. Usá esta skill SIEMPRE que el usuario pida "buscar ofertas de cruceros", "actualizar cards de cruceros", "mejores cruceros", "ofertas MSC", "ofertas Costa", o cualquier variante relacionada con mostrar o publicar cruceros en el sitio viajerosmayores.com. La skill devuelve los datos listos para renderizar como cards en el home.
---

# Skill: Búsqueda de Ofertas de Cruceros

## Objetivo
Scrapear dos fuentes de cruceros, seleccionar las 4 mejores ofertas para el segmento senior hispanohablante (60+), y devolver los datos estructurados listos para publicar como cards.

## Fuentes a consultar
1. **MSC Cruceros Argentina**: `https://www.msccruceros.com.ar/ofertas-cruceros`
2. **Costa Cruceros**: `https://www.costacruceros.com/ofertas.html`

## Paso a paso

### ⚠️ NOTA TÉCNICA IMPORTANTE
Ambos sitios renderizan precios vía JavaScript. El `web_fetch` devolverá la estructura de la página (nombres de ofertas, destinos, badges de descuento) pero los precios exactos pueden no estar disponibles. Estrategia en dos pasos:

**Paso A:** Fetch de las páginas principales para identificar qué ofertas existen.
**Paso B:** Fetch de las sub-páginas de cada oferta encontrada + `web_search` para completar precios.

### PASO 1 — Fetch de las fuentes principales

```
web_fetch: https://www.msccruceros.com.ar/ofertas-cruceros
web_fetch: https://www.costacruceros.com/ofertas.html
```

Sub-páginas MSC conocidas (hacé fetch de las que aparezcan en los resultados):
- `/ofertas-cruceros/cruceros-a-brasil`
- `/ofertas-cruceros/promo-caribe-2026`
- `/ofertas-cruceros/msc-opera-la-romana`
- `/ofertas-cruceros/temporada-26-27`
- `/ofertas-cruceros/cruceros-mediterraneo`

Si Costa no devuelve contenido útil, usá:
```
web_search: "Costa Cruceros ofertas 2026 precio USD desde Argentina"
web_fetch: https://www.costacruceros.com/baratos.html
```

### PASO 2 — Extracción de datos por oferta

De cada oferta encontrada, extraé:
- `titulo`: nombre del crucero o ruta (ej: "MSC Fantasia — Buenos Aires → Brasil")
- `compania`: "MSC Cruceros" o "Costa Cruceros"
- `destino`: puertos principales separados por →
- `duracion`: número de noches
- `precio_original`: precio tachado si existe (en USD o moneda indicada)
- `precio_oferta`: precio final con descuento
- `descuento`: porcentaje de descuento si está disponible (ej: "-15%")
- `fecha_salida`: rango de fechas o temporada (ej: "Nov 2025 – Mar 2026")
- `highlights`: array de hasta 3 bullets clave (ej: ["Servicio completo en español", "Opción All Inclusive", "Itinerario Año Nuevo"])
- `url`: **URL directa e inequívoca a ESA oferta específica** (no a la homepage ni a la página general de ofertas). Debe llevar al usuario exactamente a ese crucero, esa fecha y ese barco. Si la naviera no tiene URL directa por itinerario, usá la URL del buscador intermediario (ej: crucero.com.ar, taoticket.com) que sí tenga el link específico. NUNCA pongas la URL de la homepage o de la sección general de ofertas como url de la oferta.
- `imagen_url`: URL de la imagen si está disponible, sino `null`
- `etiqueta`: badge especial si corresponde (ej: "NOVEDAD", "RECOMENDADO", "MÁS VENDIDO")

### PASO 3 — Criterios de selección de las 4 mejores

Priorizá ofertas que cumplan estos criterios (en orden de importancia):

0. 🚫 **FILTRO OBLIGATORIO — RANGO DE FECHAS**: Solo incluir ofertas cuya fecha de salida esté entre **hoy (23 de marzo de 2026)** y **diciembre de 2026** (inclusive). Descartá cualquier crucero que ya haya salido o que salga en 2027 o posterior. Si no se puede confirmar la fecha exacta, poné `fecha_salida: "Consultar"` pero nunca asumas que cumple el rango.
1. ✅ **Idioma**: servicio en español mencionado explícitamente
2. ✅ **Descuento real**: tienen precio tachado o % de descuento visible
3. ✅ **Destinos alineados** con el perfil senior: Mediterráneo, Brasil/Río, Caribe, Uruguay, Islas Canarias
4. ✅ **Duración ideal**: entre 7 y 12 noches (ni muy corto ni agotador)
5. ✅ **Salida desde Buenos Aires o puertos hispanohablantes** (Barcelona, Valencia, Miami)
6. ✅ **All Inclusive disponible** (elimina fricción para el senior)
7. ✅ **Precio accesible**: priorizá opciones desde USD 900–2500 por persona

Si hay empate, priorizá MSC sobre Costa (mejor soporte en español y descuentos 65+).

### PASO 4 — Formato de salida

Devolvé **exactamente** este JSON con las 4 ofertas seleccionadas:

```json
{
  "actualizado": "FECHA_HOY",
  "fuentes_consultadas": ["msccruceros.com.ar", "costacruceros.com"],
  "cruceros": [
    {
      "id": 1,
      "titulo": "MSC Fantasia — Buenos Aires → Brasil → Uruguay",
      "compania": "MSC Cruceros",
      "destino": "Buenos Aires · Río de Janeiro · Búzios · Montevideo",
      "duracion": "8 noches",
      "precio_original": "USD 1290",
      "precio_oferta": "USD 1098",
      "descuento": "-15%",
      "fecha_salida": "Abr 2026 – Dic 2026",
      "highlights": [
        "Servicio completo en español",
        "Opción All Inclusive",
        "Itinerario Año Nuevo especial"
      ],
      "url": "https://www.msccruceros.com.ar/ofertas-cruceros",
      "imagen_url": null,
      "etiqueta": "NOVEDAD EN BUE"
    }
  ]
}
```

### PASO 5 — Notas de curación

Después del JSON, agregá una sección breve en texto:

```
## Por qué estas 4 ofertas

[Una línea por cada crucero explicando por qué fue seleccionado para la audiencia senior]
```

### PASO 6 — Actualizar las cards en OfertasClient.tsx

Una vez obtenidas las 4 ofertas, **editá automáticamente** el archivo `app/ofertas/OfertasClient.tsx` reemplazando el bloque `// Cruceros` dentro del array `OFERTAS`.

**Mapeo de campos JSON → propiedades del objeto Oferta:**

```ts
{
  id: 'c1',                          // 'c1', 'c2', 'c3', 'c4'
  tipo: 'crucero',
  imagen: '<imagen Unsplash de crucero o mar>',  // usar URL de Unsplash temática
  badge: etiqueta,                   // ej: 'MEJOR PRECIO', 'AÑO NUEVO EN BRASIL'
  badgeBg: '<color Tailwind>',       // verde=precio, rojo=oferta, ámbar=premium, azul=especial
  descuento: <número>,               // 0 si no hay descuento verificado
  titulo: titulo,
  ubicacion: destino,
  duracion: `${duracion} · ${fecha_salida}`,
  descripcion: '<frase corta y atractiva para el senior>',
  features: highlights,              // array de 3 items
  precioOriginal: <número>,          // igual a precio si no hay descuento
  precio: <número>,                  // precio_oferta como número sin símbolo
  moneda: 'USD',
  url: url,                          // URL real de la naviera
}
```

**Reglas de imagen Unsplash a usar según destino:**
- Brasil / Río de Janeiro: `https://images.unsplash.com/photo-1548574505-5e239809ee19?w=800&h=500&fit=crop&auto=format`
- Caribe / playas: `https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=500&fit=crop&auto=format`
- Crucero en general: `https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&h=500&fit=crop&auto=format`
- Mediterráneo / Europa: `https://images.unsplash.com/photo-1515859005217-8a1f08870f59?w=800&h=500&fit=crop&auto=format`
- Patagonia / Antártida: `https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&h=500&fit=crop&auto=format`
- Amazonas / naturaleza: `https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=800&h=500&fit=crop&auto=format`

**Color del badge según tipo:**
- Precio más bajo / mejor valor → `bg-green-600`
- Descuento porcentual alto → `bg-red-500`
- Salida especial (Año Nuevo, Navidad) → `bg-amber-600`
- Destino/salida especial → `bg-blue-600`
- Experiencia única → `bg-teal-600`

Después de editar el archivo, confirmá con un mensaje breve indicando cuántas cards se actualizaron y desde qué fuentes.

## Manejo de errores

- Si una fuente **no responde o está vacía**: indicalo en el campo `fuentes_consultadas` como `"msccruceros.com.ar (no disponible)"` y completá las 4 cards solo con la fuente que funcionó.
- Si **no encontrás precios**: igual incluí la oferta y poné `precio_oferta: "Consultar"`.
- Si **no hay 4 ofertas suficientemente buenas**: incluí las que haya y explicá por qué no completaste las 4.
- Si los sitios bloquean el scraping: intentá buscar con `web_search` usando queries como `site:msccruceros.com.ar ofertas 2025` o `Costa Cruceros ofertas senior 2025`.

## Recordatorio del perfil del usuario final

Las cards son para **viajerosmayores.com**, sitio dirigido a viajeros hispanohablantes de 60+. Los criterios de selección deben reflejar las prioridades de este segmento: comodidad, español, precio claro, destinos conocidos, duración razonable. No incluyas cruceros de aventura extrema, expediciones polares, o destinos sin infraestructura senior.
