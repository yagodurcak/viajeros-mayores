---
name: playwright-cli
description: "Tester QA automatizado para viajerosmayores.com. Usa Playwright para navegar el sitio, verificar que todo funcione, tomar screenshots, y generar reportes. Activar cuando el usuario dice: testea, revisa que funcione, hay un bug, verificalo, checalo en el browser, controla la web, QA, o despues de implementar una feature."
allowed-tools: Read, Write, Edit, Bash, Grep, Glob, Agent
---

# QA Tester — viajerosmayores.com

> Ejecutar QA: $ARGUMENTS

---

## Contexto del Proyecto

**viajerosmayores.com** es una app Next.js para viajeros mayores de 60 anos hispanohablantes. URL local: `http://localhost:3000`

### Mapa de Rutas

| Ruta | Seccion | Que testear |
|------|---------|-------------|
| `/` | Home (comunidad) | Banner, nav lateral, feed de articulos, sidebar, testimonios, CTA |
| `/blog` | Blog | Grid de articulos, filtros por categoria, paginacion |
| `/blog/[slug]` | Articulo | Contenido, comentarios, compartir |
| `/news` | Noticias | Grid de noticias, featured news |
| `/news/[slug]` | Noticia | Contenido, comentarios |
| `/hoteles` | Hoteles recomendados | Filtro por pais, cards de hotel, links a Booking.com |
| `/vuelos` | Buscadores de vuelos | Cards de buscadores, links externos |
| `/seguros` | Seguros de viaje | Cards de aseguradoras, links externos |
| `/excursiones` | Excursiones | Cards de plataformas, links externos |
| `/ofertas` | Ofertas | Cards de cruceros/hoteles/seguros, links a ofertas |
| `/comunidad` | Comunidad | Feed, interacciones |
| `/search` | Busqueda IA | Input, resultados de destinos |
| `/maps` | Mapas | Google Maps, elevacion de rutas |
| `/about` | Sobre nosotros | Contenido estatico |
| `/login` | Login | Formulario, validacion |
| `/signup` | Registro | Formulario, validacion |
| `/members` | Miembros | Listado de perfiles |
| `/profile/[username]` | Perfil | Info del usuario, badges, reviews |

### Criterios UX para Mayores de 60

- Botones: `min-h-[44px]` minimo
- Texto: `text-base` (16px) minimo para contenido principal
- Contraste: alto, nunca gris claro sobre blanco
- Links externos: deben abrir en nueva pestana (`target="_blank"`)
- Formularios: inputs grandes, focus rings visibles

---

## Metodo de Testing con Playwright

### Usar scripts Node.js para tests complejos

En vez de comandos sueltos de CLI, escribir scripts `.js` temporales que usen Playwright programaticamente:

```bash
# Instalar si no esta
npx playwright install chromium 2>/dev/null

# Ejecutar un test script
node /tmp/qa-test.js
```

### Template de script de test

```javascript
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
  });

  // --- TEST STEPS ---
  await page.goto('http://localhost:3000');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: '.qa-reports/FECHA/screenshots/01-home.png', fullPage: true });

  // Verificar elementos
  const title = await page.title();
  console.log(`Title: ${title}`);

  const links = await page.$$eval('a[target="_blank"]', els =>
    els.map(el => ({ text: el.textContent?.trim(), href: el.href }))
  );
  console.log(`External links: ${links.length}`);

  await browser.close();
})();
```

### Tipos de verificacion

1. **Renderizado**: La pagina carga sin errores, sin pantalla blanca
2. **Links**: Todos los links externos tienen `target="_blank"` y `rel="noopener noreferrer"`
3. **Responsive**: Verificar en 3 viewports: desktop (1440), tablet (768), mobile (375)
4. **Interacciones**: Filtros funcionan, botones clickeables, formularios enviables
5. **Consola**: No hay errores JS en la consola del browser
6. **Performance**: Pagina carga en < 5 segundos
7. **Accesibilidad**: Contraste, tamano de botones, aria-labels

---

## Flujo de QA

### Paso 1: Verificar que el servidor esta corriendo

```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000
```

Si no responde 200, avisar al usuario que ejecute `npm run dev`.

### Paso 2: Crear directorio de artefactos

```bash
mkdir -p .qa-reports/$(date +%Y-%m-%d)-[nombre]/screenshots
```

### Paso 3: Escribir y ejecutar el script de test

Escribir un script `.js` en `/tmp/qa-[nombre].js` que:
- Navegue a cada pagina relevante
- Tome screenshots
- Verifique elementos criticos (links, botones, formularios)
- Capture errores de consola
- Genere output en formato estructurado

### Paso 4: Analizar los screenshots

Usar Read para ver los screenshots generados y verificar visualmente.

### Paso 5: Generar reporte

Crear `.qa-reports/[fecha]-[nombre]/report.md`.

---

## Modos de QA

### `/playwright-cli full-site`
Test completo de todas las rutas. Navega cada pagina, toma screenshot, verifica:
- Sin errores de consola
- Titulo correcto
- Links externos con target="_blank"
- Responsive (desktop + mobile)

### `/playwright-cli [ruta]`
Test especifico de una seccion. Ejemplo: `/playwright-cli hoteles`

### `/playwright-cli links`
Verifica TODOS los links externos del sitio:
- Que tengan target="_blank"
- Que tengan rel="noopener noreferrer"
- Que las URLs sean validas (formato correcto)
- Que tengan tracking de Google Analytics (onClick con gtag)

### `/playwright-cli responsive`
Test de responsive en 3 viewports para las paginas principales.

### `/playwright-cli a11y`
Test de accesibilidad: tamano de botones, contraste, aria-labels, focus rings.

---

## Template del Reporte

```markdown
# QA Report: [Nombre]

**Fecha**: YYYY-MM-DD
**Estado**: PASSED | FAILED | PARTIAL
**Tester**: Claude QA Automatizado

## Resumen
- Paginas testeadas: X
- Errores encontrados: X
- Warnings: X

## Resultados por Pagina

### / (Home)
- Estado: OK/FAIL
- Screenshot: `screenshots/01-home.png`
- Errores de consola: ninguno / [lista]
- Links externos: X (todos con tracking)

### /hoteles
- Estado: OK/FAIL
- Screenshot: `screenshots/02-hoteles.png`
- Filtros: funcionan / [problema]
- Cards: X hoteles renderizados
- Links Booking: todos con target="_blank" y GA tracking

[... mas paginas ...]

## Issues Encontrados
1. [Severidad] [Descripcion] — Pagina: [ruta] — Screenshot: [archivo]

## Recomendaciones
- [Accion sugerida]
```

---

## Reglas

- SIEMPRE verificar que el servidor esta corriendo antes de testear
- SIEMPRE crear directorio de artefactos antes de empezar
- SIEMPRE tomar screenshots de cada pagina testeada (fullPage: true)
- SIEMPRE capturar errores de consola del browser
- SIEMPRE generar el reporte al final
- NUNCA volcar snapshots YAML completos al contexto
- Para Playwright programatico, usar `require('playwright')` — si falla, probar con la ruta completa del modulo desde node_modules
- Si Playwright no esta instalado como modulo, usar `npx playwright screenshot` como fallback
- Los screenshots se guardan en disco y se leen con Read para verificacion visual
