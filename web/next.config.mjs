import {dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

const rootDir = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // O repo raiz tem outro lockfile (Docusaurus); fixa a raiz de tracing no app.
  outputFileTracingRoot: rootDir,
};

export default nextConfig;
