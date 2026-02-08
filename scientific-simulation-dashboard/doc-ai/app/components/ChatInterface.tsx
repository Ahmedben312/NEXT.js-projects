'use client';

import { useChat } from 'ai/react';

export default function ChatInterface({ docId }: { docId: string }) {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
    body: { docId },
    onError: (err) => console.error('Chat error:', err),
  });

  const exportReport = async () => {
    const res = await fetch(`/api/export?docId=${docId}`);
    if (!res.ok) {
      alert('Failed to generate report');
      return;
    }
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `document-report-${docId.slice(0,8)}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="border rounded-lg p-6 bg-white shadow-sm">
      <div className="h-96 overflow-y-auto mb-6 space-y-4">
        {messages.map(m => (
          <div
            key={m.id}
            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                m.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="text-center text-gray-500">Thinking...</div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Ask anything about the document..."
          className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          Send
        </button>
      </form>

      <button
        onClick={exportReport}
        className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg"
      >
        Export Report as PDF
      </button>
    </div>
  );
}
