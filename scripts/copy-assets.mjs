import { cp, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// assets/ 里的视频、PDF 与图片按原始路径被页面直接引用（/assets/...），
// 不进 Vite 的资源图，所以构建后整目录复制到 dist/。
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const from = resolve(root, 'assets');
const to = resolve(root, 'dist', 'assets');

await mkdir(to, { recursive: true });
await cp(from, to, { recursive: true });

console.log(`copied assets -> ${to}`);
