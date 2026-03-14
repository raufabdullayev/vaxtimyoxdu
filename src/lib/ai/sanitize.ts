/**
 * Sanitizes user input text before passing it to AI models.
 * Strips known prompt injection patterns to prevent manipulation of AI behavior.
 */

const INJECTION_PATTERNS: RegExp[] = [
  // Direct instruction override attempts
  /ignore\s+(all\s+)?(previous|above|prior|earlier|preceding)\s+(instructions?|prompts?|rules?|context)/gi,
  /disregard\s+(all\s+)?(previous|above|prior|earlier|preceding)\s+(instructions?|prompts?|rules?|context)/gi,
  /forget\s+(all\s+)?(previous|above|prior|earlier|preceding)\s+(instructions?|prompts?|rules?|context)/gi,
  /override\s+(all\s+)?(previous|above|prior|earlier|preceding)\s+(instructions?|prompts?|rules?|context)/gi,

  // Role impersonation attempts
  /^system\s*:/gim,
  /^assistant\s*:/gim,
  /^human\s*:/gim,
  /^user\s*:/gim,

  // New instruction injection
  /new\s+instructions?\s*:/gi,
  /updated?\s+instructions?\s*:/gi,
  /revised?\s+instructions?\s*:/gi,

  // Prompt boundary manipulation
  /\[system\]/gi,
  /\[assistant\]/gi,
  /\[inst\]/gi,
  /\[\/inst\]/gi,
  /<<\s*sys\s*>>/gi,
  /<<\s*\/\s*sys\s*>>/gi,

  // Direct behavior change commands
  /you\s+are\s+now\s+a/gi,
  /act\s+as\s+(if\s+you\s+are\s+)?a/gi,
  /pretend\s+(to\s+be|you\s+are)/gi,
  /switch\s+to\s+\w+\s+mode/gi,
  /enter\s+\w+\s+mode/gi,

  // "Do anything now" / jailbreak patterns
  /do\s+anything\s+now/gi,
  /\bDAN\b\s+mode/g,
  /jailbreak/gi,
]

/**
 * Sanitizes user-supplied text by stripping known prompt injection patterns.
 * Returns the cleaned text.
 */
export function sanitizeInput(text: string): string {
  let sanitized = text

  for (const pattern of INJECTION_PATTERNS) {
    sanitized = sanitized.replace(pattern, '')
  }

  // Collapse multiple whitespace runs left by removals
  sanitized = sanitized.replace(/\n{3,}/g, '\n\n').trim()

  return sanitized
}
