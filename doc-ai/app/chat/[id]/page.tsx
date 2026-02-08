import ChatInterface from "@/components/ChatInterface";

export default function ChatPage({ params }: { params: { id: string } }) {
  return (
    <main className="flex min-h-screen flex-col items-center p-12 md:p-24">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Chat with Document
        </h1>
        <ChatInterface docId={params.id} />
      </div>
    </main>
  );
}
