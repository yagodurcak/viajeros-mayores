# 📊 Configuración de Google Analytics 4

## ✅ Instalación Completada

Ya instalé Google Analytics 4 en tu proyecto. Solo falta obtener tu ID de medición.

---

## 🚀 Paso 1: Crear Cuenta de Google Analytics

### 1. Ve a Google Analytics:
```
https://analytics.google.com/
```

### 2. Inicia sesión con tu cuenta de Google

### 3. Click en "Comenzar a medir" o "Start measuring"

### 4. Completa la información:

#### **Nombre de la cuenta:**
```
Viajeros Mayores
```

#### **Nombre de la propiedad:**
```
Viajeros Mayores Web
```

#### **Zona horaria:**
```
Argentina (GMT-3)
```

#### **Moneda:**
```
Peso argentino (ARS)
```

### 5. Configura tu empresa:
- Sector: Viajes
- Tamaño: Pequeña empresa
- Uso previsto: Analizar comportamiento de usuarios

### 6. Acepta los términos

---

## 📱 Paso 2: Configurar Flujo de Datos Web

### 1. Selecciona plataforma: **Web**

### 2. Completa los datos:

**URL del sitio web:**
```
https://www.viajerosmasayores.com
```

**Nombre del flujo:**
```
Viajeros Mayores - Sitio Web
```

### 3. Click en **"Crear flujo"**

### 4. ¡IMPORTANTE! Copia el **ID de medición**

Verás algo como:
```
G-XXXXXXXXXX
```

**Ejemplo:**
```
G-1A2B3C4D5E
```

---

## 🔧 Paso 3: Agregar ID a tu Proyecto

### Opción A: Localmente (.env.local)

Abre tu archivo `.env.local` y agrega:

```bash
# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

Reemplaza `G-XXXXXXXXXX` con tu ID real.

### Opción B: En Vercel (Producción)

1. Ve a **Vercel Dashboard**
2. Tu proyecto → **Settings** → **Environment Variables**
3. Click **"Add New"**
4. **Name:** `NEXT_PUBLIC_GA_ID`
5. **Value:** `G-XXXXXXXXXX` (tu ID real)
6. Selecciona: `Production`, `Preview`, `Development`
7. Click **"Save"**

---

## 🚢 Paso 4: Deploy

### 1. Commit y push:
```bash
git add .
git commit -m "Add Google Analytics 4"
git push
```

### 2. Espera el deploy (2-3 min)

### 3. Redeploy en Vercel (si ya agregaste la variable):
- Vercel → Deployments → último → ⋮ → Redeploy

---

## ✅ Paso 5: Verificar que Funciona

### 1. Abre tu sitio:
```
https://www.viajerosmasayores.com
```

### 2. Ve a Google Analytics:
```
https://analytics.google.com/
```

### 3. En el menú izquierdo:
- Click en **"Informes"** o **"Reports"**
- Click en **"Tiempo real"** o **"Realtime"**

### 4. Deberías ver:
- ✅ **1 usuario activo** (tú)
- ✅ Tu ubicación
- ✅ La página que estás viendo

---

## 📊 Qué Datos Verás en Google Analytics

### En Tiempo Real:
- Usuarios activos ahora
- Páginas que están viendo
- Ubicación geográfica
- Dispositivos (móvil, desktop)

### Informes (después de 24-48 horas):
- **Usuarios:** Cuántas personas visitan tu sitio
- **Sesiones:** Cuántas veces acceden
- **Páginas vistas:** Qué páginas ven más
- **Duración promedio:** Cuánto tiempo pasan
- **Tasa de rebote:** % que sale sin interactuar
- **Fuentes de tráfico:**
  - Google Search
  - Facebook
  - Directo
  - Otros sitios
- **Datos demográficos:** Edad, género, intereses
- **Dispositivos:** Desktop vs Móvil vs Tablet
- **Navegadores:** Chrome, Safari, Firefox, etc.
- **Países y ciudades:** De dónde son tus visitantes

---

## 🎯 Eventos Personalizados (Opcional)

Ya instalé Google Analytics básico. Si quieres trackear eventos específicos como:

- Click en "Compartir"
- Click en links de artículos
- Tiempo de lectura
- Scroll depth

Puedo agregarte funciones para eso después.

---

## 🔍 Debugging

### Si no aparecen datos en tiempo real:

#### 1. Verifica que el ID está correcto:

En tu navegador, abre:
```
view-source:https://www.viajerosmasayores.com
```

Busca: `gtag/js?id=G-`

Deberías ver tu ID de medición.

#### 2. Verifica en DevTools:

1. Abre tu sitio
2. Presiona F12 (DevTools)
3. Ve a la pestaña **"Network"**
4. Filtra por: `google-analytics` o `gtag`
5. Deberías ver requests a Google Analytics

#### 3. Extensión de Chrome (Recomendado):

Instala: **Google Analytics Debugger**
```
https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna
```

Actívala y recarga tu sitio. En la consola verás los eventos de GA4.

---

## 📱 Aplicación Móvil de Google Analytics

Descarga la app para ver estadísticas desde tu teléfono:

- **iOS:** https://apps.apple.com/app/google-analytics/id881599038
- **Android:** https://play.google.com/store/apps/details?id=com.google.android.apps.giant

---

## 🎓 Recursos Útiles

### Dashboard de Google Analytics:
```
https://analytics.google.com/
```

### Documentación oficial:
```
https://support.google.com/analytics/
```

### Academy (cursos gratis):
```
https://analytics.google.com/analytics/academy/
```

---

## 📋 Checklist Final

```
☐ Crear cuenta en Google Analytics
☐ Configurar propiedad para tu sitio
☐ Crear flujo de datos web
☐ Copiar ID de medición (G-XXXXXXXXXX)
☐ Agregar NEXT_PUBLIC_GA_ID en .env.local
☐ Agregar NEXT_PUBLIC_GA_ID en Vercel
☐ Git commit y push
☐ Esperar deploy
☐ Verificar en "Tiempo real" de GA
☐ ¡Ver tus primeras estadísticas! 🎉
```

---

## 💡 Tips para Maximizar el Valor

### 1. Conecta Search Console:
- Verás qué búsquedas de Google llevan tráfico
- Posicionamiento de keywords

### 2. Define objetivos:
- Completar formulario de contacto
- Leer X páginas
- Tiempo en sitio > 2 minutos

### 3. Configura eventos personalizados:
- Compartir en redes sociales
- Click en links externos
- Descargas

### 4. Revisa semanalmente:
- Qué artículos son más populares
- De dónde viene el tráfico
- Cuándo hay más visitas (día/hora)

---

## 🎯 Qué Hacer con los Datos

### 1. Contenido:
- Escribe más sobre temas populares
- Mejora artículos con alto rebote

### 2. SEO:
- Optimiza páginas con poco tráfico
- Mejora títulos y descripciones

### 3. Marketing:
- Comparte en redes a las horas con más tráfico
- Enfócate en las fuentes que más convierten

### 4. UX:
- Mejora páginas donde la gente sale rápido
- Simplifica navegación en páginas complejas

---

## ⚡ Lo que Ya Está Configurado

- ✅ Componente de Google Analytics creado
- ✅ Integrado en el layout principal
- ✅ Tracking automático de pageviews
- ✅ Compatible con Next.js 15
- ✅ Optimizado (carga después del contenido)
- ✅ Condicional (solo si hay ID configurado)

---

**¡Listo! Solo falta obtener tu ID de Google Analytics y agregarlo a las variables de entorno.** 🚀

¿Necesitas ayuda con algún paso específico?

