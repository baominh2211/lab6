'use server'

/**
 * Server Action for AI Chat
 * 
 * This demonstrates:
 * - Server Actions (React 19)
 * - Direct server function calls from Client Components
 * - No API route needed
 */

// Knowledge base data
const docs = [
  { topic: 'SSR', content: 'Server-Side Rendering renders on every request.' },
  { topic: 'SSG', content: 'Static Site Generation builds at compile time.' },
  { topic: 'ISR', content: 'Incremental Static Regeneration updates static pages.' },
  { topic: 'Server Components', content: 'Run on server, no JS to client.' },
  { topic: 'Client Components', content: 'Use "use client" for interactivity.' },
]

export async function sendMessage(message: string) {
  // Simulate processing delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Simple response logic
  const lowerMessage = message.toLowerCase()
  
  let response = ''
  const matchedTopics: string[] = []

  for (const doc of docs) {
    if (lowerMessage.includes(doc.topic.toLowerCase())) {
      matchedTopics.push(doc.topic)
      response += `**${doc.topic}**: ${doc.content}\n\n`
    }
  }

  if (!response) {
    response = `Tôi có thể giúp bạn về các chủ đề:\n- SSR (Server-Side Rendering)\n- SSG (Static Site Generation)\n- ISR (Incremental Static Regeneration)\n- Server/Client Components\n\nHãy hỏi cụ thể về một chủ đề!`
  }

  return {
    response,
    sources: matchedTopics,
    timestamp: new Date().toISOString(),
  }
}
