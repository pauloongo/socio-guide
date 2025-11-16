import { createClient } from '@supabase/supabase-js';
import { writeFileSync, readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env file from parent directory
const envPath = join(__dirname, '..', '.env');
const envContent = readFileSync(envPath, 'utf-8');
const envVars = {};

envContent.split('\n').forEach(line => {
  const [key, ...valueParts] = line.split('=');
  if (key && valueParts.length > 0) {
    envVars[key.trim()] = valueParts.join('=').trim().replace(/^["']|["']$/g, '');
  }
});

// Supabase configuration
const SUPABASE_URL = envVars.VITE_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = envVars.VITE_SUPABASE_PUBLISHABLE_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('Error: Supabase credentials not found in environment variables');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const BASE_URL = 'https://auxiliosbr.com.br';

// Static routes
const staticRoutes = [
  { path: '/', priority: '1.0', changefreq: 'daily' },
  { path: '/blog', priority: '0.9', changefreq: 'daily' },
  { path: '/calculadoras', priority: '0.9', changefreq: 'monthly' },
  { path: '/sobre', priority: '0.7', changefreq: 'monthly' },
  { path: '/contato', priority: '0.6', changefreq: 'monthly' },
];

async function generateSitemap() {
  try {
    console.log('Fetching published posts from database...');
    
    // Fetch published posts
    const { data: posts, error } = await supabase
      .from('posts')
      .select('slug, updated_at, date')
      .eq('published', true)
      .order('date', { ascending: false });

    if (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }

    console.log(`Found ${posts?.length || 0} published posts`);

    const today = new Date().toISOString().split('T')[0];

    // Generate XML
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    // Add static routes
    staticRoutes.forEach(route => {
      xml += '  <url>\n';
      xml += `    <loc>${BASE_URL}${route.path}</loc>\n`;
      xml += `    <lastmod>${today}</lastmod>\n`;
      xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
      xml += `    <priority>${route.priority}</priority>\n`;
      xml += '  </url>\n';
    });

    // Add blog posts
    if (posts && posts.length > 0) {
      posts.forEach(post => {
        const lastmod = post.updated_at 
          ? new Date(post.updated_at).toISOString().split('T')[0]
          : new Date(post.date).toISOString().split('T')[0];

        xml += '  <url>\n';
        xml += `    <loc>${BASE_URL}/blog/${post.slug}</loc>\n`;
        xml += `    <lastmod>${lastmod}</lastmod>\n`;
        xml += `    <changefreq>weekly</changefreq>\n`;
        xml += `    <priority>0.8</priority>\n`;
        xml += '  </url>\n';
      });
    }

    xml += '</urlset>';

    // Save to public folder
    const outputPath = join(__dirname, '..', 'public', 'sitemap.xml');
    writeFileSync(outputPath, xml, 'utf-8');

    console.log(`✅ Sitemap generated successfully at: ${outputPath}`);
    console.log(`Total URLs: ${staticRoutes.length + (posts?.length || 0)}`);
    
  } catch (error) {
    console.error('Error generating sitemap:', error);
    process.exit(1);
  }
}

// Run the script
generateSitemap();
