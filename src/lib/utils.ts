import { type ClassValue, clsx } from 'clsx';

// Combine class names
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

// Format date
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Truncate text
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length).trim() + '...';
}

// Simulate delay (for demo purposes)
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Generate random ID
export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

// Simple text search scoring
export function searchScore(text: string, query: string): number {
  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const words = lowerQuery.split(' ').filter(Boolean);
  
  let score = 0;
  for (const word of words) {
    if (lowerText.includes(word)) {
      score += 1;
      // Bonus for exact match
      if (lowerText.split(' ').includes(word)) {
        score += 0.5;
      }
    }
  }
  return score;
}

// Format number with commas
export function formatNumber(num: number): string {
  return num.toLocaleString();
}

// Calculate reading time
export function calculateReadTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}
