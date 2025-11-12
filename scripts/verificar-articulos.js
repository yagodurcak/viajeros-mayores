/**
 * Script para verificar artículos publicados en Supabase
 * Uso: node scripts/verificar-articulos.js
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Leer .env.local
const envPath = path.join(__dirname, '..', '.env.local');
let supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
let supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const lines = envContent.split('\n');

  lines.forEach((line) => {
    const match = line.match(/^NEXT_PUBLIC_SUPABASE_URL=(.+)$/);
    if (match) supabaseUrl = match[1].replace(/['"]/g, '');

    const matchKey = line.match(/^NEXT_PUBLIC_SUPABASE_ANON_KEY=(.+)$/);
    if (matchKey) supabaseKey = matchKey[1].replace(/['"]/g, '');
  });
}

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Error: Variables de entorno no encontradas');
  console.error(
    '   Asegúrate de tener NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY en .env.local'
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function verificarArticulos() {
  console.log('🔍 Verificando artículos de blog...\n');

  try {
    // Obtener artículos publicados
    const { data: articulos, error } = await supabase
      .from('blog_posts')
      .select('id, title, slug, published, created_at, image_url')
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('❌ Error al consultar Supabase:', error.message);
      return;
    }

    if (!articulos || articulos.length === 0) {
      console.log('⚠️  No se encontraron artículos publicados');
      console.log('');
      console.log('💡 Opciones:');
      console.log(
        '   1. Crea un artículo en: https://www.viajerosmasayores.com/blog/create'
      );
      console.log(
        '   2. O marca un artículo existente como published=true en Supabase'
      );
      return;
    }

    console.log(
      `✅ Se encontraron ${articulos.length} artículo(s) publicado(s)\n`
    );
    console.log('─'.repeat(80));

    articulos.forEach((articulo, index) => {
      console.log(`\n📄 Artículo ${index + 1}:`);
      console.log(`   Título: ${articulo.title}`);
      console.log(`   Slug: ${articulo.slug}`);
      console.log(`   Imagen: ${articulo.image_url ? '✅ Sí' : '❌ No'}`);
      console.log(
        `   Fecha: ${new Date(articulo.created_at).toLocaleDateString('es-AR')}`
      );
      console.log(`   \n   🔗 URL para compartir:`);
      console.log(`   https://www.viajerosmasayores.com/blog/${articulo.slug}`);

      if (articulo.image_url) {
        console.log(`   \n   📸 URL de imagen:`);
        console.log(`   ${articulo.image_url}`);
      }

      console.log('\n' + '─'.repeat(80));
    });

    console.log('\n📋 RESUMEN:');
    console.log(`   Total de artículos: ${articulos.length}`);
    console.log(
      `   Con imagen: ${articulos.filter((a) => a.image_url).length}`
    );
    console.log(
      `   Sin imagen: ${articulos.filter((a) => !a.image_url).length}`
    );

    console.log('\n💡 PRÓXIMOS PASOS:');
    console.log('   1. Copia uno de los slugs de arriba');
    console.log('   2. Úsalo para compartir en Facebook');
    console.log('   3. Si no tiene imagen, agrégala en el editor del blog');
    console.log('');

    // Buscar el artículo específico que el usuario intentó compartir
    const articuloBuscado = 'rutas-urbanas-sin-escaleras-ritmo-pausado';
    const existe = articulos.find((a) => a.slug === articuloBuscado);

    if (existe) {
      console.log(
        `✅ El artículo "${articuloBuscado}" existe y está publicado`
      );
    } else {
      console.log(
        `❌ El artículo "${articuloBuscado}" NO existe o NO está publicado`
      );
      console.log(
        '   Puedes crearlo en: https://www.viajerosmasayores.com/blog/create'
      );
    }
  } catch (error) {
    console.error('❌ Error inesperado:', error.message);
  }
}

// Función adicional para verificar noticias
async function verificarNoticias() {
  console.log('\n\n🔍 Verificando noticias...\n');

  try {
    const { data: noticias, error } = await supabase
      .from('news_articles')
      .select('id, title, slug, published, created_at, image_url')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .limit(5);

    if (error) {
      console.error('❌ Error al consultar noticias:', error.message);
      return;
    }

    if (!noticias || noticias.length === 0) {
      console.log('⚠️  No se encontraron noticias publicadas');
      return;
    }

    console.log(
      `✅ Se encontraron ${noticias.length} noticia(s) reciente(s)\n`
    );
    console.log('─'.repeat(80));

    noticias.forEach((noticia, index) => {
      console.log(`\n📰 Noticia ${index + 1}:`);
      console.log(`   Título: ${noticia.title}`);
      console.log(`   Slug: ${noticia.slug}`);
      console.log(`   Imagen: ${noticia.image_url ? '✅ Sí' : '❌ No'}`);
      console.log(`   \n   🔗 URL para compartir:`);
      console.log(`   https://www.viajerosmasayores.com/news/${noticia.slug}`);
      console.log('\n' + '─'.repeat(80));
    });
  } catch (error) {
    console.error('❌ Error al verificar noticias:', error.message);
  }
}

// Ejecutar
(async () => {
  await verificarArticulos();
  await verificarNoticias();
})();
