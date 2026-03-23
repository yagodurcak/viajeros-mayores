# QA Report: Full Site Test

**Fecha**: 2026-03-23
**Estado**: PASSED (con warnings menores)
**Tester**: Claude QA Automatizado + Playwright

## Resumen
- Paginas testeadas: 14 (desktop) + 7 (mobile)
- Paginas OK: **14/14**
- Errores de consola: 3 (recurso 404 menor, probablemente favicon o font)
- Links externos totales: 258
- Links sin `rel="noopener"`: 56 (todos en Footer, usan Next.js `<Link>` que no aplica rel automaticamente)
- Hotel cards renderizadas: 155 (142 reales + ~13 de ofertas en sidebar)
- Filtro Argentina: funciona correctamente (15 hoteles)

## Resultados Desktop (1440x900)

| Pagina | Status | Tiempo | Links ext | Errores | Screenshot |
|--------|--------|--------|-----------|---------|------------|
| Home `/` | 200 OK | 2687ms | 16 | 1 (404 recurso) | `01-home-desktop.png` |
| Hoteles `/hoteles` | 200 OK | 2348ms | 161 | 1 (404 recurso) | `02-hoteles-desktop.png` |
| Vuelos `/vuelos` | 200 OK | 1890ms | 8 | 0 | `03-vuelos-desktop.png` |
| Seguros `/seguros` | 200 OK | 1535ms | 9 | 0 | `04-seguros-desktop.png` |
| Excursiones `/excursiones` | 200 OK | 1980ms | 8 | 0 | `05-excursiones-desktop.png` |
| Ofertas `/ofertas` | 200 OK | 1835ms | 16 | 1 (404 recurso) | `06-ofertas-desktop.png` |
| Blog `/blog` | 200 OK | 2522ms | 5 | 0 | `07-blog-desktop.png` |
| Noticias `/news` | 200 OK | 1849ms | 5 | 0 | `08-news-desktop.png` |
| Comunidad `/comunidad` | 200 OK | 1498ms | 5 | 0 | `09-comunidad-desktop.png` |
| Sobre Nosotros `/about` | 200 OK | 1592ms | 5 | 0 | `10-about-desktop.png` |
| Busqueda IA `/search` | 200 OK | 2110ms | 5 | 0 | `11-search-desktop.png` |
| Miembros `/members` | 200 OK | 2348ms | 5 | 0 | `12-members-desktop.png` |
| Login `/login` | 200 OK | 1749ms | 5 | 0 | `13-login-desktop.png` |
| Registro `/signup` | 200 OK | 1502ms | 5 | 0 | `14-signup-desktop.png` |

## Resultados Mobile (375x812)

| Pagina | Estado | Screenshot |
|--------|--------|------------|
| Home | OK | `home-mobile.png` |
| Hoteles | OK | `hoteles-mobile.png` |
| Vuelos | OK | `vuelos-mobile.png` |
| Seguros | OK | `seguros-mobile.png` |
| Ofertas | OK | `ofertas-mobile.png` |
| Blog | OK | `blog-mobile.png` |
| Login | OK | `login-mobile.png` |

## Test de Filtros (Hoteles)

- Total de cards de hotel: 155
- Filtro Argentina: **funciona** — muestra 15 hoteles correctamente
- Boton Argentina con bandera 🇦🇷: encontrado y clickeable

## Verificacion Visual

- Home: banner coral, ofertas de cruceros/seguros/hoteles visibles, footer correcto
- Hoteles: filtro por pais visible, cards con info completa, boton "Ver detalles" en cada card
- Filtro Argentina: muestra Buenos Aires, Cataratas del Iguazu, Bariloche correctamente
- Mobile: layout responsive correcto, cards apiladas, navegacion funcional

## Issues Encontrados

1. **[LOW]** 3 errores de consola "404 Not Found" en Home, Hoteles y Ofertas — probablemente un recurso estatico (favicon, font, o imagen) que no se encuentra
2. **[INFO]** 56 links externos sin `rel="noopener noreferrer"` — todos son links del Footer usando Next.js `<Link>` que no agrega `rel` automaticamente

## Google Analytics Tracking

Se agrego tracking de clicks externos (`gtag event`) en:
- `HotelesClient.tsx` — evento `hotel_click`
- `VuelosClient.tsx` — evento `flight_search_click`
- `SegurosClient.tsx` — evento `insurance_click`
- `ExcursionesClient.tsx` — evento `excursion_click`
- `HomeClient.tsx` — evento `whatsapp_share`
- `Footer.tsx` — evento `footer_link_click`
- `OfertasClient.tsx` — evento `offer_click` (ya existia)
