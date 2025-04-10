import { build } from 'esbuild';

build({
  entryPoints: ['src/lambda.js'],
  bundle: true,
  outfile: 'dist/lambda.js',
  platform: 'node',
  minify: false,
  sourcemap: true,
  external: [
  "@types/cookie-parser",
  "@types/express-session",
  "@types/express-validator",
  "@vendia/serverless-express",
  "aws-lambda",
  "bcryptjs",
  "cookie-parser",
  "cors",
  "dotenv",
  "esbuild",
  "express",
  "express-session",
  "express-validator",
  "glob",
  "joi",
  "jsonwebtoken",
  "nodemon",
  "path-scurry",
  "pg",
  "reflect-metadata",
  "typeorm"
]
}).catch(() => process.exit(1));
