# 🚀 Quick Start: SEO para Facebook

## ⚡ 3 Pasos para que tus publicaciones se vean como "Promociones Aéreas"

### 1️⃣ Agregar variable de entorno

En tu archivo `.env.local`, agrega:

```bash
NEXT_PUBLIC_SITE_URL=https://tu-dominio.com
```

⚠️ **IMPORTANTE:** Usa tu dominio real de producción, NO `localhost`

---

### 2️⃣ Desplegar a producción

```bash
# Commitea los cambios
git add .
git commit -m "Add Open Graph SEO support"
git push

# Vercel/Netlify automáticamente desplegará
```

---

### 3️⃣ Probar en Facebook

1. Ve a: [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
2. Pega el URL de un artículo: `https://tu-sitio.com/blog/tu-articulo`
3. Click en **"Debug"** o **"Scrape Again"**
4. Verás la vista previa con imagen, título y descripción

---

## ✅ Ya está listo para:

- ✅ **Blog** - Cada artículo tiene su metadata
- ✅ **Noticias** - Cada noticia tiene su metadata
- ✅ **Página principal** - Metadata por defecto configurada
- ✅ **Twitter Cards** - También configuradas
- ✅ **SEO básico** - Canonical URLs incluidas

---

## 📱 Cómo publicar en Facebook

1. Crea un artículo en tu blog o noticias
2. Copia el URL completo
3. Ve a tu página de Facebook
4. Pega el link en "Crear publicación"
5. Facebook mostrará automáticamente:
   - 📸 Imagen grande
   - 📝 Título del artículo
   - 📄 Descripción
6. Agrega texto extra si quieres (como "Los 40 Aeropuertos..." ⚠️)
7. ¡Publica!

---

## 🎯 Resultado

Tu publicación se verá así:

```
┌─────────────────────────────────────────┐
│ Tu texto adicional aquí ⚠️              │
├─────────────────────────────────────────┤
│                                         │
│  [IMAGEN GRANDE 1200x630]              │
│                                         │
├─────────────────────────────────────────┤
│ TU-SITIO.COM                           │
│                                         │
│ Título del Artículo | Viajeros Mayores│
│                                         │
│ Descripción del artículo aquí...       │
└─────────────────────────────────────────┘

👍 Me gusta    💬 Comentar    🔄 Compartir
```

---

## 🐛 Si algo no funciona

### La imagen no aparece
- Verifica que la imagen sea accesible públicamente
- Usa URLs absolutas (https://...)
- Tamaño recomendado: 1200x630 pixels

### Los cambios no se ven
- Limpia el caché en [Facebook Debugger](https://developers.facebook.com/tools/debug/)
- Haz clic en "Scrape Again"
- Verifica que estés en producción (no localhost)

### El título se corta
- Facebook muestra máximo 88 caracteres
- Sé conciso y descriptivo

---

## 📚 Más información

- Ver `SEO_SETUP.md` para guía completa
- Ver `EJEMPLO_SEO.md` para ejemplos prácticos
- Visita: [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)

---

## 🎉 ¡Eso es todo!

Tu sitio ya está configurado para tener publicaciones profesionales en Facebook.

**Próximos pasos opcionales:**
- Optimizar imágenes a 1200x630px
- Agregar emojis a títulos para más engagement
- Crear imágenes personalizadas para cada artículo
- Experimentar con diferentes descripciones

---

**¿Preguntas?** Revisa `SEO_SETUP.md` para troubleshooting detallado.

