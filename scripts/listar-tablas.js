/**
 * Script para listar las tablas disponibles en Supabase
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
  
  lines.forEach(line => {
    const match = line.match(/^NEXT_PUBLIC_SUPABASE_URL=(.+)$/);
    if (match) supabaseUrl = match[1].replace(/['"]/g, '');
    
    const matchKey = line.match(/^NEXT_PUBLIC_SUPABASE_ANON_KEY=(.+)$/);
    if (matchKey) supabaseKey = matchKey[1].replace(/['"]/g, '');
  });
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function buscarArticulos() {
  console.log('🔍 Buscando artículos en diferentes tablas...\n');

  // Intentar diferentes nombres de tablas
  const tablasProbar = [
    'blog_posts',
    'posts',
    'articles',
    'blog',
    'news_articles',
    'news'
  ];

  for (const tabla of tablasProbar) {
    try {
      console.log(`Probando tabla: ${tabla}...`);
      const { data, error } = await supabase
        .from(tabla)
        .select('*')
        .limit(1);

      if (!error && data) {
        console.log(`✅ Tabla encontrada: ${tabla}`);
        console.log(`   Columnas disponibles:`, Object.keys(data[0] || {}));
        
        // Obtener todos los registros
        const { data: todos, error: errorTodos } = await supabase
          .from(tabla)
          .select('*')
          .limit(10);
        
        if (!errorTodos && todos) {
          console.log(`   Total de registros: ${todos.length}`);
          
          if (todos.length > 0) {
            console.log('\n   📄 Registros encontrados:\n');
            todos.forEach((item, i) => {
              console.log(`   ${i + 1}. ${item.title || item.name || item.slug || 'Sin título'}`);
              if (item.slug) console.log(`      Slug: ${item.slug}`);
              if (item.image_url || item.imageUrl) {
                console.log(`      Imagen: ✅`);
              } else {
                console.log(`      Imagen: ❌`);
              }
              console.log('');
            });
          }
        }
        console.log('\n' + '─'.repeat(80) + '\n');
      }
    } catch (err) {
      // Tabla no existe, continuar
    }
  }

  console.log('\n💡 Si no se encontraron artículos:');
  console.log('   1. Ve a Supabase Dashboard → Table Editor');
  console.log('   2. Verifica el nombre correcto de tus tablas');
  console.log('   3. O crea artículos en: https://www.viajerosmasayores.com/blog/create\n');
}

buscarArticulos();

