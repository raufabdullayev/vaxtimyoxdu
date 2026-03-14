import { Tool } from '@/types/tool'
import { aiTools } from './ai-tools'
import { pdfTools } from './pdf-tools'
import { imageTools } from './image-tools'
import { devTools } from './dev-tools'
import { generatorTools } from './generator-tools'
import { textTools } from './text-tools'

export const tools: Tool[] = [
  ...aiTools,
  ...pdfTools,
  ...imageTools,
  ...devTools,
  ...generatorTools,
  ...textTools,
]

export const categories: Record<string, { name: string; description: string }> = {
  ai: { name: 'AI Tools', description: 'AI-powered text processing' },
  pdf: { name: 'PDF Tools', description: 'Merge, split, compress PDF files' },
  image: { name: 'Image Tools', description: 'Compress, resize, crop, and convert images' },
  dev: { name: 'Developer Tools', description: 'JSON, Base64, Regex, SQL, HTML, JS, CSV and more for developers' },
  generators: { name: 'Generators', description: 'Generate passwords, UUIDs, QR codes, gradients, emojis, colors' },
  text: { name: 'Text Tools', description: 'Case converter, binary, ROT13, diff checker, timer, word count' },
}

export { aiTools } from './ai-tools'
export { pdfTools } from './pdf-tools'
export { imageTools } from './image-tools'
export { devTools } from './dev-tools'
export { generatorTools } from './generator-tools'
export { textTools } from './text-tools'
