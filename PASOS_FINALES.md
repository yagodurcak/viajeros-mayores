# ✅ Pasos Finales para Arreglar Facebook Open Graph

## 🎯 Situación Actual:

- ✅ **Las imágenes SÍ existen** en Cloudinary
- ✅ **El código ya está corregido** localmente
- ❌ **El código NO está en producción** todavía
- ❌ **Variable de entorno en Vercel** tiene duplicación

---

## 🚀 Pasos para Arreglar (5 minutos):

### **Paso 1: Push del Código** (1 min)

El código ya está commiteado localmente. Solo necesitas hacer push:

```bash
git push
```

Si tienes problemas de permisos:
- Verifica que estés logueado con la cuenta correcta
- O crea un Pull Request en GitHub y mergealo

---

### **Paso 2: Arreglar Variable en Vercel** (2 min)

**IMPORTANTE**: La variable `NEXT_PUBLIC_SITE_URL` está duplicada con comillas:

```
"\"https://viajerosmasayores.com\"\"https://viajerosmasayores.com\""
```

**Solución:**

1. Ve a **Vercel Dashboard**
2. Selecciona tu proyecto "viajeros-mayores-1"
3. **Settings** → **Environment Variables**
4. **Busca** `NEXT_PUBLIC_SITE_URL`
5. **Elimínala** (click en los 3 puntos → Delete)
6. **Agrégala de nuevo**:
   ```
   Name: NEXT_PUBLIC_SITE_URL
   Value: https://www.viajerosmasayores.com
   ```
   ⚠️ **SIN comillas** - solo el URL plano
7. Selecciona: `Production`, `Preview`, `Development`
8. Click **Save**

---

### **Paso 3: Redeploy Manual** (2 min)

Después de cambiar la variable de entorno:

1. En Vercel, ve a **Deployments**
2. En el último deployment exitoso, click **⋮** (3 puntos)
3. Click **Redeploy**
4. Espera 2-3 minutos

---

### **Paso 4: Verificar** (2 min)

Una vez desplegado:

#### A. Verificar los meta tags:

Abre en el navegador:
```
view-source:https://www.viajerosmasayores.com/blog/rutas-urbanas-sin-escaleras-ritmo-pausado
```

Busca (Ctrl+F): `og:image`

Deberías ver:
```html
<meta property="og:image" content="https://res.cloudinary.com/dgn5xi6hk/image/..." />
```

#### B. Facebook Debugger:

1. Ve a: https://developers.facebook.com/tools/debug/
2. Pega: `https://www.viajerosmasayores.com/blog/rutas-urbanas-sin-escaleras-ritmo-pausado`
3. Click **"Debug"**
4. Click **"Scrape Again"**
5. Verás la vista previa con la imagen de Cloudinary

---

### **Paso 5: Compartir en Facebook** (1 min)

Ahora sí, ve a Facebook y comparte el link:
```
https://www.viajerosmasayores.com/blog/rutas-urbanas-sin-escaleras-ritmo-pausado
```

Debería aparecer:
- ✅ Imagen grande de Cloudinary
- ✅ Título: "Rutas urbanas sin escaleras: descubriendo ciudades a ritmo pausado"
- ✅ Descripción
- ✅ URL del sitio

---

## 📋 Checklist:

```
☐ 1. git push (o merge PR)
☐ 2. Vercel → Eliminar variable NEXT_PUBLIC_SITE_URL
☐ 3. Vercel → Agregar variable sin comillas
☐ 4. Vercel → Redeploy
☐ 5. Esperar 2-3 minutos
☐ 6. Verificar view-source (debe tener og:image)
☐ 7. Facebook Debugger → Scrape Again
☐ 8. Compartir en Facebook
☐ 9. ¡Debería funcionar! 🎉
```

---

## 🐛 Si Aún No Funciona:

### 1. Verificar que el artículo se obtenga correctamente:

```bash
node scripts/verificar-articulos.js
```

Deberías ver:
```
✅ Se encontraron 10 artículo(s) publicado(s)

📄 Artículo 3:
   Título: Rutas urbanas sin escaleras...
   Slug: rutas-urbanas-sin-escaleras-ritmo-pausado
   Imagen: ✅ Sí
   
   🔗 URL para compartir:
   https://www.viajerosmasayores.com/blog/rutas-urbanas-sin-escaleras-ritmo-pausado
   
   📸 URL de imagen:
   https://res.cloudinary.com/dgn5xi6hk/image/...
```

### 2. Verificar en producción:

```bash
curl -s "https://www.viajerosmasayores.com/blog/rutas-urbanas-sin-escaleras-ritmo-pausado" | grep "og:image"
```

Debe mostrar la URL de Cloudinary.

### 3. Ver logs de Vercel:

- Vercel → Deployments → Click en el último
- Ver "Runtime Logs"
- Buscar errores

---

## 📊 Diferencia Antes/Después:

### ❌ Antes (código viejo):
```typescript
// Tabla incorrecta
.from('blog_posts')  // ❌ No existe

// Columna incorrecta
image_url  // ❌ No existe

// Filtro inexistente
.eq('published', true)  // ❌ Columna no existe
```

### ✅ Después (código nuevo):
```typescript
// Tabla correcta
.from('posts')  // ✅ Existe

// Columna correcta
cover_image_url  // ✅ Existe con URLs de Cloudinary

// Sin filtro
// (todos los posts están publicados)
```

---

## 🎉 Resultado Esperado:

```
┌─────────────────────────────────────────┐
│                                         │
│  [IMAGEN DE CLOUDINARY]                │
│  Rutas urbanas sin escaleras            │
│  (1200x630)                            │
│                                         │
├─────────────────────────────────────────┤
│ VIAJEROSMASAYORES.COM                  │
│                                         │
│ Rutas urbanas sin escaleras:           │
│ descubriendo ciudades a ritmo pausado  │
│ | Viajeros Mayores                     │
│                                         │
│ Descripción del artículo...            │
└─────────────────────────────────────────┘

👍 Me gusta    💬 Comentar    🔄 Compartir
```

---

## ⏱️ Tiempo Total: ~5 minutos

1. git push: 30 seg
2. Arreglar variable Vercel: 1 min
3. Redeploy: 2-3 min
4. Verificar y compartir: 1 min

---

## 💡 Nota Importante:

El problema NO era la falta de imágenes (las tenías en Cloudinary).

El problema era que el código buscaba en:
- Tabla: `blog_posts` ❌ (debe ser `posts`)
- Columna: `image_url` ❌ (debe ser `cover_image_url`)

Ahora que está corregido, solo falta desplegarlo.

---

**¡Casi terminamos! Solo falta push + arreglar variable + redeploy** 🚀

