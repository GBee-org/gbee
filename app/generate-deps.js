import { readFileSync, writeFileSync } from 'fs';

// Lire package.json
const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));

// Récupérer toutes les dépendances
const dependencies = Object.keys(packageJson.dependencies || {});

// Contenu à écrire
const configContent = `import { build } from 'esbuild';

build({
  entryPoints: ['src/lambda.js'],
  bundle: true,
  outfile: 'dist/lambda.js',
  platform: 'node',
  minify: false,
  sourcemap: true,
  external: ${JSON.stringify(dependencies, null, 2)}
}).catch(() => process.exit(1));
`;

// Écriture du fichier esbuild.config.js
writeFileSync('esbuild.config.js', configContent);

console.log('✅ esbuild.config.js generated successfully.');
