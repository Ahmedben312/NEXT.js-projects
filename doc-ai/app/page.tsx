import UploadForm from "./components/UploadForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12 md:p-24">
      <div className="w-full max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-10">
          AI Document Intelligence
        </h1>
        <UploadForm />
      </div>
    </main>
  );
}
