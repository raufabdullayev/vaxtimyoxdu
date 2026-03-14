import { Tool } from '@/types/tool'

export const aiTools: Tool[] = [
  {
    slug: 'ai-text-rewriter',
    name: 'AI Text Rewriter',
    description: 'Rewrite and paraphrase your text using AI. Change tone, simplify language, or make text more professional. Free AI-powered text rewriter.',
    shortDescription: 'Rewrite text with AI-powered paraphrasing',
    category: 'ai',
    icon: '\u270D\uFE0F',
    isAI: true,
    isClientSide: false,
    keywords: ['text rewriter', 'paraphrase', 'reword', 'ai rewriter'],
  },
  {
    slug: 'ai-text-summarizer',
    name: 'AI Text Summarizer',
    description: 'Summarize long text, articles, and documents using AI. Get concise summaries with key points. Free AI-powered summarizer.',
    shortDescription: 'Summarize text with AI',
    category: 'ai',
    icon: '\uD83D\uDCDD',
    isAI: true,
    isClientSide: false,
    keywords: ['text summarizer', 'summarize', 'ai summary', 'tldr'],
  },
  {
    slug: 'ai-grammar-checker',
    name: 'AI Grammar Checker',
    description: 'Check and fix grammar, spelling, and punctuation errors using AI. Get instant corrections for your text. Free online grammar checker.',
    shortDescription: 'Fix grammar and spelling with AI',
    category: 'ai',
    icon: '\u2705',
    isAI: true,
    isClientSide: false,
    keywords: ['grammar checker', 'spell check', 'punctuation', 'proofreader'],
  },
]
